import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const photos = JSON.parse(await readFile('data/venue-images.json', 'utf8'));
const candidates = JSON.parse(await readFile('data/selected-image-candidates.json', 'utf8'));
// Candidate positions were visually reviewed in the local contact sheet.
const selections = [
  ['asap', 'ASAP', [4]], ['recoveryhub', 'RecoveryHUB', [6,7]],
  ['acme-central', 'ACME', [9,10,8]], ['the-ice-bath-club-kennedy-town', 'The Ice Bath Club', [12,11]],
  ['attic-v-climbing', 'Attic V', [14]], ['the-player-climbingym', 'The Player Climbingym', [15]],
  ['saladstop-dorset-house', 'SaladStop! Dorset House', [19]], ['saladstop-exchange-square', 'SaladStop! Exchange Square', [20]],
  ['mana-soho', 'MANA! SoHo', [21,22]],
];
for (const [slug, credit, indices] of selections) photos[slug] = indices.map((i) => ({ url: candidates[i].url, source: candidates[i].source, credit, alt: { en: `${credit} — venue photograph from the official website`, 'zh-hk': `${credit} — 官方網站場地相片` } }));
const pure = [
 ['pure-yoga-apm','apm'], ['pure-yoga-asia-standard-tower','asia-standard-tower'],
 ['pure-fitness-california-tower','california-tower-lan-kwai-fong'], ['pure-fitness-icbc-tower','icbc-tower'],
 ['pure-fitness-ifc-mall','ifc-mall'], ['pure-k11-musea','k11-musea'], ['pure-fitness-kinwick-centre','kinwick-centre'],
 ['pure-fitness-langham-place','langham-place-fitness'], ['pure-yoga-langham-place','langham-place-yoga'],
 ['pure-fitness-lee-theatre-plaza','lee-theatre'], ['pure-yoga-lincoln-house','lincoln-house'], ['pure-fitness-manulife-place','manulife-place'],
];
for (const [slug, path] of pure) {
  const source = `https://www.pure-360.com.hk/en/clubs/${path}/`;
  try {
    const html = execFileSync('curl', ['-L','-s','--max-time','12',source], {maxBuffer: 10*1024*1024}).toString();
    const tag = [...html.matchAll(/<img\b[^>]*>/g)].map(m=>m[0]).find(tag=>/alt="Clubs"/.test(tag));
    const url = tag?.match(/src="([^"]+)"/)?.[1];
    if (url) photos[slug] = [{ url, source, credit: 'PURE', alt: {en: `PURE ${path.replaceAll('-', ' ')} — official club photograph`, 'zh-hk': 'PURE 官方分店相片'} }];
    console.log(`${slug}: ${url ? 'matched' : 'no gallery image'}`);
  } catch { console.log(`${slug}: unavailable`); }
}
await writeFile('data/venue-images.json', JSON.stringify(photos, null, 2)+'\n');
console.log(`${Object.keys(photos).length} gallery entries`);
