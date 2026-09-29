import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import ts from "typescript";

function load(path) {
  if (path.endsWith(".json")) return JSON.parse(readFileSync(path, "utf8"));
  const code = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const module = { exports: {} };
  new Function("require", "module", "exports", code)((specifier) => {
    const target = specifier.startsWith("@/") ? resolve(specifier.slice(2)) : resolve(dirname(path), specifier);
    return load(target + (target.endsWith(".json") ? "" : ".ts"));
  }, module, module.exports);
  return module.exports;
}

const { listings, listingName } = load(resolve("lib/data.ts"));
const complete = listings.filter((venue) => venue.openingHours?.en && venue.phone);
const withHours = listings.filter((venue) => venue.openingHours?.en);
const withPhone = listings.filter((venue) => venue.phone);
const missing = listings.filter((venue) => !venue.openingHours?.en || !venue.phone);

console.log(`${complete.length}/${listings.length} venues have both opening hours and phone`);
console.log(`${withHours.length}/${listings.length} have opening hours; ${withPhone.length}/${listings.length} have a phone`);
console.log(JSON.stringify(missing.map((venue) => ({
  name: listingName(venue, "en"),
  source: venue.url,
  missing: [!venue.openingHours?.en && "hours", !venue.phone && "phone"].filter(Boolean),
})), null, 2));
