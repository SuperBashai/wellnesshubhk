import type { LocalText } from "./data";

type Sections = Array<{ heading?: LocalText; paragraphs: LocalText[] }>;

export const readableEditorials: Record<string, Sections> = {
  "convenience-is-the-real-wellness-luxury": [
    {
      paragraphs: [
        { en: "Wellness is often sold as an escape: a weekend retreat, a total reset, or a perfect routine. Real life in Hong Kong usually looks different. We have work, family, crowded trains and days when even one extra stop feels like too much.", "zh-hk": "健康生活成日被包裝成逃離日常：週末靜修、全面重整，或者一套完美習慣。但香港嘅真實生活通常唔係咁。我哋有工作、家庭、迫爆嘅港鐵，亦有連多行一個站都嫌遠嘅日子。" },
        { en: "That is why the place near home often beats the famous place across town. A pool by your MTR station, a yoga class near the office or a good lunch downstairs may not look exciting online. But you can actually return to it, and that matters more.", "zh-hk": "所以屋企附近嘅地方，往往比要跨區先去到嘅名店更實用。港鐵站旁邊嘅泳池、公司附近嘅瑜伽班，或者樓下一餐好食嘅午飯，放上網未必最搶眼，但你真係可以再去。呢樣先最重要。" },
      ],
    },
    {
      heading: { en: "Make the easy choice useful", "zh-hk": "令最容易嘅選擇變得有用" },
      paragraphs: [
        { en: "A habit is easier to keep when it asks less from you. If every visit needs two train changes, special clothes and a free evening, it will probably stay an occasional treat. That is fine. It just should not be the only plan you have.", "zh-hk": "一個習慣要求得越少，就越容易維持。如果每次都要轉兩次車、帶特別裝備，再留起成晚時間，佢多數只會係間中一次嘅享受。咁冇問題，只係唔應該成為你唯一嘅計劃。" },
        { en: "Try choosing one place for movement, one place for food and one place for rest within your normal route. You do not need to visit all three every week. The point is to remove the effort of deciding from scratch each time.", "zh-hk": "可以試吓喺日常路線入面，各揀一個運動、食飯同休息嘅地方。唔需要每星期全部去晒，重點係唔使每次都由零開始諗。" },
      ],
    },
    {
      heading: { en: "Close is not the same as boring", "zh-hk": "就近唔等於沉悶" },
      paragraphs: [
        { en: "Going local can also help you know your neighbourhood better. You notice which class feels friendly, when the court is quiet and where to eat without making it a project. These small bits of knowledge make a city feel easier to live in.", "zh-hk": "留喺附近亦可以令你更熟悉自己個區。你會知道邊堂氣氛友善、球場幾時較靜，同邊度可以唔使做功課都食到一餐好嘢。呢啲小資料，會令城市更易生活。" },
        { en: "The best routine is not the one that sounds impressive. It is the one that still works on a wet Tuesday when you are tired. Convenience is not cheating. It is how a good idea becomes part of an ordinary week.", "zh-hk": "最好嘅習慣唔係講出嚟最厲害嗰個，而係落雨星期二、你已經好攰時仍然做得到嗰個。方便唔係偷懶，而係令一個好想法真正進入日常。" },
      ],
    },
  ],
  "hong-kong-does-not-need-more-punishing-workouts": [
    {
      paragraphs: [
        { en: "Hong Kong already gives us plenty of pressure. Exercise does not have to become another test that we can fail. A workout can be useful without leaving us exhausted, sore and worried that we did not try hard enough.", "zh-hk": "香港已經有好多壓力，運動唔需要再變成另一場會肥佬嘅考試。一堂運動可以有用，而唔需要令人攰到散、周身痛，仲擔心自己唔夠努力。" },
        { en: "Some days you may want a hard session. Other days, ten slow laps, a game with friends or a gentle class is enough. All of these count. Your body is not a machine that needs the same setting every day.", "zh-hk": "有啲日子你可能想練得辛苦啲；有啲日子慢慢游十個塘、同朋友打一場波，或者上一堂輕鬆課已經夠。全部都算。身體唔係每日都要用同一個設定嘅機器。" },
      ],
    },
    {
      heading: { en: "Choose something you want to repeat", "zh-hk": "揀一樣你想再做嘅運動" },
      paragraphs: [
        { en: "The most useful question after a session is simple: would I like to come back? Enjoyment is not a bonus. It is one of the main reasons people keep moving after the first burst of motivation is gone.", "zh-hk": "一堂之後最有用嘅問題其實好簡單：我想唔想再返嚟？享受唔係額外獎品，而係最初嗰陣衝勁過咗之後，人仍然會繼續郁動嘅主要原因。" },
        { en: "A friendly coach, a game you are still learning or a class at the right time may matter more than the most advanced programme. The plan has to fit your life before it can improve your life.", "zh-hk": "一個友善教練、一項你仲學緊嘅運動，或者時間啱啱好嘅課堂，可能比最先進嘅訓練計劃更重要。計劃要先配合生活，先有機會改善生活。" },
      ],
    },
    {
      heading: { en: "Leave with something left", "zh-hk": "做完都留返少少力" },
      paragraphs: [
        { en: "You do not have to empty the tank every time. Finishing with some energy left can help you sleep, work and show up again. Progress often comes from many steady sessions, not one heroic afternoon.", "zh-hk": "唔需要每次都用盡所有力。做完仲有少少精神，可以幫你瞓得好、做得到嘢，同下次再出現。進步好多時來自好多次穩定練習，而唔係一次英雄式操練。" },
        { en: "Movement should add to life more often than it takes away. If your routine keeps making you dread the next session, change the pace, the place or the activity. That is not giving up. It is paying attention.", "zh-hk": "運動應該多數為生活加返啲嘢，而唔係不斷拎走。如果你每次都驚下一堂，不妨改速度、改地方或者改運動。呢個唔係放棄，而係留意自己需要。" },
      ],
    },
  ],
  "cold-plunges-are-not-a-personality": [
    {
      paragraphs: [
        { en: "Cold plunges now come with a lot of theatre: timers, cameras and people proving how tough they are. That can turn a short, sharp experience into a test of character. It does not need to be one.", "zh-hk": "冰浴而家成日連住一大套表演：計時器、鏡頭，同證明自己有幾硬淨嘅說話。原本短短嘅強烈體驗，變成性格測試。其實完全唔需要。" },
        { en: "You may enjoy the clear, awake feeling afterwards. You may like doing it with friends. You may also hate every second. None of these reactions tells us whether you are disciplined, brave or serious about health.", "zh-hk": "你可能鍾意之後清醒嘅感覺，可能鍾意同朋友一齊做，亦可能每一秒都討厭。任何反應都唔代表你自唔自律、勇唔勇敢，或者有幾重視健康。" },
      ],
    },
    {
      heading: { en: "Start small and stay honest", "zh-hk": "由少開始，誠實面對感受" },
      paragraphs: [
        { en: "If you are curious, ask the venue how the session works and tell staff if it is your first time. Start shorter than you think you need. Get out if you feel unwell, dizzy or unsafe. There is no prize for staying in longer.", "zh-hk": "如果你好奇，先問場地成個流程點做，亦要話畀職員知你係第一次。時間由短開始。覺得唔舒服、頭暈或者唔安全就出返嚟。浸得耐冇獎。" },
        { en: "Cold water is not right for everyone, especially when some health conditions are involved. If you are unsure, speak with a qualified health professional first. A good venue will respect caution and explain its safety process clearly.", "zh-hk": "凍水唔係人人都適合，尤其有某啲健康情況時。如果唔肯定，先問合資格醫護人員。好嘅場地會尊重你小心行事，亦會清楚講解安全流程。" },
      ],
    },
    {
      heading: { en: "Keep the useful part", "zh-hk": "留低真正有用嘅部分" },
      paragraphs: [
        { en: "The value may be the pause before you enter, the deep breathing, the alert feeling or the conversation afterwards. Notice which part actually helps you. You do not have to copy somebody else’s ritual.", "zh-hk": "真正有用嘅可能係落水前停一停、慢慢呼吸、之後醒神嘅感覺，或者完咗同人傾偈。留意邊一部分真係幫到你，唔需要照抄其他人嘅儀式。" },
        { en: "Recovery should make room for good judgment. Try it because you are interested, not because the internet has turned discomfort into a badge. Your body is allowed to have its own answer.", "zh-hk": "恢復應該留返空間畀判斷。因為你好奇而試，而唔係因為網上將辛苦變成勳章。你嘅身體可以有自己答案。" },
      ],
    },
  ],
  "healthy-food-should-still-taste-like-hong-kong": [
    {
      paragraphs: [
        { en: "Healthy food in many cities has started to look the same: grain bowls, pale rooms and long lists of imported ingredients. Hong Kong does not need to copy that look to eat well.", "zh-hk": "好多城市嘅健康餐開始變得一模一樣：穀物碗、淺色裝修，同一長串入口食材。香港唔需要照搬呢個樣先可以食得好。" },
        { en: "Local food already understands soup, rice, tea, tofu, fresh vegetables and sharing a table. These foods are not old problems that need to be replaced. They can be part of a modern, balanced way of eating.", "zh-hk": "本地飲食本身就識得湯、飯、茶、豆腐、新鮮蔬菜，同一齊分享一張枱。呢啲食物唔係要被淘汰嘅舊問題，而係現代均衡飲食可以保留嘅一部分。" },
      ],
    },
    {
      heading: { en: "Look past the label", "zh-hk": "唔好只睇標籤" },
      paragraphs: [
        { en: "A restaurant does not become healthy because it uses green packaging or puts the word ‘clean’ on the menu. Look for meals with vegetables, enough protein, sensible portions and food you will enjoy eating.", "zh-hk": "餐廳唔會因為用綠色包裝，或者餐牌寫住「clean」就自動變健康。睇吓有冇蔬菜、足夠蛋白質、合理份量，同你真係會享受嘅食物。" },
        { en: "Taste matters because we return to food we like. A meal that is technically perfect but leaves you hungry or bored will not support a routine for long. Good food should satisfy, not lecture.", "zh-hk": "味道重要，因為我哋會再食自己鍾意嘅嘢。一餐理論上完美，但食完仲餓或者好悶，唔會長久支持日常。好食物應該令人滿足，而唔係教訓人。" },
      ],
    },
    {
      heading: { en: "Make room for real life", "zh-hk": "為真實生活留位" },
      paragraphs: [
        { en: "Eating well can include a quick lunch, a family dinner, a vegetarian meal and an old favourite. One meal does not define your health. What you can afford and repeat matters more than chasing a perfect plate.", "zh-hk": "食得好可以包括快食午餐、家庭晚飯、素食，同一款食咗好多年嘅至愛。一餐唔會定義你嘅健康。負擔得到、做得到嘅選擇，比追求完美餐碟更重要。" },
        { en: "The most useful healthy restaurants make everyday choices easier. They give us tasty options, clear information and a reason to come back. They still feel like places to eat, not clinics with cutlery.", "zh-hk": "最實用嘅健康餐廳，會令日常選擇更容易：有好食選項、清楚資料，同令人想再返去嘅理由。佢哋仍然係食飯嘅地方，而唔係擺咗餐具嘅診所。" },
      ],
    },
  ],
  "public-sports-centres-are-wellness-infrastructure": [
    {
      paragraphs: [
        { en: "Some of Hong Kong’s most useful wellness spaces are easy to overlook. They are the sports centres above markets, the pools beside housing estates and the courts that cost less than lunch.", "zh-hk": "香港一啲最實用嘅健康空間，好容易被忽略。佢哋係街市樓上嘅體育館、屋邨旁邊嘅泳池，同收費平過一餐午飯嘅球場。" },
        { en: "These places matter because they make movement possible for more people. Health cannot depend only on expensive memberships, long trips or knowing the right person. A nearby public facility gives a neighbourhood room to move.", "zh-hk": "呢啲地方重要，因為佢哋令更多人可以運動。健康唔可以只靠昂貴會籍、長途交通，或者識啱嘅人。附近有公共設施，成個社區先有空間郁動。" },
      ],
    },
    {
      heading: { en: "Useful matters more than stylish", "zh-hk": "實用比有型更重要" },
      paragraphs: [
        { en: "A public sports centre does not need to look like a retreat. It needs clean changing rooms, equipment that works, fair booking and staff who can help a first-time visitor. These basics shape whether people return.", "zh-hk": "公共體育館唔需要扮度假村。佢需要乾淨更衣室、用得到嘅器材、公平預訂，同願意幫第一次到訪者嘅職員。呢啲基本嘢會決定大家返唔返去。" },
        { en: "Clear information matters too. People need to know what is available, what to bring, when facilities close and how to book. A good directory should make the first visit less confusing, then link back to the official source.", "zh-hk": "清楚資料亦好重要。大家要知道有咩設施、要帶咩、幾時關門同點預訂。好嘅目錄應該令第一次去冇咁混亂，再連返官方資料。" },
      ],
    },
    {
      heading: { en: "Give ordinary places proper credit", "zh-hk": "畀日常地方應有嘅肯定" },
      paragraphs: [
        { en: "Public courts and pools belong in the same wellness guide as private studios. The price and atmosphere may be different, but the purpose is related: helping people feel stronger, calmer and more connected.", "zh-hk": "公共球場同泳池，應該同私人教室一樣出現喺健康指南。價錢同氣氛可能唔同，但目的相近：幫人變得更有力、更平靜，同身邊人有更多連結。" },
        { en: "A simple hour of badminton near home may do more good than a service most residents cannot reach. Ordinary access is not a lesser form of wellness. It is the base that everything else stands on.", "zh-hk": "屋企附近打一個鐘羽毛球，可能比大部分居民去唔到嘅高級服務更有用。日常可達唔係次一等健康生活，而係其他選擇企得住嘅基礎。" },
      ],
    },
  ],
  "rest-is-not-a-reward-for-productivity": [
    {
      paragraphs: [
        { en: "We often treat rest as something we have to earn. Finish the work, clear the messages, complete the workout—then maybe we are allowed to stop. The trouble is that the list rarely ends.", "zh-hk": "我哋成日將休息當成要先賺返嚟嘅嘢。做完工作、清晒訊息、完成運動，先可能准自己停低。問題係張清單好少真正完。" },
        { en: "Rest is not only useful because it helps us work again. Sleep, quiet time and an afternoon with no plan are part of being human. They do not need to prove their value with better output tomorrow.", "zh-hk": "休息唔係只因為可以幫我哋之後再工作先有用。瞓覺、安靜時間，同一個冇計劃嘅下晝，本身就係做人一部分。佢哋唔需要靠聽日做多啲去證明價值。" },
      ],
    },
    {
      heading: { en: "Stop before you crash", "zh-hk": "唔好等到頂唔順先停" },
      paragraphs: [
        { en: "Many people only rest when their body gives them no choice. By then, recovery becomes emergency repair. Try noticing the earlier signs: a short temper, heavy tiredness, small mistakes and the wish to avoid everyone.", "zh-hk": "好多人要到身體冇得揀先休息。去到嗰陣，恢復已經變成緊急維修。試吓早啲留意訊號：容易發脾氣、好沉重、成日犯小錯，同想避開所有人。" },
        { en: "Stopping earlier can be very ordinary. Eat before the next call. Take the slower route home. Cancel a plan that is not important. Go to bed with a few messages unanswered. Small pauses can stop tiredness from becoming a crisis.", "zh-hk": "早啲停可以好普通。下一個電話前先食嘢、慢慢返屋企、取消唔重要嘅約，或者有幾個訊息未覆都去瞓。細小停頓可以避免疲倦變成危機。" },
      ],
    },
    {
      heading: { en: "Leave some time unmeasured", "zh-hk": "留一啲唔量度嘅時間" },
      paragraphs: [
        { en: "Not every break needs an app, a booking or a score. A quiet meal, a slow walk or sitting by the water can simply feel good. You do not need a report at the end.", "zh-hk": "唔係每次休息都需要應用程式、預約或者分數。一餐安靜嘅飯、一次慢行，或者坐喺水邊，可以只係舒服。完咗唔需要交報告。" },
        { en: "Rest becomes easier when it is part of normal life instead of a rescue plan. Give it a regular place, even when you have not finished everything. You are allowed to stop while the world is still moving.", "zh-hk": "當休息成為正常生活一部分，而唔係救援計劃，就會容易好多。即使未完成所有事，都為佢留一個固定位置。世界仲郁緊，你都可以停一停。" },
      ],
    },
  ],
  "a-walk-does-not-need-to-count": [
    {
      paragraphs: [
        { en: "A walk does not stop being useful because you forgot to start your watch. It can help you get home, clear your head, talk with a friend or notice a street you normally rush through.", "zh-hk": "唔記得開手錶，散步都唔會突然冇用。佢可以帶你返屋企、清一清個腦、同朋友傾偈，或者留意平時急急腳行過嘅街。" },
        { en: "Numbers can help when you have a clear reason to track them. But they can also pull your attention away from the walk itself. A pleasant evening should not feel like a failure because the step count was low.", "zh-hk": "有清楚原因時，數字可以有幫助。但數字亦可能將注意力由散步本身拉走。一個舒服晚上，唔應該因為步數少就變成失敗。" },
      ],
    },
    {
      heading: { en: "Let the route change", "zh-hk": "畀條路改變一下" },
      paragraphs: [
        { en: "Hong Kong is good for small detours. A staircase leads to a lane, the lane passes a temple, and suddenly you find a view you did not expect. A walk with no fixed target leaves room for these moments.", "zh-hk": "香港好適合兜少少路。一條樓梯接住小巷，小巷經過廟宇，突然又會見到意想不到嘅景色。冇固定目標嘅散步，先有空間畀呢啲時刻出現。" },
        { en: "You do not need a famous trail. Walk around your own area at a different time, get off one stop early or follow a quieter street. Curiosity can be enough of a plan.", "zh-hk": "唔一定要去著名行山徑。可以換個時間行自己個區、早一個站落車，或者跟一條較靜嘅街行。好奇心已經可以係計劃。" },
      ],
    },
    {
      heading: { en: "Keep it safe and comfortable", "zh-hk": "行得安全舒服" },
      paragraphs: [
        { en: "Choose a route that suits the weather, your shoes and your energy. Bring water on hot days, use well-lit paths at night and turn back when the route stops feeling right.", "zh-hk": "按天氣、鞋同當日精神揀路線。熱天帶水，夜晚行光猛嘅路，覺得唔對路就回頭。" },
        { en: "The walk does not have to become training. It can remain one of the easiest ways to spend time in the city and return home feeling a little lighter.", "zh-hk": "散步唔一定要變成訓練。佢可以繼續係最簡單嘅城市活動之一，行完返屋企，個人輕鬆少少就夠。" },
      ],
    },
  ],
  "the-best-studio-makes-room-for-beginners": [
    {
      paragraphs: [
        { en: "Trying a new studio can feel harder than the class itself. Everyone else seems to know where to stand, what to bring and how the equipment works. A beginner may feel behind before anything has started.", "zh-hk": "試一間新教室，有時比上堂本身更難。其他人好似都知道企邊、帶咩同器材點用。新手未開始已經覺得落後。" },
        { en: "A good studio notices this. It explains the basics without making a big scene, gives people time to settle in and offers another option when a movement is not right for them.", "zh-hk": "好教室會留意到呢件事。佢會自然咁講解基本資料，畀時間大家適應，亦會喺某個動作唔適合時提供另一個選擇。" },
      ],
    },
    {
      heading: { en: "Friendly is part of good teaching", "zh-hk": "友善係好教學一部分" },
      paragraphs: [
        { en: "Warm service is not just decoration. It helps people ask questions and say when something hurts. That makes a class safer and gives the teacher better information.", "zh-hk": "親切服務唔只係表面功夫。佢令大家敢問問題，亦敢講邊度痛。咁會令課堂更安全，老師亦有更多資料去幫人。" },
        { en: "The best teachers do not show off how much they know. They give clear instructions, watch the room and help each person find a workable version of the class.", "zh-hk": "最好嘅老師唔會不停展示自己識幾多。佢哋會清楚講解、留意全班，再幫每個人搵到做得到嘅版本。" },
      ],
    },
    {
      heading: { en: "What to look for", "zh-hk": "揀教室可以留意咩" },
      paragraphs: [
        { en: "Before booking, check the class level, language, equipment and arrival time. If the website is not clear, send a message. The way a studio answers often tells you a lot about how it treats newcomers.", "zh-hk": "預約前睇清楚程度、語言、器材同要早幾多到。網站唔清楚就發訊息問。教室點樣回覆，通常已經可以睇到佢點對新手。" },
        { en: "You do not need to earn your place by being fit, flexible or confident first. A beginner class should be built for people who are beginning. That is the whole point.", "zh-hk": "唔需要先變得好體能、好柔軟或者好有信心，先有資格入去。新手班本來就應該為啱啱開始嘅人而設。呢個就係重點。" },
      ],
    },
  ],
  "sauna-is-better-when-nobody-is-rushing": [
    {
      paragraphs: [
        { en: "A sauna works best when it feels like a pause, not a race. The goal is not to stay longer than everyone else or turn the heat into another challenge. It is to slow down and notice how you feel.", "zh-hk": "桑拿最好係一個停頓，而唔係比賽。目標唔係坐得比其他人耐，亦唔係將高溫變成另一個挑戰，而係慢落嚟，留意自己感受。" },
        { en: "Rushing changes the whole experience. People check the clock, move loudly and treat each round like a task. A calmer space gives everyone time to settle, breathe and leave when they are ready.", "zh-hk": "趕時間會改變成個體驗。大家不停望鐘、大聲郁動，將每一輪當成任務。安靜啲嘅空間，先畀到時間大家坐定、呼吸，同準備好先離開。" },
      ],
    },
    {
      heading: { en: "Share the room well", "zh-hk": "好好共享個空間" },
      paragraphs: [
        { en: "Sauna etiquette is mostly simple care for other people. Keep conversation low, follow the venue’s towel and phone rules, and do not take photos unless everyone has clearly agreed.", "zh-hk": "桑拿禮儀其實主要係照顧其他人。細聲傾偈、跟場地毛巾同電話規則，亦唔好影相，除非所有人都清楚同意。" },
        { en: "Different venues have different customs. Some are quiet; others are social or guided. Read the rules before you go and ask staff if you are unsure. Nobody should expect a first-time visitor to guess.", "zh-hk": "唔同場地有唔同習慣。有啲安靜，有啲較社交，亦有帶領儀式。出發前睇規則，唔肯定就問職員。冇人應該要求第一次去嘅人靠估。" },
      ],
    },
    {
      heading: { en: "Heat is enough", "zh-hk": "熱力本身已經夠" },
      paragraphs: [
        { en: "Drink water, start with a shorter visit and step out if you feel dizzy or unwell. More heat and more time are not always better. Comfort and safety come first.", "zh-hk": "記得飲水，第一次時間短啲，頭暈或者唔舒服就出去。更熱同更耐唔一定更好，舒服同安全最重要。" },
        { en: "A good sauna visit can be very simple: arrive, warm up, cool down and leave with less noise in your head. It does not need to become a performance.", "zh-hk": "一次好嘅桑拿可以好簡單：到場、慢慢暖起來、降溫，離開時個腦少啲雜聲。唔需要變成表演。" },
      ],
    },
  ],
  "the-neighbourhood-health-shop-still-matters": [
    {
      paragraphs: [
        { en: "A neighbourhood health shop can do something an online store cannot: help you look closely, ask a quick question and buy only what you need. That small amount of contact can make shopping simpler.", "zh-hk": "社區健康店做到一啲網店做唔到嘅事：畀你睇清楚產品、即場問一句，同只買真正需要嘅份量。呢一點接觸，可以令購物簡單好多。" },
        { en: "These shops are also useful for ordinary things—refills, pantry basics, tea, snacks and personal-care products. Wellness does not have to arrive in a large parcel or as an expensive new trend.", "zh-hk": "呢啲店亦適合買日常用品：補充裝、基本食材、茶、零食同個人護理產品。健康生活唔一定要用大紙箱送到，亦唔一定係昂貴新潮流。" },
      ],
    },
    {
      heading: { en: "Ask simple questions", "zh-hk": "問簡單問題" },
      paragraphs: [
        { en: "For food and household products, ask what is inside, where it comes from and how it should be stored. Clear answers are more useful than big promises on the label.", "zh-hk": "買食物同家居用品時，可以問入面有咩、來自邊度同點樣保存。清楚答案，比包裝上嘅大承諾更有用。" },
        { en: "Supplements need extra care. Shop staff can explain products, but they should not replace medical advice. Check with a qualified professional when medicines, pregnancy or health conditions are involved.", "zh-hk": "補充品要更加小心。店員可以介紹產品，但唔應該取代醫療意見。如果牽涉藥物、懷孕或者健康情況，先問合資格專業人士。" },
      ],
    },
    {
      heading: { en: "Buy less, but buy well", "zh-hk": "買少啲，買啱啲" },
      paragraphs: [
        { en: "A good shop should help you avoid waste, not push you to collect more products. Refills, smaller amounts and honest advice can be better than a shelf full of things you stop using.", "zh-hk": "好店應該幫你減少浪費，而唔係叫你越買越多。補充裝、細份量同誠實建議，可能比一櫃最後唔再用嘅產品更好。" },
        { en: "Local shops survive when people remember to use them. If one offers fair prices, clear information and products that fit your life, it is worth keeping in your regular route.", "zh-hk": "本地小店要有人記得幫襯先可以生存。如果一間店價錢合理、資料清楚，產品又配合你生活，就值得放入日常路線。" },
      ],
    },
  ],
};

export const readableReadTimes: Record<string, { en: string; "zh-hk": string }> = Object.fromEntries(
  Object.keys(readableEditorials).map((slug) => [slug, { en: "2 min read", "zh-hk": "閱讀約2分鐘" }]),
);

export const readableHeadlines: Record<string, { title: LocalText; deck: LocalText }> = {
  "convenience-is-the-real-wellness-luxury": {
    title: { en: "The best wellness routine is close to home.", "zh-hk": "最好嘅健康習慣，就喺屋企附近。" },
    deck: { en: "A nearby place you use often can do more for you than a perfect place you rarely visit.", "zh-hk": "一個就近又成日去到嘅地方，可能比一個好完美但好少去嘅地方更有用。" },
  },
  "hong-kong-does-not-need-more-punishing-workouts": {
    title: { en: "Exercise should not leave you completely drained.", "zh-hk": "做完運動，唔需要攰到一滴都冇。" },
    deck: { en: "Hard sessions have their place, but movement can also be social, enjoyable and easy enough to repeat.", "zh-hk": "辛苦訓練有佢嘅位置，但運動亦可以好玩、有朋友一齊，同容易再做。" },
  },
  "cold-plunges-are-not-a-personality": {
    title: { en: "Cold plunges do not have to prove anything.", "zh-hk": "冰浴唔需要證明任何嘢。" },
    deck: { en: "Try it with care if you are curious. You do not need to turn discomfort into a test of character.", "zh-hk": "好奇可以小心試吓，但唔需要將辛苦變成性格測試。" },
  },
  "healthy-food-should-still-taste-like-hong-kong": {
    title: { en: "Healthy food should still taste like Hong Kong.", "zh-hk": "健康飲食，仍然可以有香港味道。" },
    deck: { en: "Eating well can make room for local flavours, shared meals and food we actually want to eat again.", "zh-hk": "食得好可以保留本地味道、一齊食飯嘅快樂，同令人真係想再食嘅食物。" },
  },
  "public-sports-centres-are-wellness-infrastructure": {
    title: { en: "Public sports centres help Hong Kong stay active.", "zh-hk": "公共體育館幫香港保持郁動。" },
    deck: { en: "Affordable courts, pools and activity rooms are a basic part of a healthier city.", "zh-hk": "負擔得到嘅球場、泳池同活動室，係健康城市嘅基本部分。" },
  },
  "rest-is-not-a-reward-for-productivity": {
    title: { en: "You do not have to earn your rest.", "zh-hk": "休息唔需要先賺返嚟。" },
    deck: { en: "Stopping before you are exhausted is normal care, not a reward for finishing everything.", "zh-hk": "未攰到散就停一停，係正常照顧自己，唔係做晒所有嘢先有嘅獎品。" },
  },
  "a-walk-does-not-need-to-count": {
    title: { en: "A walk is useful even when you do not track it.", "zh-hk": "冇記錄步數，散步一樣有用。" },
    deck: { en: "Some walks are for getting somewhere. Others are simply time to notice the city and clear your head.", "zh-hk": "有啲路係為咗去一個地方，有啲只係畀你望吓城市，同清一清個腦。" },
  },
  "the-best-studio-makes-room-for-beginners": {
    title: { en: "A good studio welcomes beginners.", "zh-hk": "好教室會歡迎新手。" },
    deck: { en: "Clear instructions, kind staff and room to ask questions matter more than looking advanced.", "zh-hk": "清楚講解、友善職員同可以放心問問題，比睇落有幾專業更重要。" },
  },
  "sauna-is-better-when-nobody-is-rushing": {
    title: { en: "A sauna is better when no one is rushing.", "zh-hk": "冇人趕時間，桑拿先更舒服。" },
    deck: { en: "Slow down, share the room with care and leave when your body says it is time.", "zh-hk": "慢落嚟、好好共享空間，身體話夠就離開。" },
  },
  "the-neighbourhood-health-shop-still-matters": {
    title: { en: "Why the neighbourhood health shop still matters.", "zh-hk": "點解社區健康店仍然重要。" },
    deck: { en: "A useful local shop offers clear advice, everyday products and a chance to buy only what you need.", "zh-hk": "實用嘅本地店會提供清楚建議、日常產品，同只買所需份量嘅選擇。" },
  },
};
