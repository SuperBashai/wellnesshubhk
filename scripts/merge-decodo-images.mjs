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
  "sauna-rituals-at-the-hideout": ["https://thesaunarituals.com/", [1, 3, 4, 5]],
};

// Stable local copies of photographs published by verified venue-owned social
// accounts. Each source points to the exact first-party post, rather than an
// expiring social CDN URL. Reposts, influencer images and ambiguous branches
// are intentionally excluded.
const officialSocialSelectionsBySlug = {
  "spicebox-organics-kennedy-town": [
    ["/venue-social/spicebox-organics-store.jpg", "https://www.instagram.com/reel/Dd8MOIfPDvK/"],
  ],
  "spicebox-organics-mid-levels": [
    ["/venue-social/spicebox-organics-store.jpg", "https://www.instagram.com/reel/Dd8MOIfPDvK/"],
  ],
  "live-zero": [
    ["/venue-social/live-zero-refill-station.jpg", "https://www.instagram.com/reel/DOp4Qlwka39/"],
  ],
  "bay-pickle-mcp-discovery": [
    ["/venue-social/bay-pickle-mcp-court.jpg", "https://www.instagram.com/reel/Dd5bdZqpVv3/"],
  ],
  "ursus-fitness": [
    ["/venue-social/ursus-fitness-gym.jpg", "https://www.instagram.com/p/DT16g65Ca6p/"],
    ["/venue-social/ursus-fitness-training.jpg", "https://www.instagram.com/p/DUAVzmsCdT0/"],
    ["/venue-social/ursus-fitness-conditioning.jpg", "https://www.instagram.com/p/DTt5ZPvCVD-/"],
  ],
  "be-earth-central": [
    ["/venue-social/be-earth-reformer-studio.jpg", "https://www.instagram.com/p/Ddoa778jRrz/"],
    ["/venue-social/be-earth-trapeze-yoga.jpg", "https://www.instagram.com/p/DdJeB5SFCg_/"],
    ["/venue-social/be-earth-yoga-workshop.jpg", "https://www.instagram.com/p/DcqTSYElOVK/"],
  ],
  "hi-tee-golf-san-po-kong": [
    ["/venue-social/hi-tee-golf-indoor-bays.jpg", "https://www.instagram.com/p/DY13eUoP8Bk/"],
  ],
  "hi-tee-golf-quarry-bay": [
    ["/venue-social/hi-tee-golf-indoor-bays.jpg", "https://www.instagram.com/p/DY13eUoP8Bk/"],
  ],
};

// Photographs on official venue, operator and government facility pages that
// were matched against the corresponding Google Maps listing. These URLs are
// intentionally first-party: Google Maps customer uploads are not republished.
const mapsVerifiedOfficialSelectionsBySlug = {
  "hong-kong-football-club": [
    {
      url: "https://www.hkfc.com/media/vxemsmbh/facilities_main_top.jpg",
      source: "https://www.hkfc.com/facilities/",
      credit: "Hong Kong Football Club",
      en: "Hong Kong Football Club — main pitch and clubhouse",
      zh: "香港足球會 — 主球場及會所",
    },
  ],
  "discovery-bay-recreation-club": [
    {
      url: "https://scadmin.hkri.com/-/media/hkri/businesses/hospitality/hong-kong/discovery-bay-recreation-club/1.jpg?cropregion=251%2C0%2C1108%2C858&h=900&w=1200",
      source: "https://scadmin.hkri.com/en/Our-Businesses/Hotel-Operations-and-Leisure-Businesses/Hong-Kong/Discovery-Bay-Recreation-Club",
      credit: "HKR International / Discovery Bay Recreation Club",
      en: "Discovery Bay Recreation Club — outdoor swimming pools and terrace",
      zh: "愉景灣康樂會 — 室外泳池及露台",
    },
  ],
  "jockey-club-kau-sai-chau-public-golf-course": [
    {
      url: "https://consvc.hkjc.com/-/media/Sites/JCEW/Charities/about-us/community-facilities/kau-sai-chau/kaui-sai-chau-public-golf-course-kv.png?rev=be64052b8f684f1383a53d3bdbcdc609",
      source: "https://charities.hkjc.com/en-us/about-us/community-footprint/community-footprint-details?id=generalpage/about-us/community-footprint/index/facility-cards/kau-sai-chau-public-golf-course",
      credit: "The Hong Kong Jockey Club",
      en: "Jockey Club Kau Sai Chau Public Golf Course — fairways overlooking Sai Kung",
      zh: "賽馬會滘西洲公眾高爾夫球場 — 眺望西貢的球道",
    },
  ],
  "the-clearwater-bay-golf-and-country-club": [
    {
      url: "https://www.cwbgolf.org/wp-content/uploads/2026/05/slide_a.jpg",
      source: "https://www.cwbgolf.org/",
      credit: "The Clearwater Bay Golf & Country Club",
      en: "The Clearwater Bay Golf & Country Club — coastal golf course",
      zh: "清水灣鄉村俱樂部 — 臨海高爾夫球場",
    },
  ],
  "discovery-bay-golf-club": [
    {
      url: "https://scadmin.hkri.com/-/media/hkri/businesses/hospitality/hong-kong/discovery-bay-golf-club/new_resized/db-golf-club-1_p.jpg?h=545&w=1030&hash=E95AD4A6662F59691ABB7BB9282B18948C6B9619",
      source: "https://www.hkri.com/en/Our-Businesses/Hotel-Operations-and-Leisure-Businesses/Hong-Kong/Discovery-Bay-Golf-Club",
      credit: "HKR International / Discovery Bay Golf Club",
      en: "Discovery Bay Golf Club — aerial view of the course and coastline",
      zh: "愉景灣高爾夫球會 — 球場及海岸鳥瞰",
    },
    {
      url: "https://scadmin.hkri.com/-/media/hkri/businesses/hospitality/hong-kong/discovery-bay-golf-club/new_resized/db-golf-club-2_p.jpg?h=545&w=1030&hash=DC54DD762DB1ECE2CCA22F3C1BE5C8C6A75A1F36",
      source: "https://www.hkri.com/en/Our-Businesses/Hotel-Operations-and-Leisure-Businesses/Hong-Kong/Discovery-Bay-Golf-Club",
      credit: "HKR International / Discovery Bay Golf Club",
      en: "Discovery Bay Golf Club — fairway and golf carts",
      zh: "愉景灣高爾夫球會 — 球道及高爾夫球車",
    },
  ],
  "lockcha-tea-house-tai-kwun": [
    {
      url: "https://images.ctfassets.net/o0crhmcwhbe1/2cEMYfmy7B6SgsF4LRJ89Z/86d0001c5a63ef145ab368dda939ed2d/location-taikwun.jpg?fl=progressive&fm=jpg&h=1200&q=85&w=1600",
      source: "https://www.lockcha.com/locations/",
      credit: "LockCha Tea House",
      en: "LockCha Tea House at Tai Kwun — heritage complex setting",
      zh: "樂茶軒大館店 — 古蹟建築群環境",
    },
  ],
  "hong-kong-park-sports-centre": [
    {
      url: "https://hkp.lcsd.gov.hk/rest/original/lcsd_hkpp_dev_ebcf8505ce1735df5e14d90d595bd183d21a232c9df04e5b/spo-1.png",
      source: "https://hkp.lcsd.gov.hk/en/facilities/sport-centre",
      credit: "Leisure and Cultural Services Department",
      en: "Hong Kong Park Sports Centre — indoor badminton arena",
      zh: "香港公園體育館 — 室內羽毛球場",
    },
  ],
  "hong-kong-squash-centre": [
    {
      url: "https://hkp.lcsd.gov.hk/rest/original/lcsd_hkpp_dev_bca88095afb6b0d86897deb1bb010546649c4667b74dfa82/sq-2.png",
      source: "https://hkp.lcsd.gov.hk/en/facilities/squash-centre",
      credit: "Leisure and Cultural Services Department",
      en: "Hong Kong Squash Centre — glass exhibition court",
      zh: "香港壁球中心 — 玻璃展覽場",
    },
  ],
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
  "sauna-rituals-at-the-hideout",
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

for (const [slug, images] of Object.entries(officialSocialSelectionsBySlug)) {
  if (galleries[slug]?.length) continue;
  const venue = Object.values(enrichment.sources)
    .flatMap((entry) => entry.venues ?? [])
    .find((entry) => entry.slug === slug);
  if (!venue) continue;
  const credit = venue.name.split(" — ")[0];
  galleries[slug] = images.map(([url, source], index) => ({
    url,
    source,
    credit: `${credit} / Instagram`,
    alt: {
      en: `${venue.name} — official social photograph${images.length > 1 ? ` ${index + 1}` : ""}`,
      "zh-hk": `${venue.name} — 官方社交媒體相片${images.length > 1 ? ` ${index + 1}` : ""}`,
    },
  }));
  added += 1;
}

for (const [slug, images] of Object.entries(mapsVerifiedOfficialSelectionsBySlug)) {
  if (galleries[slug]?.length) continue;
  galleries[slug] = images.map((image) => ({
    url: image.url,
    source: image.source,
    credit: image.credit,
    alt: { en: image.en, "zh-hk": image.zh },
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
