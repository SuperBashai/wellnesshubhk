import type { LocalText } from "@/lib/data";

export type AreaHub = {
  slug: string;
  name: LocalText;
  mtr: LocalText;
  intro: LocalText;
  note: LocalText;
};

export const areaHubs: AreaHub[] = [
  {
    slug: "central", name: { en: "Central", "zh-hk": "中環" }, mtr: { en: "Central Station", "zh-hk": "中環站" },
    intro: { en: "From a quick class before work to a considered lunch or a slower recovery session, Central has plenty of ways to fit wellness into a working day.", "zh-hk": "返工前上一堂運動課、午飯食得好啲，或者放工後慢慢恢復：中環有唔少方法，令健康生活融入工作日。" },
    note: { en: "Central venues range from walk-in dining to studios that require advance booking. Check each listing for its exact address, hours and official booking link.", "zh-hk": "中環有即到即食嘅餐廳，亦有需要預約嘅教室。請到場地頁核對詳細地址、營業時間同官方預約連結。" },
  },
  {
    slug: "wan-chai", name: { en: "Wan Chai", "zh-hk": "灣仔" }, mtr: { en: "Wan Chai Station", "zh-hk": "灣仔站" },
    intro: { en: "Wan Chai mixes everyday sports facilities with independent studios and food stops, making it easy to plan a session around a commute or lunch break.", "zh-hk": "灣仔既有日常運動設施，亦有獨立教室同健康餐飲，方便你喺通勤途中或午飯時間安排一節活動。" },
    note: { en: "Public facilities and private studios have different booking rules and prices. Confirm the latest details with the operator before travelling.", "zh-hk": "公共設施同私人教室嘅預約方法及收費各有不同，出發前記得向營運方確認最新安排。" },
  },
  {
    slug: "causeway-bay", name: { en: "Causeway Bay", "zh-hk": "銅鑼灣" }, mtr: { en: "Causeway Bay Station", "zh-hk": "銅鑼灣站" },
    intro: { en: "Between busy streets and shopping floors, Causeway Bay has a concentrated mix of movement studios, recovery spaces and places to eat well.", "zh-hk": "鬧市同商場之間，銅鑼灣集中了運動教室、恢復空間同健康餐飲，想搵個時間照顧自己，可以由呢度開始。" },
    note: { en: "Many places are inside commercial buildings. Check the floor and unit number on the venue page, and confirm whether a class or treatment needs a reservation.", "zh-hk": "唔少場地位於商業大廈內，請先睇清場地頁嘅樓層同單位，再確認課堂或療程係咪需要預約。" },
  },
  {
    slug: "tsim-sha-tsui", name: { en: "Tsim Sha Tsui", "zh-hk": "尖沙咀" }, mtr: { en: "Tsim Sha Tsui Station", "zh-hk": "尖沙咀站" },
    intro: { en: "Tsim Sha Tsui has options for training, recovery and food within a compact part of Kowloon, with choices that work for a short visit or a longer afternoon.", "zh-hk": "尖沙咀喺九龍一個相對集中的範圍內，提供運動、恢復同飲食選擇，無論匆匆一訪定慢慢過一個下午，都有地方可以探索。" },
    note: { en: "The station has several exits and venues may be in upper-floor units. Check the exact address and access arrangements before you go.", "zh-hk": "尖沙咀站出口多，部分場地亦喺樓上舖；出發前請核對詳細地址同進場安排。" },
  },
  {
    slug: "sai-ying-pun", name: { en: "Sai Ying Pun", "zh-hk": "西營盤" }, mtr: { en: "Sai Ying Pun Station", "zh-hk": "西營盤站" },
    intro: { en: "Sai Ying Pun offers a smaller, neighbourhood-scale mix of training and wellness shops—useful for building a routine close to home.", "zh-hk": "西營盤有比較貼近街坊日常嘅運動場地同健康小店，想建立一個離屋企近啲嘅習慣，可以喺呢度搵靈感。" },
    note: { en: "The neighbourhood is hilly. Compare the venue address with your preferred MTR exit and confirm any class booking before setting out.", "zh-hk": "區內斜路唔少，出發前可以對照場地地址同港鐵出口，亦記得確認課堂預約。" },
  },
];
