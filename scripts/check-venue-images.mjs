import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);
const manifest = JSON.parse(await readFile('data/venue-images.json', 'utf8'));
const queue = Object.entries(manifest);
const results = [];
await Promise.all(Array.from({length: 6}, async () => {
  while (queue.length) {
    const [slug, images] = queue.shift();
    try {
      const {stdout} = await exec('curl', ['-L','-s','-I','--max-time','12','-w','\n%{http_code} %{content_type}', images[0].url]);
      const summary = stdout.trim().split('\n').at(-1);
      results.push({slug, url: images[0].url, result: summary, ok: /^200 image\//.test(summary)});
    } catch { results.push({slug, ok:false, result:'request failed'}); }
  }
}));
await writeFile('data/image-checks.json', JSON.stringify(results, null, 2)+'\n');
console.log(JSON.stringify({checked:results.length, passed:results.filter(r=>r.ok).length, failed:results.filter(r=>!r.ok)},null,2));
