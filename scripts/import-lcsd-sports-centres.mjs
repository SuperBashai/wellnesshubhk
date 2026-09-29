import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [inputArg = "/tmp/wellhk-lcsd-sports-centres.json", outputArg = "data/lcsd-sports-centres.json"] = process.argv.slice(2);
const inputPath = resolve(inputArg);
const outputPath = resolve(outputArg);
const records = JSON.parse(await readFile(inputPath, "utf8"));

const islandDistricts = new Set(["Central & Western", "Eastern", "Southern", "Wan Chai"]);
const kowloonDistricts = new Set(["Kowloon City", "Kwun Tong", "Sham Shui Po", "Wong Tai Sin", "Yau Tsim Mong"]);
const tagRules = [
  ["badminton", "Badminton", "羽毛球"],
  ["fitness room", "Fitness room", "健身室"],
  ["squash", "Squash", "壁球"],
  ["table tennis", "Table tennis", "乒乓球"],
  ["basketball", "Basketball", "籃球"],
  ["climbing", "Climbing", "攀登"],
  ["tennis", "Tennis", "網球"],
  ["dance", "Dance", "舞蹈"],
];

function stripHtml(value = "") {
  return value.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function territoryFor(district) {
  if (islandDistricts.has(district)) return "island";
  if (kowloonDistricts.has(district)) return "kowloon";
  return "new-territories";
}

const output = records.map((record) => {
  const facilityText = stripHtml(record.Facilities_en).toLowerCase();
  const matches = tagRules.filter(([needle]) => (needle === "tennis" ? facilityText.replace(/table\s+tennis/g, "") : facilityText).includes(needle)).slice(0, 3);
  const sportRules = [["badminton", /\bbadminton\b/], ["table-tennis", /\btable\s+tennis\b/], ["tennis", /(?<!table\s)\btennis\b/], ["basketball", /\bbasketball\b/], ["volleyball", /\bvolleyball\b/], ["squash", /\bsquash\b/], ["climbing", /\bclimbing\b/], ["gym", /\bfitness\s+room\b/], ["dance", /\bdance\b/]];
  const englishTags = ["Public facility", ...matches.map(([, en]) => en)];
  const chineseTags = ["公共設施", ...matches.map(([, , zh]) => zh)];

  return {
    name: { en: record.Name_en, "zh-hk": record.Name_cn },
    category: "movement",
    sports: sportRules.filter(([, pattern]) => pattern.test(facilityText)).map(([id]) => id),
    territory: territoryFor(record.District_en),
    area: { en: record.District_en, "zh-hk": record.District_cn },
    description: {
      en: `Public indoor sports facility in ${record.District_en}. Check LCSD for its courts, activity spaces and maintenance days.`,
      "zh-hk": `位於${record.District_cn}嘅公共室內運動設施。場地、活動空間及保養日詳情請參閱康文署資料。`,
    },
    tags: { en: englishTags, "zh-hk": chineseTags },
    url: "https://www.lcsd.gov.hk/en/facilities/facilitieslist/facilities.php?ftid=0",
    address: { en: stripHtml(record.Address_en), "zh-hk": stripHtml(record.Address_cn) },
    openingHours: {
      en: stripHtml([record.Opening_hours_en, record.Maintenance_day_en].filter(Boolean).join("; Maintenance: ")),
      "zh-hk": stripHtml([record.Opening_hours_cn, record.Maintenance_day_cn].filter(Boolean).join("；保養時間：")),
    },
    phone: stripHtml(record.Phone),
    source: "LCSD Sports Centres open dataset",
  };
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${output.length} LCSD records to ${outputPath}`);
