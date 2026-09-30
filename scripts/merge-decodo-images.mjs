import { readFile, writeFile } from "node:fs/promises";

const enrichment = JSON.parse(await readFile("data/decodo-venue-enrichment.json", "utf8"));
const galleries = JSON.parse(await readFile("data/venue-images.json", "utf8"));

// These positions were reviewed against the official page metadata and image labels.
// We intentionally omit logos, app icons, temporary social-CDN links and generic mall artwork.
const selections = {
  "https://www.ikigai.hk/en/studios": [6],
  "https://www.goparksaisha.hk/en/sports/": [0, 7, 10],
  "https://www.coastalfitnesshk.com/the-dream-room": [1],
  "https://www.organicplus.com.hk/en/Store/Detail?shopid=655": [1, 0],
  "https://thebaypickle.com/hk-island-tin-hau": [1, 0],
  "https://thebaypickle.com/south-island": [0],
  "https://212hk.com/about-us/": [7, 8, 9],
  "https://www.stackdpb.com/": [0, 1, 5],
  "https://www.pickandmatch.hk/": [0, 1, 2],
  "https://pickledise-hk.com/": [3, 4, 0],
  "https://picklelandhk.com/": [0, 1, 2],
  "https://linktr.ee/picklecityhk": [1, 0, 3],
  "https://www.theground.io/events/MjM0": [0],
  "https://pickleand.club/pages/contact": [2, 3, 4],
  "https://web.sino-hotels.com/en/hk/gold-coast-hotel/facilities": [1, 4, 5],
  "https://clubderecreio.org/badminton": [1, 2],
  "https://www.aberdeenmarinaclub.com/sport_detail.php?id=3874158042": [0, 1, 2],
  "https://www.ymcahk.org.hk/ms/en/our_facilities/tst_headquater/sports_and_recreation_facilities/index.html": [0, 1, 2],
  "https://tennislofthk.com/": [0, 2, 3],
  "https://www.thrivebody.info/": [0, 1, 4],
  "https://www.lrc.com.hk/": [0, 6, 7],
  "https://www.dynastyclub.com.hk/en/sport-recreations/facilities": [2, 3, 4],
  "https://jcc.org.hk/pages/health-fitness": [2, 3, 4],
  "https://www.cchly.com/": [0, 1, 2],
  "https://www.usrc.org.hk/our-facilities.html": [0],
  "https://poc-psrc.com.hk/Card/AboutUs": [0, 1, 4],
  "https://www.yearshk.com/pages/menu": [5, 1, 0],
  "https://www.healthygiant.hk/en/pages/store-locations": [0, 1, 2],
  "https://hofhk.com/": [0, 2, 5],
  "https://www.fit-01.com/pages/group-classes": [4, 0, 1],
  "https://dbdbtraining.com/": [0],
  "https://anhao-wellness.com/": [0, 1, 2],
  "https://flexhk.com/": [1, 2, 3],
  "https://senses-studio.co/pages/location": [0, 1, 2],
  "https://www.absoluteboutiquefitness.com.hk/": [0, 9, 10],
  "https://pilatessens.com/": [1, 0],
  "https://yogamovementhk.com/": [1, 2, 3],
  "https://www.anahatayoga.com.hk/": [2, 3, 4],
  "https://www.ayogastudiohk.com/": [0, 1],
  "https://www.atsumaruyogahk.com/": [0, 4, 5],
  "https://www.enjoyoga.online/": [0, 1, 2],
  "https://www.pause.hk/find-us": [0],
  "https://www.jeselstudio.com/": [0, 3, 4],
};

let added = 0;
for (const slug of [
  "go24-fitness-kennedy-town",
  "yama-pickleball-arena",
  "discovery-bay-recreation-club",
  "pickle-city",
  "onyx-admiralty",
  "o-rin-central",
  "o-rin-quarry-bay",
  "o-rin-tsim-sha-tsui",
  "212hk",
  "slowood-kennedy-town",
  "slowood-central-market",
  "slowood-hysan-place",
  "slowood-hong-kong-airport",
  "spicebox-organics-kennedy-town",
  "spicebox-organics-mid-levels",
  "foodcraft",
  "organic-mama",
]) delete galleries[slug];
for (const [source, indices] of Object.entries(selections)) {
  const scraped = enrichment.sources[source];
  if (!scraped?.ok) continue;
  const selected = indices.map((index) => scraped.images[index]).filter(Boolean);
  if (!selected.length) continue;

  for (const venue of scraped.venues.filter((entry) => entry.needsImages)) {
    if (galleries[venue.slug]?.length) continue;
    const credit = venue.name.split(" — ")[0];
    galleries[venue.slug] = selected.map((image) => ({
      url: image.url.replaceAll("\\u0026", "&").replace(/^http:/, "https:"),
      source,
      credit,
      alt: {
        en: image.label ? `${venue.name} — ${image.label.replace(/<[^>]+>/g, "").slice(0, 110)}` : `${venue.name} — image from the official website`,
        "zh-hk": `${venue.name} — 官方網站圖片`,
      },
    }));
    added += 1;
  }
}

await writeFile("data/venue-images.json", JSON.stringify(galleries, null, 2) + "\n");
console.log(`Added official image galleries for ${added} venues; ${Object.keys(galleries).length} venues now have galleries.`);
