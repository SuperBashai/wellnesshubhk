import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const manifestPath = "data/venue-images.json";
const outputDirectory = "public/venue-images";
const reportPath = "data/localized-image-report.json";
const concurrency = 8;
const maxSourceBytes = 30 * 1024 * 1024;

const homeImages = [
  { name: "dink-city", url: "https://www.dinkhk.com/attachment/banner/178419009861732.png" },
  { name: "ice-bath-club", url: "https://cdn.sanity.io/images/p4tg2klf/production/0ff51ab2d09ae0ff66d64c6065419c3ee806fa12-2000x1429.jpg" },
  { name: "clubhouse-recharge-suite", url: "https://images.squarespace-cdn.com/content/v1/664eae10f346835bdc10c019/f76a88cc-359c-4fa2-b978-3c90f191e77e/Clubhouse_Stills-49.jpeg" },
  { name: "treehouse-central", url: "https://images.squarespace-cdn.com/content/v1/60b854773befb320435415b3/c84c3400-9cd1-471d-b9f0-dcbc07b09aee/DSC03043.jpg" },
];

function isRemote(url) {
  return /^https?:\/\//i.test(url);
}

function stableSuffix(url) {
  return createHash("sha1").update(url).digest("hex").slice(0, 10);
}

async function exists(path) {
  try {
    return (await stat(path)).size > 0;
  } catch {
    return false;
  }
}

async function fetchImage(url, source) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const headers = {
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36",
      };
      if (isRemote(source)) headers.Referer = source;
      const response = await fetch(url, { headers, redirect: "follow", signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const declaredLength = Number(response.headers.get("content-length") ?? 0);
      if (declaredLength > maxSourceBytes) throw new Error(`source exceeds ${maxSourceBytes} bytes`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (!buffer.length || buffer.length > maxSourceBytes) throw new Error(`invalid source size ${buffer.length}`);
      return buffer;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 700));
    }
  }
  throw lastError;
}

async function writeOptimizedImage(job) {
  if (await exists(job.filePath)) return { ...job, ok: true, reused: true };
  try {
    const sourceBuffer = await fetchImage(job.url, job.source);
    await mkdir(dirname(job.filePath), { recursive: true });
    await sharp(sourceBuffer, { failOn: "error" })
      .rotate()
      .resize({ width: 1800, height: 1350, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82, effort: 4, smartSubsample: true })
      .toFile(job.filePath);
    const size = (await stat(job.filePath)).size;
    return { ...job, ok: true, size };
  } catch (error) {
    return { ...job, ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const uniqueJobs = new Map();

for (const [slug, photos] of Object.entries(manifest)) {
  photos.forEach((photo, index) => {
    if (!isRemote(photo.url) || uniqueJobs.has(photo.url)) return;
    const filename = `${slug}-${index + 1}-${stableSuffix(photo.url)}.webp`;
    uniqueJobs.set(photo.url, {
      kind: "venue",
      slug,
      url: photo.url,
      source: photo.source,
      publicPath: `/venue-images/${filename}`,
      filePath: join(outputDirectory, filename),
    });
  });
}

for (const item of homeImages) {
  const filename = `home-${item.name}-${stableSuffix(item.url)}.webp`;
  if (!uniqueJobs.has(item.url)) {
    uniqueJobs.set(item.url, {
      kind: "home",
      slug: item.name,
      url: item.url,
      source: item.url,
      publicPath: `/venue-images/${filename}`,
      filePath: join(outputDirectory, filename),
    });
  }
}

const queue = [...uniqueJobs.values()];
const results = [];
let completed = 0;
await mkdir(outputDirectory, { recursive: true });

await Promise.all(Array.from({ length: concurrency }, async () => {
  while (queue.length) {
    const job = queue.shift();
    const result = await writeOptimizedImage(job);
    results.push(result);
    completed += 1;
    if (completed % 25 === 0 || completed === uniqueJobs.size) {
      const passed = results.filter((item) => item.ok).length;
      console.log(`Processed ${completed}/${uniqueJobs.size}; ${passed} saved; ${completed - passed} failed`);
    }
  }
}));

const resultByUrl = new Map(results.map((result) => [result.url, result]));
const localizedManifest = {};
for (const [slug, photos] of Object.entries(manifest)) {
  const localizedPhotos = photos.flatMap((photo) => {
    if (!isRemote(photo.url)) return [photo];
    const result = resultByUrl.get(photo.url);
    return result?.ok ? [{ ...photo, url: result.publicPath }] : [];
  });
  if (localizedPhotos.length) localizedManifest[slug] = localizedPhotos;
}

const localFilesMissing = [];
for (const [slug, photos] of Object.entries(localizedManifest)) {
  for (const photo of photos) {
    const path = join("public", photo.url.replace(/^\//, ""));
    if (!(await exists(path))) localFilesMissing.push({ slug, url: photo.url });
  }
}

const home = Object.fromEntries(homeImages.map((item) => {
  const result = resultByUrl.get(item.url);
  return [item.name, result?.ok ? result.publicPath : null];
}));

const report = {
  generatedAt: new Date().toISOString(),
  requested: uniqueJobs.size,
  saved: results.filter((item) => item.ok).length,
  failed: results.filter((item) => !item.ok).map(({ slug, url, error }) => ({ slug, url, error })),
  localFilesMissing,
  home,
};

await writeFile(manifestPath, `${JSON.stringify(localizedManifest, null, 2)}\n`);
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ requested: report.requested, saved: report.saved, failed: report.failed.length, localFilesMissing: report.localFilesMissing.length, home }, null, 2));

if (localFilesMissing.length) process.exitCode = 1;
