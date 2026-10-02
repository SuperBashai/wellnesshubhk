import { access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const manifest = JSON.parse(await readFile('data/venue-images.json', 'utf8'));
const queue = Object.entries(manifest);
const results = [];
await Promise.all(Array.from({length: 6}, async () => {
  while (queue.length) {
    const [slug, images] = queue.shift();
    try {
      if (images[0].url.startsWith('/')) {
        await access(resolve('public', images[0].url.slice(1)));
        results.push({slug, url: images[0].url, result: 'local image', ok:true});
        continue;
      }
      let response = await fetch(images[0].url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000) });
      let summary = `${response.status} ${response.headers.get('content-type') ?? ''}`.trim();
      let ok = response.ok && response.headers.get('content-type')?.startsWith('image/');
      if (!ok) {
        response = await fetch(images[0].url, { headers: { Range: 'bytes=0-4095' }, redirect: 'follow', signal: AbortSignal.timeout(15000) });
        summary = `${response.status} ${response.headers.get('content-type') ?? ''}`.trim();
        ok = response.ok && response.headers.get('content-type')?.startsWith('image/');
      }
      results.push({slug, url: images[0].url, result: summary, ok});
    } catch { results.push({slug, ok:false, result:'request failed'}); }
  }
}));
await writeFile('data/image-checks.json', JSON.stringify(results, null, 2)+'\n');
console.log(JSON.stringify({checked:results.length, passed:results.filter(r=>r.ok).length, failed:results.filter(r=>!r.ok)},null,2));
