import { existsSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import ts from "typescript";

const token = process.env.DECODO_AUTH_TOKEN?.trim().replace(/^Basic\s+/i, "");
if (!token) throw new Error("DECODO_AUTH_TOKEN is missing from .env.local");

function requireText(path) {
  return requireText.cache[path] ??= readFileSync(path, "utf8");
}
requireText.cache = {};

function load(path) {
  if (path.endsWith(".json")) return JSON.parse(requireText(path));
  const code = ts.transpileModule(requireText(path), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", code)((specifier) => {
    const target = specifier.startsWith("@/") ? resolve(specifier.slice(2)) : resolve(dirname(path), specifier);
    return load(target + (target.endsWith(".json") ? "" : ".ts"));
  }, module, module.exports);
  return module.exports;
}

const decode = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("\\/", "/")
  .replaceAll("\\u0026", "&");

function normaliseSocialUrl(raw) {
  let url;
  try {
    url = new URL(decode(raw));
  } catch {
    return null;
  }
  const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (hostname === "instagram.com" && parts[0] && !["p", "reel", "reels", "stories", "explore", "tv"].includes(parts[0].toLowerCase())) {
    return { platform: "instagram", url: `https://www.instagram.com/${parts[0]}/` };
  }
  if ((hostname === "facebook.com" || hostname === "m.facebook.com") && parts[0] && !["sharer", "sharer.php", "share.php", "dialog", "plugins", "tr"].includes(parts[0].toLowerCase())) {
    return { platform: "facebook", url: `https://www.facebook.com/${parts.slice(0, 2).join("/")}` };
  }
  if ((hostname === "youtube.com" || hostname === "m.youtube.com") && parts[0] && (parts[0].startsWith("@") || ["channel", "c", "user"].includes(parts[0].toLowerCase()))) {
    return { platform: "youtube", url: `https://www.youtube.com/${parts.slice(0, 2).join("/")}` };
  }
  if (hostname === "linkedin.com" && parts[0]?.toLowerCase() === "company" && parts[1]) {
    return { platform: "linkedin", url: `https://www.linkedin.com/company/${parts[1]}/` };
  }
  return null;
}

function extractSocials(html) {
  const links = [];
  const patterns = [
    /https?:\\?\/\\?\/(?:www\\?\.)?instagram\\?\.com\\?\/[^\s"'<>\\]+/gi,
    /https?:\\?\/\\?\/(?:www\\?\.|m\\?\.)?facebook\\?\.com\\?\/[^\s"'<>\\]+/gi,
    /https?:\\?\/\\?\/(?:www\\?\.|m\\?\.)?youtube\\?\.com\\?\/[^\s"'<>\\]+/gi,
    /https?:\\?\/\\?\/(?:www\\?\.)?linkedin\\?\.com\\?\/company\\?\/[^\s"'<>\\]+/gi,
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const social = normaliseSocialUrl(match[0].replaceAll("\\", ""));
      if (social) links.push(social);
    }
  }
  return [...new Map(links.map((link) => [`${link.platform}:${link.url}`, link])).values()];
}

async function scrape(url) {
  const response = await fetch("https://scraper-api.decodo.com/v2/scrape", {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Basic ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, headless: "html" }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 180)}`);
  const payload = await response.json();
  const result = payload.results?.[0];
  if (!result?.content || result.status_code >= 400) throw new Error(`Target returned ${result?.status_code ?? "no content"}`);
  return { html: result.content, taskId: result.task_id, statusCode: result.status_code };
}

const { listings, listingSlug, listingName } = load(resolve("lib/data.ts"));
const grouped = new Map();
for (const listing of listings) {
  try {
    const origin = new URL(listing.url).origin;
    const group = grouped.get(origin) ?? { source: listing.url, venues: [] };
    group.venues.push({ slug: listingSlug(listing), name: listingName(listing, "en") });
    grouped.set(origin, group);
  } catch {
    // Invalid source URLs are handled by the directory's existing validation.
  }
}

const limitArg = process.argv.find((value) => value.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const previous = existsSync("data/venue-social-candidates.json")
  ? JSON.parse(readFileSync("data/venue-social-candidates.json", "utf8"))
  : { sources: {} };
const queue = [...grouped.entries()].filter(([origin]) => !previous.sources?.[origin]?.ok).slice(0, limit);
const output = { generatedAt: new Date().toISOString(), sources: { ...(previous.sources ?? {}) } };
const concurrency = 8;

const rejectedSocialFragments = [
  "/2008/fbml",
  "/profile.php",
  "instagram.com/s/",
  "instagram.com/squarespace",
  "facebook.com/squarespace",
  "facebook.com/Shopify",
  "facebook.com/share/",
];

// A small number of official sites embed third-party, mall, or parent-company
// profiles alongside the venue's own account. These overrides keep the links
// on the directory specific and useful.
const socialOverrides = {
  "https://www.treehouse.eco": [
    { platform: "instagram", url: "https://www.instagram.com/treehouse.eco/" },
    { platform: "facebook", url: "https://www.facebook.com/treehouse.eco" },
    { platform: "youtube", url: "https://www.youtube.com/@treehouserestaurants1193" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/treehouseeco/" },
  ],
  "https://web.sino-hotels.com": [
    { platform: "instagram", url: "https://www.instagram.com/GoldCoastHotel/" },
    { platform: "facebook", url: "https://www.facebook.com/GoldCoastHotel" },
  ],
  "https://www.ymcahk.org.hk": [
    { platform: "instagram", url: "https://www.instagram.com/ymcahkms/" },
    { platform: "facebook", url: "https://www.facebook.com/YMCAHKMS" },
  ],
  "https://www.cchly.com": [
    { platform: "instagram", url: "https://www.instagram.com/cchly_hk/" },
    { platform: "facebook", url: "https://www.facebook.com/p/The-Country-Club-at-Hong-Lok-Yuen-100057523926852" },
  ],
  "https://www.hkfc.com": [
    { platform: "instagram", url: "https://www.instagram.com/hongkongfootballclub1886/" },
    { platform: "facebook", url: "https://www.facebook.com/HongKongFootballClub" },
  ],
  "https://www.tmtp.com.hk": [
    { platform: "instagram", url: "https://www.instagram.com/lab.pickleball/" },
  ],
  "https://www.cityu.edu.hk": [
    { platform: "instagram", url: "https://www.instagram.com/cityuhksportsteams/" },
    { platform: "facebook", url: "https://www.facebook.com/cityusportsteams" },
    { platform: "youtube", url: "https://www.youtube.com/@CityUHK.Sports" },
  ],
  "https://shots-factory.com": [
    { platform: "instagram", url: "https://www.instagram.com/shotsfactoryhk/" },
    { platform: "youtube", url: "https://www.youtube.com/@shotsfactoryhk" },
  ],
  "https://www.lockcha.com": [
    { platform: "instagram", url: "https://www.instagram.com/lockchahk/" },
    { platform: "facebook", url: "https://www.facebook.com/lockchahk" },
  ],
};

const excludedSocialOrigins = new Set([
  // These pages currently expose unrelated embedded widget or retail accounts.
  "https://flexhk.com",
  "https://ovo.com.hk",
]);

function curatedSocialsByOrigin(sources) {
  const curated = {};
  for (const [origin, entry] of Object.entries(sources)) {
    if (!entry.ok || !entry.socials?.length || excludedSocialOrigins.has(origin)) continue;
    const links = socialOverrides[origin] ?? entry.socials.filter((social) =>
      !rejectedSocialFragments.some((fragment) => social.url.includes(fragment))
    );
    const seenPlatforms = new Set();
    const uniqueLinks = links.filter((social) => !seenPlatforms.has(social.platform) && seenPlatforms.add(social.platform));
    if (uniqueLinks.length) curated[origin] = uniqueLinks;
  }
  return curated;
}

for (let batchStart = 0; batchStart < queue.length; batchStart += concurrency) {
  const batch = queue.slice(batchStart, batchStart + concurrency);
  const results = await Promise.all(batch.map(async ([origin, group], batchIndex) => {
    const index = batchStart + batchIndex;
    try {
      const result = await scrape(group.source);
      const socials = extractSocials(result.html);
      console.log(`[${index + 1}/${queue.length}] ${origin}: ${socials.length} profiles`);
      return [origin, { ok: true, source: group.source, venues: group.venues, socials, taskId: result.taskId }];
    } catch (error) {
      console.log(`[${index + 1}/${queue.length}] ${origin}: unavailable`);
      return [origin, { ok: false, source: group.source, venues: group.venues, error: error instanceof Error ? error.message : String(error) }];
    }
  }));
  for (const [origin, result] of results) output.sources[origin] = result;
  await writeFile("data/venue-social-candidates.json", JSON.stringify(output, null, 2) + "\n");
}

const verified = Object.values(output.sources).filter((entry) => entry.ok && entry.socials.length);
await writeFile("data/venue-socials.json", JSON.stringify(curatedSocialsByOrigin(output.sources), null, 2) + "\n");
console.log(`Saved ${verified.length} official-site social profile groups.`);
