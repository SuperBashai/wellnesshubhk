import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((m) => [m[1], decode(m[2])]));
const slug = (name) => name.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const html = await readFile('/tmp/wellhk-lcsd-all.html', 'utf8');
const existing = JSON.parse(await readFile('data/venue-images.json', 'utf8').catch(() => '{}'));
const photos = Object.fromEntries(Object.entries(existing).filter(([, gallery]) => !gallery[0]?.source.includes('lcsd.gov.hk')));
for (const section of html.split(/<h4\s+class="details_title"/).slice(1)) {
  const name = section.match(/id="([^"]+)"/)?.[1];
  if (!name) continue;
  const urls = [...section.matchAll(/<img\b[^>]+>/g)].map(([tag]) => attrs(tag).src).filter((url) => url?.includes('/photo/facilities/'));
  if (urls.length) photos[slug(decode(name))] = [...new Set(urls)].map((url) => ({ url: new URL(url, 'https://www.lcsd.gov.hk').href, source: 'https://www.lcsd.gov.hk/clpss/en/webApp/Facility/Details.do?ftid=0', credit: 'Leisure and Cultural Services Department', alt: { en: `${decode(name)} — official facility photograph`, 'zh-hk': '康文署提供嘅場地相片' } }));
}
await writeFile('data/venue-images.json', JSON.stringify(photos, null, 2) + '\n');
console.log(`Matched ${Object.keys(photos).length} public venue galleries`);
const source = (await readFile('lib/data.ts', 'utf8')) + (await readFile('lib/additional-listings.ts', 'utf8'));
const urls = [...new Set([...source.matchAll(/url: "(https:[^"]+)"/g)].map((m) => m[1]))].filter((url) => !url.includes('lcsd.gov.hk'));
const candidates = [];
for (const url of urls) {
  try {
    const page = execFileSync('curl', ['-L', '-s', '--max-time', '20', url], { maxBuffer: 15 * 1024 * 1024 }).toString();
    const images = [...page.matchAll(/<img\b[^>]+>/g)].map(([tag]) => attrs(tag)).map((a) => ({ url: a['data-src'] || a.src, alt: a.alt || '', width: a.width, height: a.height })).filter((a) => a.url && !/logo|icon|\.svg|data:image|pixel/i.test(a.url)).map((a) => ({ ...a, url: new URL(a.url, url).href }));
    candidates.push({ source: url, images: images.filter((a, i, all) => all.findIndex((b) => b.url === a.url) === i).slice(0, 45) });
    console.log(`${url}: ${images.length} image candidates`);
  } catch (error) { candidates.push({ source: url, error: error.message.slice(0, 140) }); }
}
await writeFile('data/image-candidates.json', JSON.stringify(candidates, null, 2) + '\n');
