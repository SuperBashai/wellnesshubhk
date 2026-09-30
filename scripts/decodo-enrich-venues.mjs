import { readFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import ts from "typescript";

const token = process.env.DECODO_AUTH_TOKEN?.trim().replace(/^Basic\s+/i, "");
if (!token) throw new Error("DECODO_AUTH_TOKEN is missing from .env.local");

function load(path) {
  if (path.endsWith(".json")) return JSON.parse(requireText(path));
  const code = ts.transpileModule(requireText(path), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", code)((specifier) => {
    const target = specifier.startsWith("@/") ? resolve(specifier.slice(2)) : resolve(dirname(path), specifier);
    return load(target + (target.endsWith(".json") ? "" : ".ts"));
  }, module, module.exports);
  return module.exports;
}

function requireText(path) {
  return requireText.cache[path] ??= readFileSync(path, "utf8");
}
requireText.cache = {};

const decode = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

const stripTags = (html) => decode(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim());

const attributes = (tag) => Object.fromEntries(
  [...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), decode(match[2])]),
);

function absoluteImageUrl(value, source) {
  if (!value || /^(data:|blob:|javascript:)/i.test(value)) return null;
  let candidate = value.trim().split(/\s+/)[0];
  try {
    const parsed = new URL(candidate, source);
    if (parsed.pathname === "/_next/image" && parsed.searchParams.get("url")) candidate = parsed.searchParams.get("url");
    const url = new URL(candidate, source);
    if (!/^https?:$/.test(url.protocol)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function imageLooksUseful(url, label = "") {
  const text = `${url} ${label}`.toLowerCase();
  return !/(logo|favicon|icon|sprite|avatar|payment|trustpilot|flag|emoji|placeholder|loading|spinner|badge|qr[-_]?code|\.svg(?:\?|$)|\.gif(?:\?|$))/i.test(text);
}

function extractImages(html, source, venueNames) {
  const found = [];
  const add = (rawUrl, kind, label = "", width = 0, height = 0) => {
    const url = absoluteImageUrl(rawUrl, source);
    if (!url || !imageLooksUseful(url, label) || (width && width < 280) || (height && height < 180)) return;
    const words = venueNames.join(" ").toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length >= 4);
    const relevance = words.some((word) => `${url} ${label}`.toLowerCase().includes(word)) ? 18 : 0;
    const base = kind === "og" ? 100 : kind === "twitter" ? 90 : kind === "jsonld" ? 75 : 30;
    found.push({ url, kind, label: label.trim().slice(0, 180), width, height, score: base + relevance + (width >= 800 ? 8 : 0) + (height >= 500 ? 6 : 0) });
  };

  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attr = attributes(tag);
    const key = (attr.property || attr.name || "").toLowerCase();
    if (key === "og:image" || key === "og:image:url" || key === "og:image:secure_url") add(attr.content, "og");
    if (key === "twitter:image" || key === "twitter:image:src") add(attr.content, "twitter");
  }
  for (const match of html.matchAll(/["']image["']\s*:\s*["']([^"']+)["']/gi)) add(decode(match[1].replaceAll("\\/", "/")), "jsonld");
  for (const [tag] of html.matchAll(/<img\b[^>]*>/gi)) {
    const attr = attributes(tag);
    const srcset = attr.srcset || attr["data-srcset"];
    const srcsetUrl = srcset?.split(",").at(-1)?.trim().split(/\s+/)[0];
    add(attr["data-src"] || attr["data-lazy-src"] || srcsetUrl || attr.src, "img", attr.alt || attr.title || "", Number(attr.width) || 0, Number(attr.height) || 0);
  }
  for (const match of html.matchAll(/url\(\s*["']?([^"')]+\.(?:jpe?g|png|webp)(?:\?[^"')]*)?)["']?\s*\)/gi)) add(match[1], "background");

  return [...new Map(found.sort((a, b) => b.score - a.score).map((image) => [image.url, image])).values()].slice(0, 12);
}

function extractContacts(html) {
  const phones = new Set();
  for (const match of html.matchAll(/href=["']tel:([^"']+)["']/gi)) phones.add(decode(match[1]).replace(/[^+\d]/g, ""));
  const text = stripTags(html);
  for (const match of text.matchAll(/(?:\+?852[\s-]*)?[2-9]\d{3}[\s-]*\d{4}/g)) phones.add(match[0].replace(/\s+/g, " ").trim());
  const hourSnippets = [];
  const hoursPattern = /(?:Mon(?:day)?|Tue(?:sday)?|Wed(?:nesday)?|Thu(?:rsday)?|Fri(?:day)?|Sat(?:urday)?|Sun(?:day)?|daily|opening hours|business hours|營業時間|星期[一二三四五六日天])[^.。]{0,220}/gi;
  for (const match of text.matchAll(hoursPattern)) {
    const snippet = match[0].trim();
    if (/\d/.test(snippet) && !hourSnippets.includes(snippet)) hourSnippets.push(snippet);
  }
  return { phones: [...phones].slice(0, 12), hourSnippets: hourSnippets.slice(0, 12) };
}

async function scrape(source) {
  const response = await fetch("https://scraper-api.decodo.com/v2/scrape", {
    method: "POST",
    headers: { Accept: "application/json", Authorization: `Basic ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url: source }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${(await response.text()).slice(0, 180)}`);
  const payload = await response.json();
  const result = payload.results?.[0];
  if (!result?.content || result.status_code >= 400) throw new Error(`Target returned ${result?.status_code ?? "no content"}`);
  return { html: result.content, statusCode: result.status_code, taskId: result.task_id };
}

const { listings, listingSlug, listingName } = load(resolve("lib/data.ts"));
const galleries = JSON.parse(await readFile("data/venue-images.json", "utf8"));
const previous = JSON.parse(await readFile("data/decodo-venue-enrichment.json", "utf8").catch(() => "{\"sources\":{}}"));
const refresh = process.argv.includes("--refresh");
const limitArg = process.argv.find((value) => value.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;

const targets = listings.filter((venue) => !galleries[listingSlug(venue)] || !venue.phone || !venue.openingHours?.en);
const grouped = new Map();
for (const venue of targets) {
  const entry = grouped.get(venue.url) ?? [];
  entry.push({ slug: listingSlug(venue), name: listingName(venue, "en"), needsImages: !galleries[listingSlug(venue)], needsPhone: !venue.phone, needsHours: !venue.openingHours?.en });
  grouped.set(venue.url, entry);
}

const queue = [...grouped.entries()].filter(([source]) => refresh || !previous.sources?.[source]?.ok).slice(0, limit);
const results = { generatedAt: new Date().toISOString(), sources: { ...(previous.sources ?? {}) } };

for (let index = 0; index < queue.length; index += 1) {
  const [source, venues] = queue[index];
  try {
    const { html, statusCode, taskId } = await scrape(source);
    results.sources[source] = {
      ok: true,
      statusCode,
      taskId,
      venues,
      images: extractImages(html, source, venues.map((venue) => venue.name)),
      contacts: extractContacts(html),
    };
    console.log(`[${index + 1}/${queue.length}] ${source}: ${results.sources[source].images.length} images`);
  } catch (error) {
    results.sources[source] = { ok: false, venues, error: error instanceof Error ? error.message : String(error) };
    console.log(`[${index + 1}/${queue.length}] ${source}: unavailable`);
  }
  await writeFile("data/decodo-venue-enrichment.json", JSON.stringify(results, null, 2) + "\n");
}

const successful = Object.values(results.sources).filter((entry) => entry.ok);
console.log(`Saved ${successful.length} scraped source pages with ${successful.reduce((total, entry) => total + entry.images.length, 0)} image candidates.`);
