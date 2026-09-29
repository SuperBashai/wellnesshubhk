import type { Listing } from "./data";

const source = "https://www.lcsd.gov.hk/en/facilities/facilitieslist/landsports/freeoutdoor/opening_up_badminton_courts.html";
export const outdoorSports: Listing[] = ([
  ["Bowen Road Temporary Playground", "寶雲道臨時遊樂場", "island", "Wan Chai", "灣仔", "Bowen Road, Wan Chai", "灣仔寶雲道", false],
  ["Kwai Shing Circuit Playground", "葵盛圍遊樂場", "new-territories", "Kwai Chung", "葵涌", "Kwai Shing Circuit, Kwai Chung", "葵涌葵盛圍", true],
  ["Ma Mei Ha Playground", "馬尾下遊樂場", "new-territories", "Fanling", "粉嶺", "Ma Mei Ha, New Territories", "新界馬尾下", false],
  ["Ta Kwu Ling Playground", "打鼓嶺遊樂場", "new-territories", "Ta Kwu Ling", "打鼓嶺", "Ping Che Road, Ta Kwu Ling", "打鼓嶺坪輋路", true],
  ["Tuen Mun Park — Badminton Courts", "屯門公園 — 羽毛球場", "new-territories", "Tuen Mun", "屯門", "Tuen Mun Heung Sze Wui Road", "屯門鄉事會路", true],
  ["Canton Road Playground", "廣東道遊樂場", "kowloon", "Tsim Sha Tsui", "尖沙咀", "176 Canton Road, Kowloon", "九龍廣東道176號", false],
] as const).map(([en, zh, territory, areaEn, areaZh, addressEn, addressZh, markingsOnly]): Listing => ({
  name: { en, "zh-hk": zh }, category: "movement", territory,
  sports: ["pickleball", "badminton"],
  area: {en: areaEn, "zh-hk": areaZh}, address: {en: addressEn, "zh-hk": addressZh},
  description: {
    en: `Outdoor badminton courts included in LCSD’s pickleball trial. ${en.startsWith("Canton") ? "Court 1 requires booking through SmartPLAY." : en.startsWith("Tuen Mun") ? "Courts 1 and 2 are available on a first-come basis." : "First-come access; no advance booking."}${markingsOnly ? " Court markings only; bring your equipment." : " Check equipment requirements before visiting."}`,
    "zh-hk": `康文署匹克球試驗計劃指定戶外羽毛球場。${en.startsWith("Canton") ? "1號場須經SmartPLAY預約。" : en.startsWith("Tuen Mun") ? "1及2號場先到先得。" : "先到先得，毋須預約。"}${markingsOnly ? "只提供球場界線，請自備所需器材。" : "出發前請確認器材要求。"}`,
  },
  tags: {en: ["Pickleball", "Badminton", "Outdoor"], "zh-hk": ["匹克球", "羽毛球", "戶外"]}, url: source, source: "LCSD outdoor pickleball trial",
}));
