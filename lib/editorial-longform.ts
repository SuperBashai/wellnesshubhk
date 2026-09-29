import type { LocalText } from "./data";

type LongformSection = { heading: LocalText; paragraphs: LocalText[] };

export const editorialLongform: Record<string, LongformSection[]> = {
  "convenience-is-the-real-wellness-luxury": [
    {
      heading: { en: "Friction decides more than motivation", "zh-hk": "阻力往往比意志更有決定性" },
      paragraphs: [
        { en: "The wellness industry likes motivation because motivation can be sold back to us: a challenge, a new identity, a dramatic before-and-after. Daily behaviour is less cinematic. It is shaped by the minutes between leaving work and arriving somewhere, whether a lift is crowded, whether a class requires booking days ahead, and whether dinner still needs to be made afterwards. These details look trivial until they repeat fifty times. Then they become the routine itself.", "zh-hk": "健康產業鍾意講動力，因為動力可以包裝成挑戰、新身份同戲劇性改變再賣畀我哋。但日常行為冇咁上鏡。放工後去一個地方要幾耐、升降機逼唔逼、課堂係咪要幾日前預約、返屋企仲使唔使煮飯，先真正塑造習慣。呢啲細節重複五十次之後，就係習慣本身。" },
        { en: "Hong Kong is unusually good at compressing life. A sports centre can sit above a wet market; a yoga room can be three floors from an office; a trail can begin behind a housing estate. Yet we often ignore this advantage while chasing an ideal routine imported from places with spare rooms, cars and spacious weekends. Local wellness should begin with the city as it is: dense, vertical, fast, humid and full of useful things hidden upstairs.", "zh-hk": "香港特別擅長將生活壓縮：街市樓上可以有體育館，辦公室三層之外可以有瑜伽室，屋邨後面已經係行山徑。但我哋成日忽略呢種優勢，反而追逐一套來自有大屋、有車、有完整週末嘅理想習慣。本地健康生活應該由真實香港開始：密集、垂直、急速、潮濕，而且好多好地方都藏喺樓上。" },
      ],
    },
    {
      heading: { en: "Design three versions of the habit", "zh-hk": "為同一習慣設計三個版本" },
      paragraphs: [
        { en: "A durable routine has more than one setting. There is the full version for a good Saturday: a class, a shower, perhaps lunch nearby. There is the weekday version that fits between work and home. And there should be a minimum version for the week that goes wrong: twenty minutes in the nearest pool, a walk around the block, or a meal assembled from the healthy shop downstairs. The minimum is not failure. It is the bridge that keeps a practice familiar.", "zh-hk": "耐用嘅習慣唔應該得一個檔位。狀態好嘅星期六，可以上完整課堂、沖涼，再喺附近食午餐；平日版本要放得入工作同返屋企之間；仲要有一個畀失控星期用嘅最低版本：最近泳池游二十分鐘、行一圈，或者喺樓下健康店買材料砌一餐。最低版本唔係失敗，而係令習慣保持熟悉嘅橋。" },
        { en: "This is also why locality matters more than a single citywide ranking. The best gym in Hong Kong may be irrelevant to someone who crosses the harbour in the opposite direction. A modest studio on the route home may create hundreds of useful visits. Quality still matters, but quality includes access, timetable, welcome, price and the likelihood that you can return without reorganising your life around it.", "zh-hk": "所以地區性比一張全港排名更重要。全香港最好嘅健身室，如果同你返屋企方向相反，可能完全冇用；放工路上普通但舒服嘅教室，反而可以帶來幾百次真實到訪。質素仍然重要，但交通、時間表、態度、價錢，同你需唔需要為佢重組生活，都係質素一部分。" },
      ],
    },
    {
      heading: { en: "A more generous definition of luxury", "zh-hk": "重新定義奢侈" },
      paragraphs: [
        { en: "Luxury is usually described through rarity: the private room, the imported treatment, the view nobody else can access. For everyday wellbeing, repetition is more valuable. The luxurious thing is a place that remembers your name, a court you can afford every week, opening hours that acknowledge shift work, or a nourishing dinner that does not require a reservation. Reliability is less photogenic than exclusivity, but it is far more capable of changing a life.", "zh-hk": "奢侈通常用稀有去形容：私人房、入口療程、其他人去唔到嘅景觀。但對日常健康而言，重複先更有價值。有人記得你個名、每星期都負擔得到嘅球場、照顧輪班人士嘅開放時間、唔使訂位都食到嘅舒服晚餐，先係真正奢侈。可靠冇獨家咁上鏡，但更有能力改變生活。" },
        { en: "So begin with a map, not a fantasy. Mark home, work and the stations you already use. Look for one place to move, one place to eat well and one place to slow down inside that ordinary geography. Try them at the inconvenient time, not only on a perfect day. If they still work, you have found something better than an aspirational destination. You have found infrastructure for the life you already live.", "zh-hk": "所以由地圖開始，唔係由幻想開始。標低屋企、公司同你本身會用嘅車站，再喺呢個日常範圍內搵一個郁動、一個食好啲、一個慢落嚟嘅地方。唔好只喺完美日子試，要喺最唔方便嘅時間試。如果仍然行得通，你搵到嘅唔只係令人嚮往嘅目的地，而係支撐現有生活嘅基建。" },
      ],
    },
  ],
  "hong-kong-does-not-need-more-punishing-workouts": [
    {
      heading: { en: "When fitness copies office culture", "zh-hk": "當健身複製辦公室文化" },
      paragraphs: [
        { en: "Many people arrive at exercise already tired. They have spent the day answering messages, navigating deadlines and measuring themselves against people who appear to be coping better. Then fitness offers another dashboard: pace, zones, streaks, calories, rankings. Data can be useful, but it can also turn the hour that was meant to restore us into another place where we are behind. The body becomes a project manager with no authority to cancel the meeting.", "zh-hk": "好多人開始運動之前已經好攰：成日覆訊息、追死線，再同睇落應付得更好嘅人比較。之後健身又畀多一塊儀表板：速度、心率區、連續日數、卡路里、排名。數據可以有用，但亦可以將原本用嚟恢復嘅一小時，變成另一個落後嘅地方。身體好似一個冇權取消會議嘅項目經理。" },
        { en: "The harshest workout is not automatically the most effective one. Adaptation depends on challenge, but also on sleep, nutrition, consistency and enough recovery to absorb that challenge. A programme that repeatedly leaves someone dreading the next session may be intense without being intelligent. In a city where long hours and short sleep are common, the sensible training plan has to account for the stress that happened before anyone entered the gym.", "zh-hk": "最辛苦唔等於最有效。進步需要刺激，但亦需要睡眠、營養、持續性，同足夠恢復去吸收刺激。如果一套計劃次次都令人驚下一堂，佢可能夠激烈，但未必聰明。喺長工時、短睡眠常見嘅城市，合理訓練必須計埋入健身室之前已經發生嘅壓力。" },
      ],
    },
    {
      heading: { en: "The case for enjoyable movement", "zh-hk": "為好玩嘅運動講句公道話" },
      paragraphs: [
        { en: "Play has been treated as the childish cousin of serious training, even though it solves one of fitness culture’s hardest problems: people come back. A doubles game creates an appointment with friends. A climbing route turns effort into a puzzle. A dance class gives repetition a soundtrack. None of this makes the movement less real. It simply gives effort another meaning besides self-correction.", "zh-hk": "玩樂成日被當成認真訓練嘅幼稚親戚，但佢其實解決咗健身文化最難嘅問題：令人願意再返嚟。雙打係同朋友嘅約會，攀石線將用力變成解謎，舞蹈課用音樂包住重複。呢啲都唔會令運動變得唔真實，只係令努力唔再淨係等於修正自己。" },
        { en: "Enjoyment does not mean every minute must be easy. Learning a skill can be frustrating; a final set can be uncomfortable; progress often asks for patience. The difference is consent. Chosen difficulty feels different from punishment imposed by shame. A good coach can challenge someone while leaving their dignity intact. A good class makes room for the new person, the tired person and the person whose goal is simply to feel more at home in their body.", "zh-hk": "享受唔代表每分鐘都要輕鬆。學技巧會挫敗，最後一組會唔舒服，進步亦需要耐性。分別在於自願。自己選擇嘅困難，同由羞恥推動嘅懲罰，感受完全唔同。好教練可以挑戰一個人，同時保留佢嘅尊嚴；好課堂會容納新手、攰嘅人，同只想同自己身體熟絡啲嘅人。" },
      ],
    },
    {
      heading: { en: "Measure what the session returns", "zh-hk": "量度一堂帶返畀你嘅嘢" },
      paragraphs: [
        { en: "Instead of asking only what a workout took—time, sweat, calories—ask what it returned. Did you leave clearer, steadier or pleasantly tired? Did your back feel better after sitting all day? Did you learn a movement, speak to another person or sleep more easily? These outcomes are not excuses for avoiding progress. They are evidence that exercise is connected to the rest of life rather than sealed inside a performance laboratory.", "zh-hk": "唔好只問一堂攞走咗幾多時間、汗水同卡路里，亦要問佢帶返咩畀你。離開時係咪更清醒、更穩定、舒服地攰？坐足一日之後條腰有冇好啲？有冇學到動作、同人講過嘢、夜晚更易瞓？呢啲唔係逃避進步嘅藉口，而係證明運動同生活其他部分有連繫。" },
        { en: "Hong Kong does not need to abandon ambitious training. It needs a wider menu of ambition. Strength can mean lifting more, but it can also mean returning after illness, taking the stairs without pain or keeping enough energy for family after work. The best movement culture would celebrate performance without making it compulsory. It would let exercise be training, recreation, care or company—and sometimes all four at once.", "zh-hk": "香港唔需要放棄有野心嘅訓練，只需要將野心嘅餐牌擴闊。力量可以係舉得更重，亦可以係病後重新開始、上樓梯唔痛，或者放工後仲有精神陪屋企人。最好嘅運動文化會欣賞表現，但唔會將表現變成必須；運動可以係訓練、娛樂、照顧、陪伴，有時四樣同時都係。" },
      ],
    },
  ],
  "cold-plunges-are-not-a-personality": [
    {
      heading: { en: "What the experience actually offers", "zh-hk": "個體驗實際提供咩" },
      paragraphs: [
        { en: "Strip away the slogans and a cold plunge is a short, intense encounter with temperature. The first seconds narrow attention immediately. Conversation stops, breathing becomes deliberate and the ordinary noise of the day disappears. That sharp sensory reset is a large part of the appeal. In a city that rarely becomes quiet, being forced into the present can feel luxurious—even when the thing forcing you is a tub of very cold water.", "zh-hk": "拆走所有口號，冰浴其實係一段短而強烈嘅低溫接觸。頭幾秒注意力即刻收窄，對話停低，呼吸變得刻意，日常雜音暫時消失。呢種感官重設正係吸引之處。喺好少真正安靜嘅城市，被迫返到當下可以好奢侈，就算迫你嘅只係一缸凍水。" },
        { en: "The setting matters. Clear guidance, clean facilities, privacy options and staff who do not confuse recklessness with courage change the whole experience. So does what happens around the plunge: a calm place to warm up, a sauna used sensibly, or a conversation that makes the visit social rather than performative. The best spaces make the ritual feel supported. The weakest simply provide a photogenic container and leave bravado to run the room.", "zh-hk": "場地設計好重要。清楚指導、乾淨設施、私人選擇，同唔會將魯莽當勇敢嘅職員，可以完全改變體驗。冰浴前後亦一樣重要：舒服回暖嘅位置、合理使用嘅桑拿，或者令人放鬆而唔係表演嘅對話。最好嘅空間會支援儀式，最弱嘅只提供一個上鏡容器，再由逞強控制全場。" },
      ],
    },
    {
      heading: { en: "Evidence, expectation and honesty", "zh-hk": "證據、期望同誠實" },
      paragraphs: [
        { en: "Cold exposure is often discussed as if every possible benefit has already been settled. It has not. Research depends on temperature, duration, timing, the person involved and the outcome being measured. A brief plunge after exercise is not identical to winter swimming; feeling alert is not the same claim as improving long-term health. None of that means the practice is worthless. It means venues and users should resist turning an interesting tool into a universal answer.", "zh-hk": "冷暴露成日被講到好似所有好處都已經證實，其實唔係。研究結果會受溫度、時間、時機、參與者同量度目標影響。運動後短暫浸水唔等於冬泳，覺得醒神亦唔等於改善長期健康。呢啲唔代表冰浴冇價值，只係場地同用家都唔應該將一件有趣工具變成萬能答案。" },
        { en: "Expectations also shape reviews. Someone arriving for a miracle will probably be disappointed; someone seeking a vivid pause may get exactly what they wanted. Our standard is therefore practical. Was the process explained? Could a first-timer opt out without embarrassment? Were hygiene and supervision treated seriously? Did the venue sell an experience honestly, without implying that discomfort proves moral superiority? Those questions tell us more than the lowest number on the temperature display.", "zh-hk": "期望亦會影響評價。為奇蹟而來嘅人多數會失望，只想要一段鮮明停頓嘅人可能正好得到想要嘅嘢。所以我哋嘅標準好實際：流程有冇講清楚？新手可唔可以唔尷尬地退出？衛生同看顧係咪認真？場地有冇誠實賣體驗，而唔係暗示捱得辛苦代表人格更高尚？呢啲問題比溫度顯示最低幾多更重要。" },
      ],
    },
    {
      heading: { en: "Our verdict on the Hong Kong moment", "zh-hk": "我哋點睇香港呢一刻" },
      paragraphs: [
        { en: "Hong Kong’s cold-plunge scene is most convincing when it behaves like hospitality rather than a test. Small social clubs, guided contrast sessions and recovery rooms inside gyms each offer a different reason to visit. That variety is healthy. Not everyone wants communal tubs; not everyone wants silence; not everyone needs a monthly membership. A mature market should let people choose the atmosphere as carefully as the temperature.", "zh-hk": "香港冰浴最有說服力嘅時候，係佢表現得似款待，而唔係測驗。小型社群會所、有人指導嘅冷熱交替、健身室內恢復房，各自提供唔同到訪理由。呢種多樣性係好事：唔係人人想共享浴池，唔係人人想全程安靜，亦唔係人人需要月費會籍。成熟市場應該容許人同選溫度一樣仔細咁選氣氛。" },
        { en: "Verdict: worth trying if you are curious, provided you choose a responsible venue and treat your own response as data rather than destiny. Skip the competitive timing, the heroic captions and the idea that enduring more automatically means gaining more. The plunge can be bracing, social and memorable. It becomes less interesting the moment it asks to become your personality.", "zh-hk": "結論：如果你好奇，值得喺負責任場地一試；將自己反應當資料，而唔係命運。跳過鬥時間、英雄式帖文，同捱得更多就必然得到更多嘅想法。冰浴可以醒神、社交、令人記得，但當佢要求成為你整個人設，就即刻冇咁有趣。" },
      ],
    },
  ],
  "healthy-food-should-still-taste-like-hong-kong": [
    {
      heading: { en: "The imported template", "zh-hk": "入口嘅健康餐模板" },
      paragraphs: [
        { en: "A global wellness menu now travels almost unchanged: grain bowl, avocado, protein add-on, cold-pressed drink. These foods can be delicious, and Hong Kong should have them. The problem begins when a narrow international aesthetic presents itself as the only visible form of eating well. It turns health into a lifestyle code—often expensive, English-first and detached from how most people actually eat with family, colleagues and friends.", "zh-hk": "一張全球健康餐牌幾乎原封不動周圍旅行：穀物碗、牛油果、加蛋白質、冷壓果汁。呢啲可以好食，香港亦應該有。問題係當一套狹窄國際美學扮成食得好嘅唯一樣貌，就將健康變成昂貴、英文優先，而且同大部分人同家人朋友食飯方式脫節嘅生活密碼。" },
        { en: "Local food culture is not automatically healthy, but neither is it an obstacle waiting to be replaced. It contains generations of practical knowledge about stretching ingredients, using vegetables, sharing dishes and changing food with the seasons. The useful conversation is not tradition versus progress. It is which parts of that knowledge still serve us, which parts need adjustment, and what new ideas can join without flattening everything into the same lunch bowl.", "zh-hk": "本地飲食唔係自動健康，但亦唔係等住被取代嘅障礙。入面有幾代人關於善用食材、煮菜、共享餸菜同跟時令轉變嘅實際智慧。有用嘅討論唔係傳統對進步，而係邊啲知識仍然幫到我哋、邊啲要調整，新想法又可以點加入而唔將所有嘢壓成同一碗午餐。" },
      ],
    },
    {
      heading: { en: "Health has to survive the table", "zh-hk": "健康要過得到飯桌呢一關" },
      paragraphs: [
        { en: "Food is more than a list of nutrients. It is hospitality, memory, convenience and the choreography of a table. Advice that works only when one person controls every ingredient will collapse at dim sum, a family dinner or a colleague’s birthday. A realistic healthy food culture should help people navigate those moments without making them either anxious or antisocial. Sometimes balance is achieved across a week, not inside one perfectly composed plate.", "zh-hk": "食物唔只係營養清單，亦係款待、記憶、方便同一張飯桌嘅節奏。只喺一個人控制晒所有材料時先行得通嘅建議，去到飲茶、家庭晚飯、同事生日就會散。一套實際健康文化應該幫人自在處理呢啲時刻，而唔係變得焦慮或離群。有時平衡係一星期做到，唔係每碟都完美。" },
        { en: "Restaurants play an important role because they make better choices easy without turning dinner into homework. More vegetable-led dishes, sensible portions, transparent ingredients and genuinely satisfying lower-meat options can shift habits quietly. The strongest venues do this through flavour first. They understand that nobody owes a restaurant repeat business because its intentions are virtuous. The food must still be worth leaving home for.", "zh-hk": "餐廳可以令更好選擇變得容易，又唔使將晚餐變成功課。更多以菜做主角嘅餸、合理份量、透明材料，同真正滿足嘅少肉選擇，都可以安靜地改變習慣。最好嘅場地永遠味道行先；冇人因為餐廳動機高尚就欠佢回頭生意，食物仍然要值得人出門。" },
      ],
    },
    {
      heading: { en: "What a Hong Kong wellness menu could be", "zh-hk": "香港健康餐牌可以係點" },
      paragraphs: [
        { en: "The opportunity is not to make every cha chaan teng a clinic. It is to widen the range of good everyday food: broths with depth but less heaviness, vegetable dishes treated as complete ideas, tofu cooked with confidence, rice portions people can choose, tea without automatic sweetness, and modern cafés that borrow local flavours with care rather than using them as decoration. Health can be present without becoming the loudest word on the menu.", "zh-hk": "機會唔係將每間茶餐廳變診所，而係擴闊好日常食物：有深度但冇咁重嘅湯、當完整菜式設計嘅蔬菜、有信心煮嘅豆腐、可選飯量、唔自動加甜嘅茶，以及認真借用本地味道而唔只當裝飾嘅新式餐廳。健康可以存在，而唔使成為餐牌最大隻字。" },
        { en: "A directory should reflect that breadth. It should include plant-forward newcomers and long-standing local specialists, quick weekday lunches and places for a shared Sunday meal. The test is not whether a venue performs the approved visual language of wellness. It is whether it helps people eat with more variety, pleasure and attention—and whether it contributes something recognisably of this city.", "zh-hk": "目錄亦應該反映呢種闊度：有植物為本新店，亦有做咗多年嘅本地專門店；有平日快午餐，亦有星期日一齊食飯嘅地方。標準唔係場地有冇表演一套認可健康美學，而係佢有冇令人食得更多元、開心、留心，同有冇為呢個城市留低一啲認得出嘅味道。" },
      ],
    },
  ],
  "public-sports-centres-are-wellness-infrastructure": [
    {
      heading: { en: "Access is the first intervention", "zh-hk": "可達性先係第一個介入" },
      paragraphs: [
        { en: "Public conversations about health often begin with individual responsibility: move more, sit less, manage stress. But every instruction rests on physical conditions. Is there somewhere nearby to move? Is it affordable? Can a beginner understand the booking system? Does the timetable fit someone who works shifts or cares for children? Infrastructure answers these questions before motivation gets a chance. A city cannot lecture people into facilities that do not exist or feel impossible to use.", "zh-hk": "公共健康討論成日由個人責任開始：郁多啲、坐少啲、管理壓力。但每個指示都依賴實際條件：附近有冇地方運動？負擔得到嗎？新手睇唔睇得明預約？輪班或照顧小朋友嘅人啱唔啱時間？基建喺動力出場之前已經回答咗呢啲問題。城市唔可以靠訓話令人使用不存在或難到似冇嘅設施。" },
        { en: "Hong Kong’s network of sports centres, pools, courts, parks and waterfronts is therefore part of its health system, even when it is administered outside a hospital. A badminton booking can support social connection; a warm public pool can help an older resident remain active; an air-conditioned fitness room can make summer movement possible. The benefits arrive quietly and are easy to underestimate precisely because the buildings are ordinary.", "zh-hk": "所以香港體育館、泳池、球場、公園同海濱網絡，本身就係健康系統一部分，即使唔由醫院管理。羽毛球預約可以支援社交，暖水公共泳池可以令長者保持活動，冷氣健身室令盛夏運動變得可能。好處安靜地出現，正因建築普通而容易被低估。" },
      ],
    },
    {
      heading: { en: "The booking experience is part of the facility", "zh-hk": "預約體驗都係設施一部分" },
      paragraphs: [
        { en: "A court is not truly accessible if discovering and reserving it requires expert knowledge. Digital systems should show availability clearly, explain eligibility in plain language and work well on the phones people already use. On-site information matters too: visible signs, equipment rules, changing-room details and a clear answer about what first-timers should bring. These are not cosmetic extras. They determine who feels that the building belongs to them.", "zh-hk": "如果搵同訂一個球場需要內行知識，個場就未算真正可達。數碼系統應該清楚顯示空檔、用簡單語言解釋資格，並喺大家本身用緊嘅手機運作。現場資訊亦重要：易見指示、器材規則、更衣室資料、新手要帶咩嘅清楚答案。呢啲唔係外觀小事，而係決定邊個覺得棟樓屬於自己。" },
        { en: "Fair access also means watching how scarce slots are distributed. Automated booking, resale and habitual block reservations can turn nominally public space into a private advantage for experienced users. Better data could reveal where demand persistently exceeds supply and which districts need different facilities. Transparency would let residents understand the constraint instead of assuming every unsuccessful booking is simply bad luck.", "zh-hk": "公平亦要留意稀有時段點分配。自動搶位、轉售同慣性包時段，可以將名義上公共嘅空間變成熟手私人優勢。更好數據可以顯示邊度長期供不應求、邊區需要其他設施。透明度令市民明白限制，而唔係將每次失敗都當成自己唔好彩。" },
      ],
    },
    {
      heading: { en: "Invest in dignity, not imitation", "zh-hk": "投資尊嚴，而唔係模仿會所" },
      paragraphs: [
        { en: "Public centres do not need scented towels or a luxury-club aesthetic. They need equipment that works, ventilation that feels safe, showers people can use, staff with time to answer questions and maintenance problems fixed before they become accepted facts. Design should communicate care without increasing the price of entry. Cleanliness and clarity are not luxury signals; they are forms of public respect.", "zh-hk": "公共體育館唔需要香味毛巾或豪華會所美學。佢哋需要運作正常嘅器材、安全通風、真正可用嘅淋浴、有時間答問題嘅職員，以及喺維修問題變成常態之前處理好。設計應該表達照顧，而唔係提高入場價。乾淨同清楚唔係奢華訊號，而係公共尊重。" },
        { en: "The most ambitious wellness policy may look unremarkable in a photograph: more evening slots, a repaired lift, shaded seating for carers, beginner sessions, a simple bilingual guide. Yet these changes widen participation in ways a flagship venue cannot. Boutique studios can innovate and inspire, but public facilities establish the floor beneath the whole city. When that floor is strong, wellbeing stops being a consumer identity and becomes something closer to a civic right.", "zh-hk": "最有野心嘅健康政策影相可能好普通：更多夜晚時段、整好升降機、照顧者有遮蔭座位、新手場、簡單雙語指南。但呢啲改變擴闊參與嘅能力，旗艦場館未必做到。精品教室可以創新同啟發，公共設施就托住全城底線。當底線夠穩，健康生活就唔再只係消費身份，而更接近城市權利。" },
      ],
    },
  ],
  "rest-is-not-a-reward-for-productivity": [
    {
      heading: { en: "The optimisation trap", "zh-hk": "優化陷阱" },
      paragraphs: [
        { en: "The promise of optimisation is seductive because it makes exhaustion look solvable through better administration. Track sleep, engineer a morning, schedule recovery, purchase the correct supplement. Some of these tools help. The trap is that the person never leaves work mode; they merely become the manager of a second company called themselves. Every quiet moment is evaluated for return on investment.", "zh-hk": "優化好吸引，因為佢令疲倦睇落可以靠更好管理解決：追蹤睡眠、設計早晨、安排恢復、買啱補充品。有啲工具確實有幫助，陷阱係人從未離開工作模式，只係成為第二間叫「自己」嘅公司經理。每個安靜時刻都要計回報。" },
        { en: "This mindset is especially easy to absorb in Hong Kong, where time is expensive and speed is treated as competence. Even leisure becomes efficient: the quickest workout, the most restorative treatment, the perfect short holiday. But the nervous system does not always respond to being hurried toward calm. Rest can require an interval in which nothing improves and no one is impressed.", "zh-hk": "喺時間昂貴、速度被當成能力嘅香港，呢種心態特別容易吸收。連休閒都要高效：最快運動、最恢復療程、最完美短旅行。但神經系統未必會回應被催促去平靜。休息有時需要一段冇任何改善、亦冇人會欣賞嘅空白。" },
      ],
    },
    {
      heading: { en: "Rest is not the same as consumption", "zh-hk": "休息唔等於消費" },
      paragraphs: [
        { en: "Wellness businesses can create beautiful, useful places to recover. The problem is not paying for care; it is believing that stopping only counts when it arrives as a service. A sauna session may help, but so might sitting by the harbour without recording it. A massage can be restorative, but so can declining one invitation. If every pause requires a transaction, people without spare money are told—incorrectly—that rest is not for them.", "zh-hk": "健康場地可以創造漂亮又有用嘅恢復空間。問題唔係畀錢照顧自己，而係相信只有變成服務嘅停頓先算數。桑拿可能有幫助，唔影相咁坐喺海旁亦可能；按摩可以恢復，拒絕一個邀請亦可以。如果每次停低都要交易，冇餘錢嘅人就會被錯誤告知休息唔屬於佢哋。" },
        { en: "Nor is scrolling always rest simply because the body is still. Digital distraction can be pleasurable, but it frequently keeps attention in a state of low-level reaction. The question is not whether an activity looks lazy. It is whether some part of you is allowed to stop responding. That may happen while cooking, walking, stretching, reading fiction or talking to someone who does not need anything from you.", "zh-hk": "身體冇郁亦唔代表碌手機一定係休息。數碼分心可以開心，但注意力好多時仍然保持低度反應。問題唔係活動睇落懶唔懶，而係你有冇一部分可以停止回應。煮飯、散步、伸展、睇小說，或者同一個唔需要你做任何嘢嘅人傾偈，都可能做到。" },
      ],
    },
    {
      heading: { en: "Protect the unproductive interval", "zh-hk": "保護冇產出嘅時間" },
      paragraphs: [
        { en: "Unmeasured time will not appear by accident. Dense schedules absorb it. It may need a boundary: one evening with no improvement plan, ten minutes after lunch without a screen, a Sunday morning before anyone asks what the day is for. The boundary should be small enough to keep and ordinary enough that breaking it feels unnecessary. Rest does not need another heroic routine.", "zh-hk": "冇量度嘅時間唔會自己出現，密集日程會食晒佢。可能要劃一條界線：一晚冇提升計劃、午飯後十分鐘冇螢幕、星期日朝早喺任何人問今日有咩用途之前嘅空間。界線要細到守得到，普通到冇必要打破。休息唔需要另一套英雄式習慣。" },
        { en: "The deeper shift is moral rather than logistical. A person deserves rest before completing everything, because everything is never complete. There will always be another message, target or version of the self to improve. Stopping anyway is not surrender. It is recognition that a life cannot be valued only through what it produces. Sometimes the healthiest sentence available is also the simplest: enough for today.", "zh-hk": "更深嘅改變唔係時間管理，而係價值判斷。人喺完成所有事情之前已經值得休息，因為事情永遠做唔完。永遠仲有下一個訊息、目標、可以改善嘅自己。照樣停低唔係投降，而係承認人生唔可以只按產出估值。有時最健康嘅一句亦最簡單：今日夠喇。" },
      ],
    },
  ],
};

export const editorialFieldNotes: Record<string, LongformSection[]> = {
  "convenience-is-the-real-wellness-luxury": [
    {
      heading: { en: "The seven-day test", "zh-hk": "七日實測" },
      paragraphs: [
        { en: "Before buying a long membership, test a venue against one real week. Visit after the meeting that usually runs late. Try the route in rain. Notice whether you can carry the necessary kit, find a sensible meal nearby and still arrive home at a humane hour. Ask what happens when a class is full or you need to cancel. A glossy tour shows the venue at its best; a weekday test shows whether it can belong to your life. The answer may be a less spectacular place five minutes away, and that is useful information rather than a compromise.", "zh-hk": "買長會籍之前，先用一個真實星期測試場地。喺最常超時嘅會議後去一次，落雨行一次，睇吓器材帶唔帶得動、附近有冇合理一餐，同返到屋企係咪仲算正常時間。問清楚滿班同取消安排。參觀只見到場地最好一面，平日實測先知佢入唔入到你生活。答案可能係五分鐘外冇咁華麗嘅地方；呢個唔係妥協，而係有用資料。" },
        { en: "Then remove one obstacle rather than reinventing your personality. Keep a spare shirt at work. Save two nearby options instead of one. Choose a recurring slot that is merely good, not theoretically perfect. Pair the visit with something already fixed, such as school pickup, a commute or grocery shopping. These adjustments are almost embarrassingly ordinary. That is their strength. Sustainable wellbeing is usually assembled from small pieces of cooperation between a person and their environment, not summoned by an extraordinary act of will.", "zh-hk": "之後唔使重新塑造人格，只要移走一個障礙：公司放多件衫、收藏兩個附近選擇而唔係一個、揀一個夠好而非理論上完美嘅固定時段，再同接放學、通勤或買餸綁埋。呢啲調整普通到有少少唔上鏡，亦正因如此先有力。可持續健康通常係人同環境用好多細小合作砌出嚟，而唔係靠一次非凡意志召喚。" },
      ],
    },
  ],
  "hong-kong-does-not-need-more-punishing-workouts": [
    {
      heading: { en: "How to recognise a healthier training culture", "zh-hk": "點樣認出更健康嘅訓練文化" },
      paragraphs: [
        { en: "Look at what happens when somebody modifies an exercise. Is the alternative presented as intelligent coaching or as the lesser option for people who cannot cope? Notice whether instructors ask about injury and experience before the music starts, and whether their language describes technique rather than bodies. A serious training environment does not have to be solemn, but it should make safety normal. It should be possible to work hard without being shouted into ignoring pain, and possible to stop without turning the moment into a public confession.", "zh-hk": "留意有人改動動作時發生咩事：替代方案係被當成聰明指導，定係畀應付唔到嘅人嘅次等選擇？導師會唔會喺音樂開始前問傷患同經驗？語言係講技巧定評論身形？認真訓練唔一定嚴肅，但應該令安全變成正常。你可以努力而唔使被叫到忽略痛楚，亦可以停低而唔使將一刻變成公開認錯。" },
        { en: "For your own routine, keep more than one intensity available. Hard sessions have a place, but so do technique days, easy aerobic work, mobility, games and complete rest. The mixture can change with workload, weather, sleep and age without becoming evidence of decline. Progress is not a straight line drawn through maximum effort. It is the growing ability to choose the right demand for the day and still remain interested in moving next month, next year and later in life.", "zh-hk": "自己嘅習慣亦要保留多過一種強度。辛苦堂有位置，技巧日、輕鬆帶氧、活動度、遊戲同完整休息亦有。組合可以按工作量、天氣、睡眠同年齡改變，而唔代表退步。進步唔係用最大努力畫一條直線，而係愈來愈懂得揀今日啱嘅要求，並且下個月、下年、再老啲仍然對郁動有興趣。" },
      ],
    },
  ],
  "cold-plunges-are-not-a-personality": [
    {
      heading: { en: "A sensible first visit", "zh-hk": "第一次點樣試得合理" },
      paragraphs: [
        { en: "Choose a venue that explains contraindications and asks relevant health questions rather than handing you a timer and a motivational slogan. Tell staff it is your first visit. Learn how to enter and exit safely, keep the first exposure conservative and resist copying the longest session in the room. Cold water can provoke a strong breathing and cardiovascular response; anyone with a health condition, pregnancy or uncertainty should seek appropriate professional guidance before participating. No directory, influencer or friend can assess that risk for you.", "zh-hk": "揀一間會解釋禁忌、問相關健康問題嘅場地，而唔係只畀計時器同勵志口號。話畀職員知係第一次，學清楚安全出入，首次保守啲，唔好抄全場最長時間。冷水會引起強烈呼吸同心血管反應；有健康狀況、懷孕或唔確定嘅人，參與前應尋求合適專業意見。目錄、網紅同朋友都唔可以代你評估風險。" },
        { en: "Afterwards, review the ordinary facts. Did you feel listened to? Was the water and surrounding area visibly maintained? Was warming up gradual and unhurried? Did the staff encourage agency, or did the whole experience depend on social pressure? A memorable rush can make any first visit feel successful. The better judgment comes later, when you decide whether the setting, cost and effect are useful enough to repeat. Recovery earns its place through how it supports the rest of your week, not through how dramatic it looks for ninety seconds.", "zh-hk": "之後回顧普通事實：有人聽你講嗎？水同周邊明顯有保養嗎？回暖係咪循序漸進、冇催促？職員鼓勵自主，定成個體驗靠社交壓力？強烈刺激可以令任何第一次都似成功，但更好判斷要遲啲先做到：環境、價錢同效果係咪值得重複。恢復活動要靠佢點支援成個星期去證明位置，唔係靠九十秒有幾戲劇性。" },
      ],
    },
  ],
  "healthy-food-should-still-taste-like-hong-kong": [
    {
      heading: { en: "Read the whole restaurant, not one label", "zh-hk": "睇成間餐廳，唔好只睇一個標籤" },
      paragraphs: [
        { en: "Words such as organic, plant-based and high-protein can be useful, but they do not finish the evaluation. Look at variety across the menu, how vegetables are prepared, whether portions can flex, how clearly allergens are handled and whether the meal is satisfying enough to prevent an expensive second lunch. Price matters because an everyday option that only works occasionally is not everyday. So do opening hours, takeaway packaging and whether a group with different preferences can share the same table without turning one person into a problem.", "zh-hk": "有機、植物為本、高蛋白等字眼有用，但唔係評估終點。睇成張餐牌有幾多變化、蔬菜點煮、份量可唔可以調整、致敏原清唔清楚，同食完會唔會飽到唔使再買第二個昂貴午餐。價錢重要，因為只可偶爾負擔嘅日常選擇並唔日常。營業時間、外賣包裝，同口味唔同嘅一班人可唔可以同枱而唔使其中一個變成麻煩，亦一樣重要。" },
        { en: "We should also leave room for pleasure without cross-examination. A celebratory meal does not need to defend itself as fuel, and a familiar snack can carry value that a nutrient table cannot describe. The aim is not to police every bite until local food loses its joy. It is to make nourishing choices abundant, delicious and easy enough that they become ordinary. When restaurants achieve that while sounding, smelling and tasting like the neighbourhood around them, healthy dining becomes culture rather than a corrective programme imposed on it.", "zh-hk": "我哋亦要容許快樂唔接受盤問。慶祝一餐唔使證明自己係燃料，熟悉小食亦有營養表講唔到嘅價值。目標唔係監管每一啖，直到本地食物失去樂趣，而係令滋養選擇夠多、好味、方便到變日常。當餐廳做到呢點，同時仍然有周邊社區嘅聲音、氣味同味道，健康飲食就成為文化，而唔係加諸文化嘅矯正計劃。" },
      ],
    },
  ],
  "public-sports-centres-are-wellness-infrastructure": [
    {
      heading: { en: "A directory can make public space more public", "zh-hk": "目錄可以令公共空間更公共" },
      paragraphs: [
        { en: "Listing a public facility should mean more than copying its address. People need to know which sports are actually available, whether equipment is supplied, how booking works, what accessibility features exist, when maintenance closes a room and which phone number reaches a person who can answer. Information decays quickly, so every entry should link back to the responsible authority and state when it was checked. The directory becomes a bridge, not a substitute for the official source.", "zh-hk": "列出公共設施唔應該只抄地址。大家要知道實際有咩運動、有冇器材、點預約、有咩無障礙設施、維修幾時關房，同邊個電話搵到答問題嘅人。資料變得好快，所以每項都應連返負責部門並寫明查閱日期。目錄係橋樑，唔係取代官方來源。" },
        { en: "Visibility matters because prestige shapes behaviour. When public courts and pools appear beside boutique studios in the same wellness guide, they are recognised as part of the same project: helping people live well. That does not erase differences in service or atmosphere. It corrects a cultural blind spot that equates wellness with premium consumption. The city’s most important venue may be the one that offers thousands of residents an unremarkable, affordable hour of movement close to home.", "zh-hk": "能見度重要，因為聲望會塑造行為。當公共球場同泳池喺同一本健康指南同精品教室並列，佢哋就被承認為同一件事一部分：幫人生活得好。呢個唔會抹走服務同氣氛差異，而係修正將健康等同高端消費嘅盲點。城市最重要嘅場地，可能只係畀幾千居民喺屋企附近有一個普通、負擔得到嘅運動鐘。" },
      ],
    },
  ],
  "rest-is-not-a-reward-for-productivity": [
    {
      heading: { en: "Practise stopping before the collapse", "zh-hk": "喺崩潰之前練習停低" },
      paragraphs: [
        { en: "Many people recognise rest only when the body makes work impossible: illness, tears, insomnia, a concentration span that has finally disappeared. Waiting for collapse turns recovery into emergency maintenance. A gentler practice is to notice earlier signals without putting them on trial. Irritability, heaviness, repeated mistakes and the wish to avoid everyone may not require a dramatic diagnosis. They may simply be information that the current pace is costing more than it returns.", "zh-hk": "好多人只喺身體令工作變得不可能時先承認要休息：生病、喊、失眠、集中力終於消失。等到崩潰先停，會將恢復變成緊急維修。更溫和做法係早啲留意訊號，而唔使審判佢哋。暴躁、沉重、重複犯錯、想避開所有人，未必需要戲劇性診斷；可能只係資料，話你知而家速度付出多過回報。" },
        { en: "Stopping earlier can look modest: eating before one more call, taking the slower route home, cancelling a nonessential plan, or going to bed without clearing every notification. These choices rarely produce the instant glow promised by wellness advertising. They do something quieter. They prevent depletion from becoming the only condition in which care is permitted. Over time, that changes rest from a rescue operation into a normal rhythm—one that belongs inside life rather than waiting at the end of achievement.", "zh-hk": "早啲停可以好細：再開一個電話會議前先食嘢、慢慢返屋企、取消非必要安排，或者未清晒通知都去瞓。呢啲選擇好少會帶來健康廣告承諾嘅即時光芒，但會安靜地避免耗盡成為唯一獲准被照顧嘅狀態。久而久之，休息由救援行動變成正常節奏，放喺生活入面，而唔係等成就完結先出現。" },
      ],
    },
  ],
};
