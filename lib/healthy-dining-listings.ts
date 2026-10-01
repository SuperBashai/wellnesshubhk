import type { Listing, LocalText, TerritoryId } from "./data";

const checked = "Official operator source checked 1 October 2026";
const decodoChecked = "Official NOOD Food location API retrieved with Decodo and checked 1 October 2026";
const local = (en: string, zh: string): LocalText => ({ en, "zh-hk": zh });

const pickabowl = ([name, zhName, territory, area, areaZh, address, addressZh, phone, hours, hoursZh]: readonly [string, string, TerritoryId, string, string, string, string, string, string?, string?]): Listing => ({
  name: { en: `Pickabowl — ${name}`, "zh-hk": `Pickabowl — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), phone,
  ...(hours && hoursZh ? { openingHours: local(hours, hoursZh) } : {}),
  description: local("A build-your-own Asian bowl counter for choosing a base, protein, vegetables and sauce to suit the way you want to eat.", "自選亞洲碗餐店，可以按需要配搭主食、蛋白質、蔬菜同醬汁，方便食得均衡又有彈性。"),
  tags: { en: ["Build-your-own bowls", "Protein options", "Quick lunch"], "zh-hk": ["自選碗餐", "蛋白質選擇", "快捷午餐"] },
  url: "https://www.pickabowl.com.hk/en/location", source: checked,
});

const pokeWorld = ([name, zhName, territory, area, areaZh, address, addressZh, hours, hoursZh, phone]: readonly [string, string, TerritoryId, string, string, string, string, string, string, string]): Listing => ({
  name: { en: `Pokéworld — ${name}`, "zh-hk": `Pokéworld — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh), phone,
  description: local("A compact poké shop with custom rice, salad and soba bowls, fresh toppings and clearly grouped proteins and vegetables.", "小型夏威夷魚生飯店，提供自選飯、沙律或蕎麥麵碗餐，配搭新鮮配料、蛋白質同蔬菜。"),
  tags: { en: ["Poké", "Custom bowls", "Salad base"], "zh-hk": ["夏威夷魚生飯", "自選碗餐", "沙律底"] },
  url: "https://www.pokeworldhk.com/", source: checked,
});

const heybo = ([name, zhName, territory, area, areaZh, address, addressZh, hours, hoursZh]: readonly [string, string, TerritoryId, string, string, string, string, string, string]): Listing => ({
  name: { en: `Heybo — ${name}`, "zh-hk": `Heybo — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh),
  description: local("A weekday grain-bowl kitchen with build-your-own combinations and useful menu filters for protein, sodium and dietary preferences.", "平日營業嘅穀物碗餐店，提供自選配搭，餐牌亦可按蛋白質、鈉含量同飲食需要篩選。"),
  tags: { en: ["Grain bowls", "Nutrition filters", "Weekday lunch"], "zh-hk": ["穀物碗餐", "營養篩選", "平日午餐"] },
  url: "https://heybo.hk/locations/", source: checked,
});

const feteUp = ([name, zhName, area, areaZh, address, addressZh, hours, hoursZh, phone]: readonly [string, string, string, string, string, string, string, string, string?]): Listing => ({
  name: { en: `Fete Up — ${name}`, "zh-hk": `Fete Up — ${zhName}` }, category: "food", territory: "island",
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh), ...(phone ? { phone } : {}),
  description: local("A colourful bowl bar focused on balanced, customisable meals with vegetables, grains and proteins for an easy city lunch.", "色彩繽紛嘅碗餐店，主打可自選嘅均衡餐點，以蔬菜、穀物同蛋白質組成方便嘅城市午餐。"),
  tags: { en: ["Balanced bowls", "Customisable", "Takeaway"], "zh-hk": ["均衡碗餐", "自選配搭", "外賣"] },
  url: "https://feteup.com/location/", source: checked,
});

const ovo = ([name, zhName, territory, area, areaZh, address, addressZh, hours, hoursZh, phone]: readonly [string, string, TerritoryId, string, string, string, string, string, string, string]): Listing => ({
  name: { en: `OVO Cafe — ${name}`, "zh-hk": `OVO Cafe — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh), phone,
  description: local("A calm vegetarian café within OVO's design space, serving plant-forward meals, salads, sandwiches and tea in an unhurried setting.", "設於 OVO 設計空間內嘅寧靜素食咖啡店，提供植物為本餐點、沙律、三文治同茶飲。"),
  tags: { en: ["Vegetarian", "Plant-forward", "Cafe"], "zh-hk": ["素食", "植物為本", "咖啡店"] },
  url: "https://ovo.com.hk/pages/contact", source: checked,
});

const lockCha = ([name, zhName, area, areaZh, address, addressZh, phone]: readonly [string, string, string, string, string, string, string]): Listing => ({
  name: { en: `LockCha Tea House — ${name}`, "zh-hk": `樂茶軒 — ${zhName}` }, category: "food", territory: "island",
  area: local(area, areaZh), address: local(address, addressZh), phone,
  openingHours: local("Opening hours vary with the heritage venue; confirm with LockCha before visiting.", "營業時間按文化場地安排；出發前請向樂茶軒確認。"),
  description: local("A Hong Kong tea house pairing carefully brewed Chinese tea with vegetarian dim sum in a heritage setting.", "香港茶館，以細心沖泡嘅中國茶配素點心，安坐歷史文化空間慢慢品嚐。"),
  tags: { en: ["Vegetarian dim sum", "Chinese tea", "Heritage setting"], "zh-hk": ["素點心", "中國茶", "歷史空間"] },
  url: "https://www.lockcha.com/locations/", source: checked,
});

const cafe330 = ([name, zhName, territory, area, areaZh, address, addressZh, hours, hoursZh, phone]: readonly [string, string, TerritoryId, string, string, string, string, string, string, string]): Listing => ({
  name: { en: `cafe330 — ${name}`, "zh-hk": `cafe330 — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh), phone,
  description: local("A New Life social-enterprise café built around holistic wellbeing, with low-carbon meals, vegetarian choices, organic ingredients and no added MSG.", "新生會社企咖啡店，以身心靈健康為核心，提供低碳餐點、素食選擇、有機食材，亦不添加味精。"),
  tags: { en: ["Social enterprise", "Low-carbon food", "No added MSG"], "zh-hk": ["社企", "低碳飲食", "不添加味精"] },
  url: "https://www.eshop330.hk/pages/in-store-pickup", source: checked,
});

const nood = ([name, zhName, territory, area, areaZh, address, addressZh, hours, hoursZh, phone]: readonly [string, string, TerritoryId, string, string, string, string, string, string, string]): Listing => ({
  name: { en: `NOOD Food — ${name}`, "zh-hk": `NOOD Food — ${zhName}` }, category: "food", territory,
  area: local(area, areaZh), address: local(address, addressZh), openingHours: local(hours, hoursZh), phone,
  description: local("A nutrition-minded food counter inside a PURE location, offering cold-pressed juices, smoothies, protein snacks and convenient balanced meals.", "設於 PURE 場地內嘅營養餐飲櫃位，提供冷壓果汁、沙冰、蛋白質小食同方便均衡餐點。"),
  tags: { en: ["Inside PURE", "Cold-pressed juice", "Protein snacks"], "zh-hk": ["位於 PURE 內", "冷壓果汁", "蛋白質小食"] },
  url: "https://www.allnood.com/locations", source: decodoChecked,
});

export const healthyDiningListings: Listing[] = [
  ...([
    ["D2 Place", "D2 Place", "kowloon", "Lai Chi Kok", "荔枝角", "Shop 112, 1/F, D2 Place ONE, 9 Cheung Yee Street, Lai Chi Kok", "荔枝角長義街9號D2 Place ONE 1樓112號舖", "+852 2590 9606"],
    ["Citywalk 2", "荃新天地2期", "new-territories", "Tsuen Wan", "荃灣", "Shop G06, Citywalk 2, 18 Yeung Uk Road, Tsuen Wan", "荃灣楊屋道18號荃新天地2期地下G06號舖", "+852 2590 9330"],
    ["Kings Wing Plaza 2", "京瑞廣場2期", "new-territories", "Shek Mun", "石門", "Shop G23, G/F, Kings Wing Plaza 2, Shek Mun", "石門京瑞廣場2期地下G23號舖", "+852 6360 9732"],
    ["AIRside", "啟德 AIRside", "kowloon", "Kai Tak", "啟德", "Shop L105, 1/F, AIRside, 2 Concorde Road, Kai Tak", "啟德協調道2號AIRside 1樓L105號舖", "+852 2686 9993", "Daily 11:30am–9pm", "每日上午11時半至晚上9時"],
  ] as const).map(pickabowl),
  ...([
    ["Sheung Wan", "上環", "island", "Sheung Wan", "上環", "G/F, 8 Hillier Street, Sheung Wan", "上環禧利街8號地下", "Mon–Fri 11:15am–9pm; Sat noon–4:30pm; Sun closed", "星期一至五上午11時15分至晚上9時；星期六中午12時至下午4時半；星期日休息", "+852 2811 2115"],
    ["Kwun Tong", "觀塘", "kowloon", "Kwun Tong", "觀塘", "Shop 5, 1/F, 78 Hung To Road, Kwun Tong", "觀塘鴻圖道78號1樓5號舖", "Mon–Fri 8am–5:30pm; weekends closed", "星期一至五上午8時至下午5時半；週末休息", "+852 2652 2233"],
  ] as const).map(pokeWorld),
  ...([
    ["Dorset House", "德宏大廈", "island", "Quarry Bay", "鰂魚涌", "Shop 3, G/F, Dorset House, Taikoo Place, 979 King's Road, Quarry Bay", "鰂魚涌英皇道979號太古坊德宏大廈地下3號舖", "Mon–Fri 8am–8pm; weekends closed", "星期一至五上午8時至晚上8時；週末休息"],
    ["Jardine House", "怡和大廈", "island", "Central", "中環", "Shop 7, Area 1, LG/F, Jardine House, 1 Connaught Place, Central", "中環康樂廣場1號怡和大廈低層地下1區7號舖", "Mon–Fri 8am–8pm; weekends closed", "星期一至五上午8時至晚上8時；週末休息"],
  ] as const).map(heybo),
  ...([
    ["BaseHall 2", "BaseHall 2", "Central", "中環", "Kiosk 14, BaseHall 2, LG/F, Jardine House, 1 Connaught Place, Central", "中環康樂廣場1號怡和大廈低層地下BaseHall 2第14號舖", "Mon–Fri 11am–9pm; Sat 11am–7pm; Sun & public holidays closed", "星期一至五上午11時至晚上9時；星期六上午11時至晚上7時；星期日及公眾假期休息", undefined],
    ["Causeway Bay", "銅鑼灣", "Causeway Bay", "銅鑼灣", "Shop C2, G/F and B1–3, 1/F, Dragon Rise, 9–11 Pennington Street, Causeway Bay", "銅鑼灣邊寧頓街9至11號Dragon Rise地下C2號舖及1樓B1至B3號舖", "Mon–Fri 11am–8:15pm; weekends & public holidays 9am–5:45pm", "星期一至五上午11時至晚上8時15分；週末及公眾假期上午9時至下午5時45分", "+852 9268 7393"],
  ] as const).map(feteUp),
  ...([
    ["Wan Chai", "灣仔", "island", "Wan Chai", "灣仔", "G/F–1/F, 1 Wan Chai Road, Wan Chai", "灣仔灣仔道1號地下至1樓", "Daily 10:30am–7:30pm", "每日上午10時半至晚上7時半", "+852 2527 6088"],
    ["Horizon Plaza", "新海怡廣場", "island", "Ap Lei Chau", "鴨脷洲", "Shops 501 & 505–506, Horizon Plaza, Ap Lei Chau", "鴨脷洲新海怡廣場501及505至506號舖", "Mon–Sat 10:30am–7pm; Sun & public holidays 11am–7pm", "星期一至六上午10時半至晚上7時；星期日及公眾假期上午11時至晚上7時", "+852 2529 8168"],
    ["The Peninsula", "半島酒店", "kowloon", "Tsim Sha Tsui", "尖沙咀", "Basement, Shops BE7–9, The Peninsula Hong Kong, Salisbury Road, Tsim Sha Tsui", "尖沙咀梳士巴利道香港半島酒店地庫BE7至9號舖", "Daily 11am–7pm", "每日上午11時至晚上7時", "+852 2529 6099"],
  ] as const).map(ovo),
  ...([
    ["Tai Kwun", "大館", "Central", "中環", "G06–G07, Block 01, Tai Kwun, 10 Hollywood Road, Central", "中環荷李活道10號大館01座地下G06至G07號舖", "+852 2276 5777"],
    ["Hong Kong Park", "香港公園", "Admiralty", "金鐘", "G/F, K.S. Lo Gallery, Hong Kong Park, 10 Cotton Tree Drive, Admiralty", "金鐘紅棉路10號香港公園羅桂祥茶藝館地下", "+852 2801 7177"],
  ] as const).map(lockCha),
  {
    name: { en: "SOUTH LANE — Shek Tong Tsui", "zh-hk": "SOUTH LANE — 石塘咀" }, category: "food", territory: "island", area: local("Shek Tong Tsui", "石塘咀"),
    address: local("G/F, 14 South Lane, Shek Tong Tsui", "石塘咀南里14號地下"), openingHours: local("Daily 8am–5:30pm; last order 4:30pm", "每日上午8時至下午5時半；下午4時半截單"), phone: "+852 5744 8390",
    description: local("A neighbourhood café for produce-led breakfasts, nourishing plates, fresh bakes and drinks, with a strong focus on provenance and sustainability.", "社區咖啡店，主打以食材為本嘅早餐、滋養餐點、新鮮烘焙食品同飲品，重視來源及可持續理念。"),
    tags: { en: ["Whole foods", "All-day cafe", "Sustainable"], "zh-hk": ["原型食物", "全日咖啡店", "可持續"] }, url: "https://www.southlane.co/", source: checked,
  },
  {
    name: { en: "SOUTH LANE at Blueprint", "zh-hk": "SOUTH LANE at Blueprint" }, category: "food", territory: "island", area: local("Quarry Bay", "鰂魚涌"),
    address: local("2/F, Dorset House, Taikoo Place, Quarry Bay", "鰂魚涌太古坊德宏大廈2樓Blueprint"), openingHours: local("Mon–Fri 11:30am–2:30pm; public holidays closed", "星期一至五上午11時半至下午2時半；公眾假期休息"),
    description: local("A weekday build-your-own wholesome-bowl counter with hot dishes, salads, pressed juices and smoothies inside Blueprint.", "位於 Blueprint 嘅平日自選健康碗餐櫃位，提供熱食、沙律、冷壓果汁同沙冰。"),
    tags: { en: ["Wholesome bowls", "Pressed juice", "Weekday lunch"], "zh-hk": ["健康碗餐", "冷壓果汁", "平日午餐"] }, url: "https://www.southlane.co/quarry-bay", source: checked,
  },
  {
    name: { en: "Eat Well Café at Kadoorie Farm", "zh-hk": "嘉道理農場 Eat Well Café" }, category: "food", territory: "new-territories", area: local("Lam Tsuen", "林村"),
    address: local("Kadoorie Farm and Botanic Garden, Lam Kam Road, Tai Po", "大埔林錦公路嘉道理農場暨植物園"), openingHours: local("Daily 10am–4:30pm; farm admission and closure dates apply", "每日上午10時至下午4時半；須留意農場入場及休園安排"), phone: "+852 2483 7200",
    description: local("A farm café serving seasonal, locally minded food in the botanic garden, with ingredients and choices shaped by sustainability.", "位於植物園內嘅農場咖啡店，提供時令本地取向餐點，食材同選擇以可持續理念為本。"),
    tags: { en: ["Farm cafe", "Seasonal", "Sustainable"], "zh-hk": ["農場咖啡店", "時令", "可持續"] }, url: "https://www.kfbg.org/en/attractions/Eat-Well-Cafe/", source: checked,
  },
  {
    name: { en: "Adventist Restaurant — Tsuen Wan", "zh-hk": "港安素食餐廳 — 荃灣" }, category: "food", territory: "new-territories", area: local("Tsuen Wan", "荃灣"),
    address: local("Hong Kong Adventist Hospital, 199 Tsuen King Circuit, Tsuen Wan", "荃灣荃景圍199號香港港安醫院"), openingHours: local("Daily 6:30am–7:30pm", "每日上午6時半至晚上7時半"), phone: "+852 2275 6690",
    description: local("A hospital vegetarian restaurant whose menu is developed with nutrition professionals, including vegan, ovo-lacto and gluten-free choices.", "醫院素食餐廳，餐牌由營養專業團隊參與設計，提供純素、蛋奶素同無麩質選擇。"),
    tags: { en: ["Vegetarian", "Nutrition-led", "Gluten-free options"], "zh-hk": ["素食", "營養主導", "無麩質選擇"] }, url: "https://www.twah.org.hk/en/ancillary-services/adventist-restaurant", source: checked,
  },
  ...([
    ["Kowloon Hospital", "九龍醫院", "kowloon", "Mong Kok", "旺角", "G/F, West Wing, Kowloon Hospital, 147A Argyle Street, Kowloon", "九龍亞皆老街147A號九龍醫院西翼大樓地下", "Daily 8am–8:30pm", "每日上午8時至晚上8時半", "+852 2194 6992"],
    ["Kwong Wah Hospital", "廣華醫院", "kowloon", "Yau Ma Tei", "油麻地", "G/F, Kwong Wah Hospital, 25 Waterloo Road, Yau Ma Tei", "油麻地窩打老道25號廣華醫院地下", "Mon–Sat 7am–2:30pm; Sun & public holidays closed", "星期一至六上午7時至下午2時半；星期日及公眾假期休息", "+852 2834 2991"],
    ["Caritas Medical Centre", "明愛醫院", "kowloon", "Sham Shui Po", "深水埗", "4/F, Wai Shun Block, Caritas Medical Centre, 111 Wing Hong Street, Sham Shui Po", "深水埗永康街111號明愛醫院懷信樓4樓", "Daily 7:30am–8:30pm", "每日上午7時半至晚上8時半", "+852 2351 5611"],
    ["The University of Hong Kong", "香港大學", "island", "Pok Fu Lam", "薄扶林", "Room 203, 2/F, Chong Yuet Ming Amenities Centre, The University of Hong Kong", "薄扶林香港大學莊月明文娛中心2樓203室", "Mon–Fri 7:30am–8:30pm; Sat & public holidays 10am–6pm; Sun closed", "星期一至五上午7時半至晚上8時半；星期六及公眾假期上午10時至下午6時；星期日休息", "+852 2794 3778"],
    ["The Chinese University of Hong Kong", "香港中文大學", "new-territories", "Sha Tin", "沙田", "Room 101A, 1/F, Yasumoto International Academic Park, CUHK, Sha Tin", "沙田香港中文大學康本國際學術園1樓101A室", "Mon–Fri 8am–8pm; Sat 8am–6pm; Sun & public holidays closed", "星期一至五上午8時至晚上8時；星期六上午8時至下午6時；星期日及公眾假期休息", "+852 2994 3932"],
    ["inno330 at CUHK", "中大 inno330", "new-territories", "Sha Tin", "沙田", "Unit B, LG/F, InnoPort, The Chinese University of Hong Kong, Sha Tin", "沙田香港中文大學博文苑創博館低層地下B室", "Mon–Fri 8am–8pm; weekends & public holidays 8am–6pm", "星期一至五上午8時至晚上8時；週末及公眾假期上午8時至下午6時", "+852 2395 3818"],
    ["so330", "so330", "island", "Wan Chai", "灣仔", "Shops A–C, G/F, Tai Yuen Court, 38 Tai Yuen Street, Wan Chai", "灣仔太原街38號太源閣地下A至C號舖", "Mon–Fri 7:30am–6:30pm; weekends & public holidays 10am–6:30pm", "星期一至五上午7時半至下午6時半；週末及公眾假期上午10時至下午6時半", "+852 2393 0426"],
    ["Kwai Chung Hospital", "葵涌醫院", "new-territories", "Kwai Chung", "葵涌", "2/F, Blocks DE, Kwai Chung Hospital, Kwai Chung", "葵涌葵涌醫院DE座2樓", "Daily 7:30am–8:30pm", "每日上午7時半至晚上8時半", "+852 2387 2108"],
  ] as const).map(cafe330),
  ...([
    ["Asia Standard Tower", "亞洲標準大廈", "island", "Central", "中環", "2/F, Asia Standard Tower, 59–65 Queen's Road Central", "中環皇后大道中59至65號亞洲標準大廈2樓", "Mon–Fri 6:30am–10pm; weekends & public holidays 9am–7:30pm", "星期一至五上午6時半至晚上10時；週末及公眾假期上午9時至晚上7時半", "+852 3691 3642"],
    ["World Trade Centre", "世貿中心", "island", "Causeway Bay", "銅鑼灣", "7/F, World Trade Centre, 280 Gloucester Road, Causeway Bay", "銅鑼灣告士打道280號世貿中心7樓", "Daily 10am–6pm", "每日上午10時至下午6時", "+852 2298 5221"],
    ["PCCW Tower", "電訊盈科中心", "island", "Quarry Bay", "鰂魚涌", "5/F, PCCW Tower, Taikoo Place, 979 King's Road, Quarry Bay", "鰂魚涌英皇道979號太古坊電訊盈科中心5樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3984"],
    ["ICBC Tower", "中國工商銀行大廈", "island", "Central", "中環", "3/F, ICBC Tower, 3 Garden Road, Central", "中環花園道3號中國工商銀行大廈3樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3983"],
    ["Kinwick Centre", "建業榮基中心", "island", "Central", "中環", "2/F, Kinwick Centre, 32 Hollywood Road, Central", "中環荷李活道32號建業榮基中心2樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3271"],
    ["Starstreet Precinct", "星街小區", "island", "Wan Chai", "灣仔", "3–19 Wing Fung Street, Starstreet Precinct, Wan Chai", "灣仔星街小區永豐街3至19號", "Mon–Fri 7am–10pm; weekends & public holidays 9am–7:30pm", "星期一至五上午7時至晚上10時；週末及公眾假期上午9時至晚上7時半", "+852 2298 5310"],
    ["Pacific Place", "太古廣場", "island", "Admiralty", "金鐘", "Shop 101, Pacific Place, 88 Queensway, Admiralty", "金鐘金鐘道88號太古廣場101號舖", "Mon–Fri 7am–10pm; weekends & public holidays 9am–7:30pm", "星期一至五上午7時至晚上10時；週末及公眾假期上午9時至晚上7時半", "+852 2298 5180"],
    ["Lee Theatre Plaza", "利舞臺廣場", "island", "Causeway Bay", "銅鑼灣", "15/F, Lee Theatre Plaza, 99 Percival Street, Causeway Bay", "銅鑼灣波斯富街99號利舞臺廣場15樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3229"],
    ["ifc mall", "國際金融中心商場", "island", "Central", "中環", "3/F, ifc mall, 8 Finance Street, Central", "中環金融街8號國際金融中心商場3樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3489"],
    ["Langham Place", "朗豪坊", "kowloon", "Mong Kok", "旺角", "7/F, Langham Place Office Tower, 8 Argyle Street, Mong Kok", "旺角亞皆老街8號朗豪坊辦公大樓7樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 3691 3568"],
    ["One Hennessy", "One Hennessy", "island", "Wan Chai", "灣仔", "2/F, One Hennessy, 1 Hennessy Road, Wan Chai", "灣仔軒尼詩道1號One Hennessy 2樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 2298 5406"],
    ["Manulife Place", "宏利廣場", "kowloon", "Kwun Tong", "觀塘", "1/F, Manulife Place, 348 Kwun Tong Road, Kwun Tong", "觀塘觀塘道348號宏利廣場1樓", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 2298 5356"],
    ["K11 MUSEA", "K11 MUSEA", "kowloon", "Tsim Sha Tsui", "尖沙咀", "Shop 611A, 6/F, K11 MUSEA, Victoria Dockside, 18 Salisbury Road, Tsim Sha Tsui", "尖沙咀梳士巴利道18號Victoria Dockside K11 MUSEA 6樓611A號舖", "Mon–Sat 6:30am–11pm; Sun & public holidays 8:30am–9:30pm", "星期一至六上午6時半至晚上11時；星期日及公眾假期上午8時半至晚上9時半", "+852 2298 5456"],
    ["Re:set by PURE", "Re:set by PURE", "island", "Causeway Bay", "銅鑼灣", "11/F, Lee Theatre Plaza, 99 Percival Street, Causeway Bay", "銅鑼灣波斯富街99號利舞臺廣場11樓", "Mon–Fri 10am–8pm; weekends 8am–7pm", "星期一至五上午10時至晚上8時；週末上午8時至晚上7時", "+852 2122 4386"],
  ] as const).map(nood),
];
