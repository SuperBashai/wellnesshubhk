import { readFile, writeFile } from "node:fs/promises";

const token = process.env.DECODO_AUTH_TOKEN?.trim().replace(/^Basic\s+/i, "");
if (!token) throw new Error("DECODO_AUTH_TOKEN is missing from .env.local");

const profiles = [
  { handle: "spiceboxorganics", slugs: ["spicebox-organics-kennedy-town", "spicebox-organics-mid-levels"] },
  { handle: "livezero.hk", slugs: ["live-zero"] },
  { handle: "foodcraft_hk", slugs: ["foodcraft"] },
  { handle: "baypickle", slugs: ["bay-pickle-dpark", "bay-pickle-mcp-discovery"] },
  { handle: "hongkongfootballclub1886", slugs: ["hong-kong-football-club"] },
  { handle: "ursusfitness", slugs: ["ursus-fitness"] },
  { handle: "beearthofficial", slugs: ["be-earth-central"] },
  { handle: "hiteegolf", slugs: ["hi-tee-golf-san-po-kong", "hi-tee-golf-quarry-bay"] },
];

const decodeHtml = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

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

function walk(value, visit, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  visit(value);
  for (const child of Array.isArray(value) ? value : Object.values(value)) walk(child, visit, seen);
}

function extractPosts(html, expectedHandle) {
  const posts = new Map();
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const payload = JSON.parse(decodeHtml(match[1]));
      walk(payload, (node) => {
        const username = node.user?.username;
        const image = node.display_uri;
        const code = node.code;
        if (!code || !image || username?.toLowerCase() !== expectedHandle.toLowerCase()) return;
        const type = node.product_type === "clips" || node.__typename === "XIGPolarisVideoMedia" ? "reel" : "p";
        const caption = node.caption?.text || node.accessibility_caption || "";
        posts.set(code, {
          code,
          postUrl: `https://www.instagram.com/${type}/${code}/`,
          imageUrl: image.replaceAll("\\/", "/").replaceAll("\\u0026", "&"),
          caption: caption.slice(0, 1200),
          accessibilityCaption: (node.accessibility_caption || "").slice(0, 400),
          mediaType: node.media_type,
          productType: node.product_type || "feed",
        });
      });
    } catch {
      // Instagram includes a few non-JSON script tags; only valid data payloads matter.
    }
  }
  return [...posts.values()];
}

const existing = JSON.parse(await readFile("data/decodo-social-images.json", "utf8").catch(() => "{\"profiles\":{}}"));
const output = { generatedAt: new Date().toISOString(), profiles: { ...(existing.profiles ?? {}) } };

for (let index = 0; index < profiles.length; index += 1) {
  const profile = profiles[index];
  const profileUrl = `https://www.instagram.com/${profile.handle}/`;
  try {
    const result = await scrape(profileUrl);
    const posts = extractPosts(result.html, profile.handle);
    output.profiles[profile.handle] = { ok: true, profileUrl, slugs: profile.slugs, taskId: result.taskId, posts };
    console.log(`[${index + 1}/${profiles.length}] @${profile.handle}: ${posts.length} official posts`);
  } catch (error) {
    output.profiles[profile.handle] = { ok: false, profileUrl, slugs: profile.slugs, error: error instanceof Error ? error.message : String(error) };
    console.log(`[${index + 1}/${profiles.length}] @${profile.handle}: unavailable`);
  }
  await writeFile("data/decodo-social-images.json", JSON.stringify(output, null, 2) + "\n");
}

