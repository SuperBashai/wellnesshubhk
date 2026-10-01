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

// Branch-specific golf imagery recovered from official venue pages with Decodo.
// Shared operator pages need per-slug selections so each branch gets its own photograph.
const golfSelectionsBySlug = {
  "smash-factor": ["https://smashfactor.hk/", [1, 2, 4]],
  "optimus-golf-performance": ["https://www.ogp.hk/service/indoorgolf-simulators", [0, 3, 4]],
  "golfzon-causeway-bay": ["https://www.golfzonhk.com/", [2, 0, 6]],
  "golfzon-admiralty": ["https://www.golfzonhk.com/", [3, 0, 6]],
  "golfzon-lai-chi-kok": ["https://www.golfzonhk.com/", [1, 0, 6]],
  "golfzon-tsim-sha-tsui-east": ["https://www.golfzonhk.com/", [4, 0, 6]],
  "golfzon-kowloon-bay": ["https://www.golfzonhk.com/", [5, 0, 6]],
  "shots-factory-hku": ["https://shots-factory.com/", [3, 0]],
  "shots-factory-wan-chai": ["https://shots-factory.com/", [1, 0]],
  "7iron-hk-wong-chuk-hang": ["https://www.7ironhk.com/", [0, 1]],
  "golf-partners": ["https://www.golfpartners.com.hk/", [0, 2, 3]],
  "tour-mechanics": ["https://www.tourmechanicshk.com/", [0, 1]],
  "golftec-hong-kong": ["https://golftec.com.hk/golf-lessons/hong-kong", [10, 9, 8]],
  "the-golf-bay": ["https://www.thegolfbay.hk/", [0, 1]],
  "hong-kong-golf-club-fanling": ["https://hkgolfclub.org/public-golfing-access", [1]],
  "hong-kong-golf-club-deep-water-bay": ["https://hkgolfclub.org/course", [2]],
  "hong-kong-golf-and-tennis-academy": ["https://www.hkgta.com/", [5, 4]],
};

// Healthy-dining pages often share one operator URL. These reviewed selections keep
// branch-specific storefronts with their own venue while reusing food photography
// only when the official site does not publish a separate branch gallery.
const healthyDiningSelectionsBySlug = {
  "pickabowl-d2-place": ["https://www.pickabowl.com.hk/en/location", [0]],
  "pickabowl-citywalk-2": ["https://www.pickabowl.com.hk/en/location", [1]],
  "pickabowl-kings-wing-plaza-2": ["https://www.pickabowl.com.hk/en/location", [2]],
  "pickabowl-airside": ["https://www.pickabowl.com.hk/en/location", [3]],
  "pokeworld-sheung-wan": ["https://www.pokeworldhk.com/", [3, 4, 7]],
  "pokeworld-kwun-tong": ["https://www.pokeworldhk.com/", [3, 5, 8]],
  "heybo-dorset-house": ["https://heybo.hk/locations/", [2, 1]],
  "heybo-jardine-house": ["https://heybo.hk/locations/", [3, 1]],
  "ovo-cafe-wan-chai": ["https://ovo.com.hk/pages/contact", [0, 3]],
  "ovo-cafe-horizon-plaza": ["https://ovo.com.hk/pages/contact", [1, 3]],
  "ovo-cafe-the-peninsula": ["https://ovo.com.hk/pages/contact", [2, 3]],
  "lockcha-tea-house-hong-kong-park": ["https://www.lockcha.com/locations/", [1]],
  "south-lane-shek-tong-tsui": ["https://www.southlane.co/", [1, 4, 10]],
  "south-lane-at-blueprint": ["https://www.southlane.co/quarry-bay", [1, 4, 5]],
  "eat-well-cafe-at-kadoorie-farm": ["https://www.kfbg.org/en/attractions/Eat-Well-Cafe/", [1, 7, 8]],
  "cafe330-kowloon-hospital": ["https://www.eshop330.hk/pages/in-store-pickup", [5, 6]],
  "cafe330-kwong-wah-hospital": ["https://www.eshop330.hk/pages/in-store-pickup", [0]],
  "cafe330-caritas-medical-centre": ["https://www.eshop330.hk/pages/in-store-pickup", [1]],
  "cafe330-the-university-of-hong-kong": ["https://www.eshop330.hk/pages/in-store-pickup", [7]],
  "cafe330-the-chinese-university-of-hong-kong": ["https://www.eshop330.hk/pages/in-store-pickup", [8]],
  "cafe330-inno330-at-cuhk": ["https://www.eshop330.hk/pages/in-store-pickup", [2]],
  "cafe330-so330": ["https://www.eshop330.hk/pages/in-store-pickup", [3]],
};

// Additional official-source galleries recovered during the full missing-image
// audit. Each selection was checked to exclude logos, icons and unrelated art.
const recoveredSelectionsBySlug = {
  "onyx-admiralty": ["https://www.go24fitness.com/en/look-inside/onyx-admiralty", [1, 2, 4]],
  "go24-fitness-kennedy-town": ["https://www.go24fitness.com/en/recovery", [0, 2, 3]],
  "veda": ["https://www.ovolohotels.com/ovolo/central/veda/", [1]],
  "yama-pickleball-arena": ["https://yama-pickleball.com/", [1, 2, 3]],
  "o-rin-central": ["https://www.orin.com.hk/pilates/", [0, 3, 4]],
  "o-rin-quarry-bay": ["https://www.orin.com.hk/pilates/", [0, 3, 4]],
  "o-rin-tsim-sha-tsui": ["https://www.orin.com.hk/pilates/", [0, 3, 4]],
  "cafe330-kwai-chung-hospital": ["https://www.eshop330.hk/pages/in-store-pickup", [0]],
};

const noodOfficialPhotos = [
  "https://assets.pure-360.com.hk/wp-content/uploads/2025/11/19093755/page-banner-6.jpg",
  "https://assets.pure-360.com.hk/wp-content/uploads/2025/11/19113537/banner_742x507.jpg",
  "https://assets.pure-360.com.hk/wp-content/uploads/2025/11/19104450/KIN-nood.jpg",
];
const noodPhotoSource = "https://www.pure-360.com.hk/en/happenings/nood_food_delectable_2-dish_rice/";

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

for (const [slug, [source, indices]] of Object.entries(golfSelectionsBySlug)) {
  const scraped = enrichment.sources[source];
  if (!scraped?.ok) continue;
  const venue = scraped.venues.find((entry) => entry.slug === slug);
  const selected = indices.map((index) => scraped.images[index]).filter(Boolean);
  if (!venue || !selected.length || galleries[slug]?.length) continue;
  const credit = venue.name.split(" — ")[0];
  galleries[slug] = selected.map((item) => ({
    url: item.url.replaceAll("\\u0026", "&").replace(/^http:/, "https:"),
    source,
    credit,
    alt: {
      en: item.label ? `${venue.name} — ${item.label.replace(/<[^>]+>/g, "").slice(0, 110)}` : `${venue.name} — official venue image`,
      "zh-hk": `${venue.name} — 官方場地圖片`,
    },
  }));
  added += 1;
}

for (const [slug, [source, indices]] of Object.entries(healthyDiningSelectionsBySlug)) {
  const scraped = enrichment.sources[source];
  if (!scraped?.ok) continue;
  const venue = scraped.venues.find((entry) => entry.slug === slug);
  const selected = indices.map((index) => scraped.images[index]).filter(Boolean);
  if (!venue || !selected.length || galleries[slug]?.length) continue;
  const credit = venue.name.split(" — ")[0];
  galleries[slug] = selected.map((item) => ({
    url: item.url.replaceAll("\\u0026", "&").replace(/^http:/, "https:"),
    source,
    credit,
    alt: {
      en: item.label ? `${venue.name} — ${item.label.replace(/<[^>]+>/g, "").slice(0, 110)}` : `${venue.name} — official venue image`,
      "zh-hk": `${venue.name} — 官方場地圖片`,
    },
  }));
  added += 1;
}

for (const [slug, [source, indices]] of Object.entries(recoveredSelectionsBySlug)) {
  const scraped = enrichment.sources[source];
  if (!scraped?.ok) continue;
  const venue = scraped.venues.find((entry) => entry.slug === slug);
  const selected = indices.map((index) => scraped.images[index]).filter(Boolean);
  if (!venue || !selected.length || galleries[slug]?.length) continue;
  const credit = venue.name.split(" — ")[0];
  galleries[slug] = selected.map((item) => ({
    url: item.url.replaceAll("\\u0026", "&").replace(/^http:/, "https:"),
    source,
    credit,
    alt: {
      en: item.label ? `${venue.name} — ${item.label.replace(/<[^>]+>/g, "").slice(0, 110)}` : `${venue.name} — image from the official website`,
      "zh-hk": `${venue.name} — 官方網站圖片`,
    },
  }));
  added += 1;
}

for (const venue of enrichment.sources["https://www.allnood.com/locations"]?.venues ?? []) {
  if (!venue.slug.startsWith("nood-food-") || galleries[venue.slug]?.length) continue;
  galleries[venue.slug] = noodOfficialPhotos.map((url) => ({
    url,
    source: noodPhotoSource,
    credit: "NOOD Food / PURE",
    alt: { en: `${venue.name} — official food image`, "zh-hk": `${venue.name} — 官方餐飲圖片` },
  }));
  added += 1;
}

await writeFile("data/venue-images.json", JSON.stringify(galleries, null, 2) + "\n");
console.log(`Added official image galleries for ${added} venues; ${Object.keys(galleries).length} venues now have galleries.`);
