import { readFile, readdir } from "node:fs/promises";

const editorialFiles = (await readdir("lib"))
  .filter((name) => /^editorial.*\.ts$/.test(name))
  .map((name) => `lib/${name}`);

// These characters can carry invisible text marks. Keep the check focused on
// article sources so ordinary non-editorial code and bilingual copy are safe.
const suspicious = /[\u00AD\u00A0\u1680\u180E\u2000-\u200F\u202A-\u202F\u205F-\u206F\u3000\uFEFF\uE000-\uF8FF\u{E0000}-\u{E007F}]/gu;
const files = process.argv.slice(2).length ? process.argv.slice(2) : editorialFiles;
let findings = 0;

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(suspicious)) {
    const preceding = content.slice(0, match.index);
    const line = preceding.split("\n").length;
    const column = match.index - preceding.lastIndexOf("\n");
    const point = match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, "0");
    console.error(`${file}:${line}:${column}: suspicious hidden character U+${point}`);
    findings++;
  }
}

if (findings) {
  console.error(`Editorial text check failed: ${findings} hidden character${findings === 1 ? "" : "s"} found.`);
  process.exitCode = 1;
} else {
  console.log(`Editorial text check passed: ${files.length} source files scanned.`);
}
