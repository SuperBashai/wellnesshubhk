import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';

function load(path) {
  if (path.endsWith('.json')) return JSON.parse(readFileSync(path, 'utf8'));
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function('require', 'module', 'exports', code)((specifier) => {
    const target = specifier.startsWith('@/') ? resolve(specifier.slice(2)) : resolve(dirname(path), specifier);
    return load(target + (target.endsWith('.json') ? '' : '.ts'));
  }, module, module.exports);
  return module.exports;
}
const { listings, listingSlug, categories } = load(resolve('lib/data.ts'));
const { listingCategories } = load(resolve('lib/listing-categories.ts'));
const { listingSports } = load(resolve('lib/sports.ts'));
const { privateSports } = load(resolve('lib/private-sports.ts'));
const { privateWellness } = load(resolve('lib/private-wellness.ts'));
assert.equal(privateSports.length, 20);
assert.equal(privateWellness.length, 28);
assert.equal(privateSports.filter(venue => listingSports(venue).includes('pickleball')).length, 16);
for (const venue of privateSports) {
  assert(venue.url.startsWith('https://'));
  assert(venue.description.en && venue.description['zh-hk']);
  assert(listings.some(item => listingSlug(item) === listingSlug(venue)));
}
for (const venue of privateWellness) {
  assert(venue.url.startsWith('https://'));
  assert(venue.description.en && venue.description['zh-hk']);
  assert(venue.address?.en && venue.address?.['zh-hk']);
  assert(listings.some(item => listingSlug(item) === listingSlug(venue)));
}
const thrive = privateWellness.find(venue => venue.name.en === 'Thrive Body');
assert.deepEqual(listingCategories(thrive).sort(), ['movement', 'recovery', 'sauna']);
assert.equal(privateWellness.filter(venue => listingCategories(venue).includes('food')).length, 6);
assert.equal(privateWellness.filter(venue => listingCategories(venue).includes('shops')).length, 12);
assert.equal(new Set(listings.map(listingSlug)).size, listings.length, 'Unique venue pages');
for (const venue of listings) {
  const memberships = listingCategories(venue);
  assert(memberships.includes(venue.category));
  assert(memberships.every(id => categories.some(category => category.id === id)));
  const text = [venue.description.en, ...venue.tags.en].join(' ');
  if (/cold[- ]plunge|ice[- ]bath|cold baths/i.test(text)) assert(memberships.includes('recovery'), `${venue.name} missing Ice baths`);
  if (/sauna/i.test(text)) assert(memberships.includes('sauna'), `${venue.name} missing Saunas`);
}
for (const name of ['ONYX Admiralty', 'GO24 Fitness — Kennedy Town', 'Coastal Fitness Dream Room']) {
  const venue = listings.find(item => item.name === name);
  assert(venue);
  assert(listingSports(venue).includes('gym'), `${name} missing gym filter`);
}
const sample = listings[0];
assert.equal(listingCategories({...sample, additionalCategories: [sample.category, sample.category]}).length, 1);
const player = listings.find(item => item.name === 'The Player Climbingym');
assert.equal(player.phone, '+852 6380 0112');
assert.match(player.openingHours.en, /Mon–Fri 2pm/);
assert(listings.filter(venue => venue.openingHours?.en).length >= 216, 'Opening-hours coverage regressed');
assert(listings.filter(venue => venue.phone).length >= 215, 'Phone coverage regressed');
for (const venue of listings.filter(item => item.phone)) {
  assert([8, 11].includes(venue.phone.replace(/\D/g, '').length), `${venue.name} has an invalid phone`);
}
console.log('Category checks passed:', listings.length, 'unique venues');
console.log(Object.fromEntries(categories.map(category => [category.label.en, listings.filter(venue => listingCategories(venue).includes(category.id)).length])));
