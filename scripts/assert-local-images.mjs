import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const manifest = JSON.parse(await readFile("data/venue-images.json", "utf8"));
const homeSource = await readFile("components/wellness-home.tsx", "utf8");
const failures = [];
let checked = 0;

for (const [slug, photos] of Object.entries(manifest)) {
  for (const photo of photos) {
    checked += 1;
    if (!photo.url.startsWith("/")) {
      failures.push(`${slug}: external image URL ${photo.url}`);
      continue;
    }
    try {
      await access(join("public", photo.url.slice(1)));
    } catch {
      failures.push(`${slug}: missing local file ${photo.url}`);
    }
  }
}

if (/\bimage:\s*["']https?:\/\//.test(homeSource)) {
  failures.push("components/wellness-home.tsx contains an externally hosted image");
}

if (failures.length) {
  console.error(`Local image validation failed (${failures.length} issues):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Local image validation passed: ${checked} venue-photo references use project-hosted files.`);
