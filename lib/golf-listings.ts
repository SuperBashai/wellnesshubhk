import type { Listing } from "./data";

const checked = "Official venue website checked 1 October 2026";

export const golfListings: Listing[] = [
  {
    name: { en: "Smash Factor", "zh-hk": "Smash Factor 室內高爾夫" }, category: "movement", territory: "kowloon",
    area: { en: "Kwun Tong", "zh-hk": "觀塘" }, sports: ["golf"],
    description: { en: "A booking-only indoor golf club with five TrackMan 4 bays, including three private rooms, virtual courses and PGA coaching.", "zh-hk": "只限預約嘅室內高爾夫球會，設五個 TrackMan 4 球道，包括三間私人房、虛擬球場及 PGA 教練課程。" },
    tags: { en: ["Indoor golf", "TrackMan", "Private rooms"], "zh-hk": ["室內高爾夫", "TrackMan", "私人房"] },
    url: "https://smashfactor.hk/", address: { en: "Kwun Tong, Kowloon (booking confirmation provides access details)", "zh-hk": "九龍觀塘（詳細進場資料以預約確認為準）" }, source: checked,
  },
  {
    name: { en: "Optimus Golf Performance", "zh-hk": "Optimus Golf Performance" }, category: "movement", territory: "island",
    area: { en: "Causeway Bay", "zh-hk": "銅鑼灣" }, sports: ["golf"],
    description: { en: "A full indoor golf training facility with simulator bays, private rooms, putting and chipping greens, a real-sand bunker and performance lab.", "zh-hk": "綜合室內高爾夫訓練場，設模擬器球道、私人房、推桿及切桿果嶺、真沙沙坑同表現分析室。" },
    tags: { en: ["Indoor golf", "Short game", "Coaching"], "zh-hk": ["室內高爾夫", "短桿練習", "教練課程"] },
    url: "https://www.ogp.hk/service/indoorgolf-simulators", address: { en: "Units 5B–5C, Victoria Centre, 15 Watson Road, Causeway Bay", "zh-hk": "銅鑼灣屈臣道15號維多利中心5B至5C室" }, source: checked,
  },
  {
    name: { en: "Hi Tee Golf — San Po Kong", "zh-hk": "Hi Tee Golf — 新蒲崗" }, category: "movement", territory: "kowloon",
    area: { en: "San Po Kong", "zh-hk": "新蒲崗" }, sports: ["golf"],
    description: { en: "Indoor golf simulation centre with multiple bays for practice, virtual rounds, lessons and private group sessions.", "zh-hk": "室內高爾夫模擬中心，設多個球道，提供練習、虛擬球局、課堂及私人小組活動。" },
    tags: { en: ["Indoor golf", "Simulator", "Lessons"], "zh-hk": ["室內高爾夫", "模擬器", "課堂"] },
    url: "https://hiteegolf.com/contact_us/", address: { en: "5/F, Lee Wan Industrial Building, 5 Luk Hop Street, San Po Kong", "zh-hk": "新蒲崗六合街5號利運工業大廈5樓" }, source: checked,
  },
  {
    name: { en: "Hi Tee Golf — Quarry Bay", "zh-hk": "Hi Tee Golf — 鰂魚涌" }, category: "movement", territory: "island",
    area: { en: "Quarry Bay", "zh-hk": "鰂魚涌" }, sports: ["golf"],
    description: { en: "Indoor golf simulation centre at Taikoo Place with bays for practice, virtual rounds, lessons and group play.", "zh-hk": "位於太古坊嘅室內高爾夫模擬中心，提供練習、虛擬球局、課堂及小組活動球道。" },
    tags: { en: ["Indoor golf", "Simulator", "Lessons"], "zh-hk": ["室內高爾夫", "模擬器", "課堂"] },
    url: "https://hiteegolf.com/contact_us/", address: { en: "14/F, Cambridge House, Taikoo Place, 979 King's Road, Quarry Bay", "zh-hk": "鰂魚涌英皇道979號太古坊康橋大廈14樓" }, source: checked,
  },
  ...([ 
    ["GOLFZON — Causeway Bay", "GOLFZON — 銅鑼灣", "island", "Causeway Bay", "銅鑼灣", "2/F, SCAA Sports Complex, 88 Caroline Hill Road, Causeway Bay", "銅鑼灣加路連山道88號南華體育會運動大樓2樓"],
    ["GOLFZON — Admiralty", "GOLFZON — 金鐘", "island", "Admiralty", "金鐘", "Shops 70–79 & 91–97, 2/F, Admiralty Centre, 18 Harcourt Road", "金鐘夏慤道18號海富中心2樓70至79及91至97號舖"],
    ["GOLFZON — Lai Chi Kok", "GOLFZON — 荔枝角", "kowloon", "Lai Chi Kok", "荔枝角", "Shops 114–127, 1/F, D2 Place ONE, 9 Cheung Yee Street, Lai Chi Kok", "荔枝角長義街9號D2 Place ONE 1樓114至127號舖"],
    ["GOLFZON — Tsim Sha Tsui East", "GOLFZON — 尖沙咀東", "kowloon", "Tsim Sha Tsui East", "尖沙咀東", "Shops 147–153, 155–156, 1/F, New Mandarin Plaza, 14 Science Museum Road", "尖沙咀東科學館道14號新文華中心商場1樓147至153及155至156號舖"],
    ["GOLFZON — Kowloon Bay", "GOLFZON — 九龍灣", "kowloon", "Kowloon Bay", "九龍灣", "Shop 11, 1/F, The Quayside, 77 Hoi Bun Road, Kowloon Bay", "九龍灣海濱道77號海濱匯1樓11號舖"],
  ] as const).map(([en, zh, territory, areaEn, areaZh, addressEn, addressZh]): Listing => ({
    name: { en, "zh-hk": zh }, category: "movement", territory, area: { en: areaEn, "zh-hk": areaZh }, sports: ["golf"],
    description: { en: "An urban indoor golf venue with GOLFZON simulators, swing-analysis cameras, virtual courses and coaching for different levels.", "zh-hk": "市區室內高爾夫場地，設 GOLFZON 模擬器、揮桿分析鏡頭、虛擬球場及不同程度教練課程。" },
    tags: { en: ["Indoor golf", "GOLFZON", "Coaching"], "zh-hk": ["室內高爾夫", "GOLFZON", "教練課程"] },
    url: "https://www.golfzonhk.com/", address: { en: addressEn, "zh-hk": addressZh }, source: checked,
  })),
  ...([
    ["Shots Factory — HKU", "Shots Factory — 香港大學", "Sai Ying Pun", "西營盤", "Unit 2109, 21/F, Hong Kong Plaza, 188 Connaught Road West", "干諾道西188號香港商業中心21樓2109室"],
    ["Shots Factory — Wan Chai", "Shots Factory — 灣仔", "Wan Chai", "灣仔", "9/F, Plaza 228, 228 Wan Chai Road", "灣仔灣仔道228號灣仔 228 9樓"],
  ] as const).map(([en, zh, areaEn, areaZh, addressEn, addressZh]): Listing => ({
    name: { en, "zh-hk": zh }, category: "movement", territory: "island", area: { en: areaEn, "zh-hk": areaZh }, sports: ["golf"],
    description: { en: "A TrackMan indoor golf studio with high-speed swing cameras, simulator practice, lessons and member access around the clock.", "zh-hk": "TrackMan 室內高爾夫教室，設高速揮桿鏡頭、模擬練習、教練課程及會員24小時使用。" },
    tags: { en: ["Indoor golf", "TrackMan", "24-hour member access"], "zh-hk": ["室內高爾夫", "TrackMan", "會員24小時使用"] },
    url: "https://shots-factory.com/", address: { en: addressEn, "zh-hk": addressZh }, source: checked,
  })),
  {
    name: { en: "7Iron HK — Wong Chuk Hang", "zh-hk": "7Iron HK — 黃竹坑" }, category: "movement", territory: "island", area: { en: "Wong Chuk Hang", "zh-hk": "黃竹坑" }, sports: ["golf"],
    description: { en: "A relaxed indoor golf studio with virtual bays and PGA-certified coaching, available without a membership fee.", "zh-hk": "氣氛輕鬆嘅室內高爾夫教室，設虛擬球道及 PGA 認證教練，毋須繳付會籍費。" },
    tags: { en: ["Indoor golf", "No membership required", "Coaching"], "zh-hk": ["室內高爾夫", "毋須會籍", "教練課程"] },
    url: "https://www.7ironhk.com/", address: { en: "19/F, Gee Chang Hong Centre, 65 Wong Chuk Hang Road", "zh-hk": "黃竹坑道65號志昌行中心19樓" }, source: checked,
  },
  {
    name: { en: "Golf Partners", "zh-hk": "Golf Partners" }, category: "movement", territory: "island", area: { en: "Central", "zh-hk": "中環" }, sports: ["golf"],
    description: { en: "A personal indoor golf studio offering simulator practice, coaching, virtual rounds and specialist club fitting in Central.", "zh-hk": "位於中環嘅個人化室內高爾夫教室，提供模擬練習、教練課程、虛擬球局及專業球桿度身訂造。" },
    tags: { en: ["Indoor golf", "Coaching", "Club fitting"], "zh-hk": ["室內高爾夫", "教練課程", "球桿度身訂造"] },
    url: "https://www.golfpartners.com.hk/", address: { en: "5/F, Pottinger House, 24–26 Pottinger Street, Central", "zh-hk": "中環砵典乍街24至26號寶城大廈5樓" }, source: checked,
  },
  {
    name: { en: "Tour Mechanics", "zh-hk": "Tour Mechanics" }, category: "movement", territory: "island", area: { en: "Sheung Wan", "zh-hk": "上環" }, sports: ["golf"],
    description: { en: "A TrackMan-powered indoor centre for simulator practice, private coaching, video lessons and biomechanics analysis.", "zh-hk": "採用 TrackMan 嘅室內高爾夫中心，提供模擬練習、私人教練、影片課堂及生物力學分析。" },
    tags: { en: ["Indoor golf", "TrackMan", "Biomechanics"], "zh-hk": ["室內高爾夫", "TrackMan", "生物力學"] },
    url: "https://www.tourmechanicshk.com/", address: { en: "Shop 6, The Center, 99 Queen's Road Central, Sheung Wan", "zh-hk": "上環皇后大道中99號中環中心6號舖" }, source: checked,
  },
  {
    name: { en: "GOLFTEC Hong Kong", "zh-hk": "GOLFTEC 香港" }, category: "movement", territory: "island", area: { en: "Admiralty", "zh-hk": "金鐘" }, sports: ["golf"],
    description: { en: "Technology-led golf coaching and club fitting with swing analysis, launch monitors and individual practice support.", "zh-hk": "科技主導嘅高爾夫教練及球桿度身訂造中心，提供揮桿分析、發射監測器及個人練習支援。" },
    tags: { en: ["Indoor golf", "Swing analysis", "Club fitting"], "zh-hk": ["室內高爾夫", "揮桿分析", "球桿度身訂造"] },
    url: "https://golftec.com.hk/golf-lessons/hong-kong", address: { en: "4/F, Admiralty Centre Tower II, 18 Harcourt Road, Admiralty", "zh-hk": "金鐘夏慤道18號海富中心二座4樓" }, source: checked,
  },
  {
    name: { en: "The Golf Bay", "zh-hk": "The Golf Bay" }, category: "movement", territory: "new-territories", area: { en: "Discovery Bay", "zh-hk": "愉景灣" }, sports: ["golf"],
    description: { en: "A bookable indoor virtual-golf venue at DB North Plaza with two simulator bays and equipment for casual practice or rounds.", "zh-hk": "位於愉景北商場嘅室內虛擬高爾夫場，可預約兩個模擬球道，適合輕鬆練習或打虛擬球局。" },
    tags: { en: ["Indoor golf", "Simulator", "Visitor booking"], "zh-hk": ["室內高爾夫", "模擬器", "訪客預約"] },
    url: "https://www.thegolfbay.hk/", address: { en: "Shop 104A, 1/F, DB North Plaza, 92 Siena Avenue, Discovery Bay", "zh-hk": "愉景灣海澄湖畔路92號愉景北商場1樓104A號舖" }, source: checked,
  },
  {
    name: { en: "Jockey Club Kau Sai Chau Public Golf Course", "zh-hk": "賽馬會滘西洲公眾高爾夫球場" }, category: "movement", territory: "new-territories", area: { en: "Sai Kung", "zh-hk": "西貢" }, sports: ["golf"],
    description: { en: "Hong Kong's public golf facility with three 18-hole courses, a floodlit driving range, short-game practice and instruction for beginners through advanced players.", "zh-hk": "香港公眾高爾夫設施，設三個18洞球場、燈光練習場、短桿練習區，以及由初學至進階課程。" },
    tags: { en: ["Outdoor golf", "Public course", "Driving range"], "zh-hk": ["戶外高爾夫", "公眾球場", "練習場"] },
    url: "https://www.kscgolf.org.hk/eng/", address: { en: "Kau Sai Chau, Sai Kung (ferry from Sai Kung Pier)", "zh-hk": "西貢滘西洲（由西貢碼頭乘專船）" }, source: checked,
  },
  {
    name: { en: "Hong Kong Golf Club — Fanling", "zh-hk": "香港哥爾夫球會 — 粉嶺" }, category: "movement", territory: "new-territories", area: { en: "Fanling", "zh-hk": "粉嶺" }, sports: ["golf"],
    description: { en: "Three outdoor 18-hole courses plus a 32-bay driving range. Weekday visitor tee times and a nightly public driving-range session are available under club conditions.", "zh-hk": "設三個戶外18洞球場及32條球道練習場；按球會條款提供平日訪客開球時間及每晚公眾練習場時段。" },
    tags: { en: ["Outdoor golf", "Visitor access", "Driving range"], "zh-hk": ["戶外高爾夫", "訪客使用", "練習場"] },
    url: "https://hkgolfclub.org/public-golfing-access", address: { en: "Lot No. 1 Fan Kam Road, Sheung Shui", "zh-hk": "上水粉錦公路1號地段" }, source: checked,
  },
  {
    name: { en: "Hong Kong Golf Club — Deep Water Bay", "zh-hk": "香港哥爾夫球會 — 深水灣" }, category: "movement", territory: "island", area: { en: "Deep Water Bay", "zh-hk": "深水灣" }, sports: ["golf"],
    description: { en: "A compact outdoor nine-hole course and night practice range. Visitor reservations and guest access depend on the club schedule.", "zh-hk": "小型戶外九洞球場及夜間練習場；訪客預約及賓客使用須按球會時間表安排。" },
    tags: { en: ["Outdoor golf", "Nine holes", "Night range"], "zh-hk": ["戶外高爾夫", "九洞球場", "夜間練習場"] },
    url: "https://hkgolfclub.org/course", address: { en: "19 Island Road, Deep Water Bay", "zh-hk": "深水灣香島道19號" }, source: checked,
  },
  {
    name: { en: "The Clearwater Bay Golf & Country Club", "zh-hk": "清水灣鄉村俱樂部" }, category: "movement", territory: "new-territories", area: { en: "Clearwater Bay", "zh-hk": "清水灣" }, sports: ["golf"],
    description: { en: "An 18-hole coastal golf course with practice facilities. Limited weekday-morning visitor play is available by advance booking and handicap requirements apply.", "zh-hk": "設18洞海岸高爾夫球場及練習設施；合資格訪客可預約指定平日上午時段，並須符合差點要求。" },
    tags: { en: ["Outdoor golf", "Limited visitor access", "Members club"], "zh-hk": ["戶外高爾夫", "有限訪客時段", "會員球會"] },
    url: "https://www.cwbgolf.org/golf-club/", address: { en: "139 Tai Au Mun Road, Clearwater Bay", "zh-hk": "清水灣大坳門路139號" }, source: checked,
  },
  {
    name: { en: "Discovery Bay Golf Club", "zh-hk": "愉景灣高爾夫球會" }, category: "movement", territory: "new-territories", area: { en: "Discovery Bay", "zh-hk": "愉景灣" }, sports: ["golf"],
    description: { en: "A private hilltop golf club with three nine-hole loops and an outdoor driving range; access is for members and eligible guests.", "zh-hk": "私人山頂高爾夫球會，設三組九洞球場及戶外練習場，只供會員及合資格賓客使用。" },
    tags: { en: ["Outdoor golf", "Members club", "Driving range"], "zh-hk": ["戶外高爾夫", "會員球會", "練習場"] },
    url: "https://www.dbgc.hk/", address: { en: "Valley Road, Discovery Bay, Lantau Island", "zh-hk": "大嶼山愉景灣山谷道" }, source: checked,
  },
  {
    name: { en: "Hong Kong Golf & Tennis Academy", "zh-hk": "香港高爾夫球及網球學院" }, category: "movement", territory: "new-territories", area: { en: "Sai Kung", "zh-hk": "西貢" }, sports: ["golf", "tennis", "swimming", "gym", "badminton", "basketball"],
    description: { en: "A private sports and wellness academy with 75 golf hitting bays, a short-game course, putting and chipping greens, indoor coaching studios and Topgolf Swing Suite.", "zh-hk": "私人運動及健康學院，設75個高爾夫擊球位、短桿球場、推桿及切桿果嶺、室內教練室同 Topgolf Swing Suite。" },
    tags: { en: ["Outdoor golf", "Golf academy", "Private club"], "zh-hk": ["戶外高爾夫", "高爾夫學院", "私人會所"] },
    url: "https://www.hkgta.com/", address: { en: "81 Tai Chung Hau, Sai Kung", "zh-hk": "西貢大涌口81號" }, source: checked,
  },
];
