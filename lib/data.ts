import lcsdSportsCentres from "@/data/lcsd-sports-centres.json";
import { additionalListings } from "@/lib/additional-listings";
import { outdoorSports } from "@/lib/outdoor-sports";
import { privateSports } from "@/lib/private-sports";
import { privateWellness } from "@/lib/private-wellness";
import { contactByName } from "@/lib/contact-details";
import { venueUpdatesSeptember2026 } from "@/lib/venue-updates-2026-09";
import { hyroxListings } from "@/lib/hyrox-listings";
import type { SportId } from "./sports";

export type Locale = "en" | "zh-hk";
export type CategoryId = "movement" | "recovery" | "sauna" | "food" | "shops";
export type TerritoryId = "island" | "kowloon" | "new-territories";

export type LocalText = { en: string; "zh-hk": string };

export type Listing = {
  name: string | LocalText;
  category: CategoryId;
  additionalCategories?: CategoryId[];
  territory: TerritoryId;
  area: LocalText;
  description: LocalText;
  tags: { en: string[]; "zh-hk": string[] };
  url: string;
  address?: LocalText;
  openingHours?: LocalText;
  phone?: string;
  source?: string;
  featured?: boolean;
  sports?: SportId[];
};

export const categories = [
  { id: "movement", label: { en: "Sports & fitness", "zh-hk": "運動健身" }, detail: { en: "HYROX, pickleball, badminton & more", "zh-hk": "HYROX、匹克球、羽毛球等" } },
  { id: "recovery", label: { en: "Ice baths", "zh-hk": "冰浴恢復" }, detail: { en: "Cold plunge & body recovery", "zh-hk": "冰浴及身體恢復" } },
  { id: "sauna", label: { en: "Saunas", "zh-hk": "桑拿熱療" }, detail: { en: "Sauna & infrared spaces", "zh-hk": "桑拿及紅外線熱療" } },
  { id: "food", label: { en: "Healthy dining", "zh-hk": "健康飲食" }, detail: { en: "Balanced & plant-forward dining", "zh-hk": "均衡及植物為本飲食" } },
  { id: "shops", label: { en: "Health shops", "zh-hk": "健康食品店" }, detail: { en: "Organic food & daily essentials", "zh-hk": "有機食品及日常用品" } },
] as const;

export const territories = [
  { id: "island", label: { en: "Hong Kong Island", "zh-hk": "香港島" }, areas: { en: "Central · Wan Chai · Eastern · Southern", "zh-hk": "中西區 · 灣仔 · 東區 · 南區" } },
  { id: "kowloon", label: { en: "Kowloon", "zh-hk": "九龍" }, areas: { en: "Tsim Sha Tsui · Sham Shui Po · Kowloon East", "zh-hk": "尖沙咀 · 深水埗 · 九龍東" } },
  { id: "new-territories", label: { en: "New Territories & Islands", "zh-hk": "新界及離島" }, areas: { en: "Sha Tin · Sai Kung · Tsuen Wan · Islands", "zh-hk": "沙田 · 西貢 · 荃灣 · 離島" } },
] as const;

const featuredListings: Listing[] = [
  {
    name: "Kinship",
    additionalCategories: ["sauna"],
    category: "recovery",
    territory: "island",
    area: { en: "Mid-Levels", "zh-hk": "半山" },
    description: { en: "A guided contrast-therapy space with sauna, cold plunge, hot pool and café.", "zh-hk": "設有桑拿、冰浴、熱水池及咖啡店嘅引導式冷熱交替恢復空間。" },
    tags: { en: ["Cold plunge", "Sauna", "Guided"], "zh-hk": ["冰浴", "桑拿", "專人指導"] },
    url: "https://www.kinship.hk/",
    featured: true,
  },
  {
    name: "ASAP",
    additionalCategories: ["recovery"],
    category: "sauna",
    territory: "island",
    area: { en: "Central", "zh-hk": "中環" },
    description: { en: "A focused Finnish sauna and individual cold-plunge studio on Stanley Street.", "zh-hk": "位於士丹利街，主打芬蘭桑拿及個人冰浴嘅恢復空間。" },
    tags: { en: ["Finnish sauna", "Ice bath"], "zh-hk": ["芬蘭桑拿", "冰浴"] },
    url: "https://comeasap.com/",
    featured: true,
  },
  {
    name: "IKIGAI Causeway Bay",
    category: "movement",
    territory: "island",
    area: { en: "Causeway Bay", "zh-hk": "銅鑼灣" },
    description: { en: "Boutique yoga and meditation with heated and non-heated classes across three studios.", "zh-hk": "精品瑜伽及冥想教室，三間分店提供恆溫及非恆溫課堂。" },
    tags: { en: ["Yoga", "Meditation", "Beginner-friendly"], "zh-hk": ["瑜伽", "冥想", "初學者友善"] },
    url: "https://www.ikigai.hk/en/studios",
    featured: true,
  },
  {
    name: "TREEHOUSE Central",
    category: "food",
    territory: "island",
    area: { en: "Central", "zh-hk": "中環" },
    description: { en: "Fast, whole-food, plant-forward dining with bowls, flatbreads and wraps.", "zh-hk": "主打全天然植物為本快餐，提供碗餐、薄餅及卷物。" },
    tags: { en: ["Plant-forward", "Quick lunch"], "zh-hk": ["植物為本", "快捷午餐"] },
    url: "https://www.treehouse.eco/home",
    featured: true,
  },
  {
    name: "The Player Climbingym",
    category: "movement",
    territory: "kowloon",
    area: { en: "Mei Foo", "zh-hk": "美孚" },
    description: { en: "An indoor climbing gym with bouldering, training areas and programmes for children.", "zh-hk": "設有抱石及訓練區，亦提供兒童攀石課程嘅室內攀石場。" },
    tags: { en: ["Bouldering", "Day pass", "Kids"], "zh-hk": ["抱石", "即日門票", "兒童"] },
    url: "https://www.theplayerclimbing.com/",
  },
  {
    name: "Kai Tak East Sports Centre",
    category: "movement",
    territory: "kowloon",
    area: { en: "San Po Kong", "zh-hk": "新蒲崗" },
    description: { en: "A public sports centre with a 7-metre indoor climbing facility and 20 climbing lanes.", "zh-hk": "康文署公眾體育館，設有七米高室內攀登設施及二十條攀登線。" },
    tags: { en: ["Public facility", "Climbing"], "zh-hk": ["公共設施", "攀石"] },
    url: "https://www.lcsd.gov.hk/clpss/en/webApp/Facility/Details.do?fid=726",
  },
  {
    name: "SpiceBox Organics — Kennedy Town",
    category: "shops",
    territory: "island",
    area: { en: "Kennedy Town", "zh-hk": "堅尼地城" },
    description: { en: "Organic groceries, pantry staples, supplements and low-waste household essentials.", "zh-hk": "搜羅有機食材、健康食品、營養補充品及低廢生活用品。" },
    tags: { en: ["Organic", "Vegan options"], "zh-hk": ["有機", "純素選擇"] },
    url: "https://spiceboxorganics.com/home/",
  },
  {
    name: "Organic Mama",
    category: "shops",
    territory: "kowloon",
    area: { en: "Kwun Tong", "zh-hk": "觀塘" },
    description: { en: "Dietitian-curated groceries, supplements and household products with local delivery.", "zh-hk": "由營養師精選健康食品、營養補充品及家居用品，並提供本地送貨。" },
    tags: { en: ["Groceries", "Delivery"], "zh-hk": ["健康食品", "送貨"] },
    url: "https://www.organicmama.com.hk/en/",
  },
  {
    name: "GO PARK Sai Sha",
    sports: ["climbing", "pickleball"],
    category: "movement",
    territory: "new-territories",
    area: { en: "Sai Sha", "zh-hk": "西沙" },
    description: { en: "A large outdoor sports destination with climbing and multi-sport facilities.", "zh-hk": "大型戶外運動目的地，設有攀石及多項運動設施。" },
    tags: { en: ["Outdoor", "Climbing", "Pickleball"], "zh-hk": ["戶外", "攀石", "匹克球"] },
    url: "https://www.goparksaisha.hk/en/sports/",
  },
];

export function listingName(listing: Listing, locale: Locale) {
  return typeof listing.name === "string" ? listing.name : listing.name[locale];
}

export function listingSlug(listing: Listing) {
  return listingName(listing, "en")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const listings: Listing[] = [
  ...featuredListings,
  ...additionalListings,
  ...privateSports,
  ...privateWellness,
  ...outdoorSports,
  ...venueUpdatesSeptember2026,
  ...hyroxListings,
  ...(lcsdSportsCentres as Listing[]),
].filter((listing, index, all) =>
  all.findIndex((candidate) => listingName(candidate, "en") === listingName(listing, "en")) === index,
).map((listing) => ({
  ...listing,
  ...contactByName[listingName(listing, "en")],
  sports: listing.sports ?? (lcsdSportsCentres as Listing[]).find((item) => listingName(item, "en") === listingName(listing, "en"))?.sports,
}));

export function getListingBySlug(slug: string) {
  return listings.find((listing) => listingSlug(listing) === slug);
}

export const copy = {
  en: {
    navDiscover: "Discover", navAreas: "Areas", navGuide: "Editorial", suggest: "Suggest a place",
    heroEyebrow: "Wellness, around the corner", heroTitle: "Feel good, closer to home.", heroBody: "Explore places to move, recover and eat well across Hong Kong, neighbourhood by neighbourhood.",
    searchPlaceholder: "Venue, activity or district", allAreas: "All of Hong Kong", search: "Find places",
    browseEyebrow: "Browse by interest", browseTitle: "Start with what you need today.", browseBody: "Move, recover, eat well or slow down. There is no single way to feel well.",
    areasEyebrow: "Explore by area", areasTitle: "One city. Many ways to reset.",
    featuredEyebrow: "Curated directory", featuredTitle: "Places worth knowing", featuredBody: "A considered starting point, built from venue and public-facility sources.",
    all: "All", noResults: "No places match those filters yet. Try another area or clear your search.", clear: "Clear filters", view: "View venue", updated: "Details checked 21 September 2026", showMore: "Show more places",
    guideEyebrow: "Opinion & editorial", guideTitle: "Ideas for a healthier Hong Kong.", guideBody: "Original viewpoints on movement, food, recovery and life in the city.", guideCta: "Browse the editorials",
    trustTitle: "Local, useful, transparent.", trustBody: "We show the source for every place and never invent ratings. Details change, so please confirm directly with each venue before visiting.",
    footerNote: "A calmer way to explore wellness across Hong Kong.", disclaimer: "Directory information is general and is not medical advice.",
  },
  "zh-hk": {
    navDiscover: "探索", navAreas: "地區", navGuide: "生活誌", suggest: "推薦好地方",
    heroEyebrow: "好好生活，就喺附近", heroTitle: "搵到香港啱你嘅健康去處。", heroBody: "按地區搵勻全港運動場地、冰浴及恢復空間、健康餐廳同食品店。",
    searchPlaceholder: "搜尋場地、活動或地區", allAreas: "全香港", search: "搜尋地方",
    browseEyebrow: "按需要探索", browseTitle: "由今日需要嘅開始。", browseBody: "想郁動、恢復、食得好，定係放慢節奏？健康生活從來唔止一種方式。",
    areasEyebrow: "按地區探索", areasTitle: "一個香港，多種回復狀態嘅方法。",
    featuredEyebrow: "精選目錄", featuredTitle: "值得認識嘅好地方", featuredBody: "根據場地及公共設施官方資料，整理成一個實用起點。",
    all: "全部", noResults: "暫時搵唔到符合條件嘅地方。可以試吓其他地區，或者清除搜尋。", clear: "清除篩選", view: "查看場地", updated: "資料於 2026 年 9 月 21 日查閱", showMore: "顯示更多地方",
    guideEyebrow: "觀點生活誌", guideTitle: "關於香港健康生活嘅一啲想法。", guideBody: "由運動、飲食、恢復到城市生活，分享原創觀點。", guideCta: "瀏覽生活誌文章",
    trustTitle: "本地、實用、透明。", trustBody: "每個地方都會列出資料來源，亦唔會虛構評分。資料隨時有變，出發前請直接向場地核實。",
    footerNote: "用更輕鬆嘅方式，探索香港健康生活。", disclaimer: "目錄資料只供一般參考，並非醫療建議。",
  },
} satisfies Record<Locale, Record<string, string>>;
