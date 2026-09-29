import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
// Load the typed local catalogue for an editorial coverage report.
function load(path) {
  if (path.endsWith('.json')) return JSON.parse(readFileSync(path, 'utf8'));
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)((specifier) => load(resolve(specifier.replace('@/', '') + (specifier.endsWith('.json') ? '' : '.ts'))), module, module.exports);
  return module.exports;
}
const { listings, listingSlug, listingName } = load(resolve('lib/data.ts'));
const images = JSON.parse(readFileSync('data/venue-images.json', 'utf8'));
const matched = listings.filter((listing) => images[listingSlug(listing)]);
const missing = listings.filter((listing) => !images[listingSlug(listing)]).map((listing) => ({ name: listingName(listing, 'en'), slug: listingSlug(listing), source: listing.url }));
const report = { venues: listings.length, withPhotos: matched.length, photographs: matched.flatMap((listing) => images[listingSlug(listing)]).length, missing, rightsStatus: 'Official source attribution recorded. Reuse permission has not been confirmed.' };
writeFileSync('data/image-coverage.json', JSON.stringify(report, null, 2)+'\n');
console.log(JSON.stringify(report, null, 2));
