import type { LocalText } from "./data";
import { editorialFieldNotes, editorialLongform } from "./editorial-longform";

export type Editorial = {
  slug: string;
  number: string;
  format: LocalText;
  category: LocalText;
  title: LocalText;
  deck: LocalText;
  date: LocalText;
  readTime: LocalText;
  accent: "jade" | "blue" | "clay";
  coverImage?: string;
  coverAlt?: LocalText;
  sections: Array<{
    heading?: LocalText;
    paragraphs: LocalText[];
  }>;
};

const shortEditorials: Editorial[] = [
  {
    slug: "convenience-is-the-real-wellness-luxury",
    number: "01",
    format: { en: "Feature", "zh-hk": "專題" },
    category: { en: "City life", "zh-hk": "城市生活" },
    title: { en: "Convenience is the real wellness luxury.", "zh-hk": "方便，先係真正嘅健康生活奢侈品。" },
    deck: {
      en: "The best routine is rarely the most impressive one. It is the one close enough to survive a rainy Tuesday and a late meeting.",
      "zh-hk": "最好嘅習慣通常唔係最矚目嗰個，而係落雨星期二、開會超時之後，仍然方便做到嗰個。",
    },
    date: { en: "21 September 2026", "zh-hk": "2026年9月21日" },
    readTime: { en: "12 min read", "zh-hk": "閱讀約12分鐘" },
    accent: "jade",
    coverImage: "/editorial-hong-kong-morning.png",
    coverAlt: { en: "A morning walk through a hillside Hong Kong neighbourhood", "zh-hk": "清晨漫步香港山城社區" },
    sections: [
      {
        paragraphs: [
          { en: "Wellness is often marketed as escape: a retreat, a transformation, a version of life with more time than the one we actually have. Hong Kong makes that fantasy especially tempting. It also makes it especially impractical.", "zh-hk": "健康生活經常被包裝成一場逃離：去靜修、徹底改變，或者活成一個比現實多好多時間嘅自己。喺香港，呢種幻想特別吸引，亦特別唔實際。" },
          { en: "A pool beside your MTR stop can matter more than a beautiful club across town. A decent lunch downstairs can do more for your week than a perfect meal plan that requires three shops and a Sunday afternoon. Proximity is not laziness. It is design.", "zh-hk": "港鐵站旁邊嘅泳池，可能比要跨區先去到嘅靚會所更重要。樓下一餐唔錯嘅午餐，亦可能比要行三間舖、用成個星期日準備嘅完美餐單更有用。就近唔係懶，而係設計。" },
        ],
      },
      {
        heading: { en: "Build for the week you actually have", "zh-hk": "為你真正擁有嘅一星期而設計" },
        paragraphs: [
          { en: "We should judge a habit by how little negotiation it demands. If getting there needs two interchanges, special clothes and an hour of mental preparation, it is an occasional experience—not a routine. There is nothing wrong with that, but it helps to name it honestly.", "zh-hk": "衡量一個習慣，可以睇佢需要幾多心理掙扎。如果要轉兩次車、帶特別裝備，再做一個鐘心理準備先去到，嗰個係偶爾體驗，唔係日常。偶爾體驗冇問題，只係要誠實分清楚。" },
          { en: "The quiet advantage of a local directory is not abundance. It is subtraction. Find the three places that fit your route, your budget and your energy. Then let repetition do the work.", "zh-hk": "本地目錄真正嘅價值唔係選擇夠多，而係幫你刪走唔適合嘅選擇。搵到三個配合你路線、預算同精神狀態嘅地方，之後交畀重複去發揮作用。" },
        ],
      },
    ],
  },
  {
    slug: "hong-kong-does-not-need-more-punishing-workouts",
    number: "02",
    format: { en: "Opinion", "zh-hk": "觀點" },
    category: { en: "Movement", "zh-hk": "運動" },
    title: { en: "Hong Kong does not need more punishing workouts.", "zh-hk": "香港唔需要更多懲罰式運動。" },
    deck: { en: "Movement should give something back. Exhaustion is not the only proof that exercise counted.", "zh-hk": "運動應該令你有所得着。筋疲力盡，唔係證明運動有效嘅唯一方法。" },
    date: { en: "14 September 2026", "zh-hk": "2026年9月14日" },
    readTime: { en: "11 min read", "zh-hk": "閱讀約11分鐘" },
    accent: "blue",
    sections: [
      {
        paragraphs: [
          { en: "In a city already built around pressure, exercise can easily become another performance review. Faster, heavier, more disciplined. The language of fitness borrows too comfortably from work: targets, optimisation, failure and guilt.", "zh-hk": "喺一個本身已經充滿壓力嘅城市，運動好容易變成另一份表現評核：要更快、更重、更自律。健身語言太習慣借用工作嗰套：目標、優化、失敗同內疚。" },
          { en: "But movement can be playful, social or deliberately easy. Badminton with friends counts. Ten calm laps count. Learning pickleball badly and laughing through it counts. A practice can improve your life without consuming it.", "zh-hk": "但運動可以好玩、可以社交，亦可以刻意輕鬆。同朋友打羽毛球係運動，慢慢游十個塘係運動，學匹克球學得麻麻但笑足全場都係運動。運動可以改善生活，唔需要吞噬生活。" },
        ],
      },
      {
        heading: { en: "Choose energy, not punishment", "zh-hk": "選擇能量，而唔係懲罰" },
        paragraphs: [
          { en: "The useful question is not whether a session was hard enough. It is whether you want to return. Enjoyment is not a soft extra; it is one of the strongest reasons a practice survives beyond the first burst of motivation.", "zh-hk": "真正有用嘅問題唔係一堂夠唔夠辛苦，而係你想唔想再返去。享受唔係可有可無，而係一個習慣可以捱過最初熱情嘅重要原因。" },
        ],
      },
    ],
  },
  {
    slug: "cold-plunges-are-not-a-personality",
    number: "03",
    format: { en: "Review", "zh-hk": "評評" },
    category: { en: "Recovery", "zh-hk": "恢復" },
    title: { en: "Cold-plunge culture, reviewed.", "zh-hk": "冰浴文化，值得點評。" },
    deck: { en: "The ritual can feel brilliant. The performance around it is less convincing. Our verdict on Hong Kong’s cold-plunge moment.", "zh-hk": "個儀式可以好正，圍繞住佢嘅表演就未必。點睇香港而家嘅冰浴熱潮。" },
    date: { en: "7 September 2026", "zh-hk": "2026年9月7日" },
    readTime: { en: "12 min read", "zh-hk": "閱讀約12分鐘" },
    accent: "blue",
    sections: [
      {
        paragraphs: [
          { en: "Cold plunges have acquired the visual language of toughness: timers, clenched jaws and declarations about discipline. That can make a simple sensory experience feel like an audition for a more resilient self.", "zh-hk": "冰浴慢慢有咗一套硬朗嘅視覺語言：計時器、咬實牙關，同一大堆關於意志力嘅宣言。原本簡單嘅感官體驗，變成好似要面試一個更堅強嘅自己。" },
          { en: "It does not need to carry that weight. You can like the alertness, the ritual or the social pause around it. You can also dislike it. Neither response says much about your ambition, discipline or worth.", "zh-hk": "其實唔需要咁沉重。你可以鍾意嗰份醒神、個儀式感，或者同人一齊停一停嘅時刻；你亦可以完全唔鍾意。兩種反應都唔代表你有冇上進心、自律或者價值。" },
        ],
      },
      {
        heading: { en: "Experience over identity", "zh-hk": "體驗大過人設" },
        paragraphs: [
          { en: "Treat recovery spaces as places to notice how you feel, not places to prove what you can tolerate. Ask questions, start conservatively and step out when your body tells you to. Wellness should leave room for judgment.", "zh-hk": "將恢復空間當成留意自己感受嘅地方，而唔係證明忍耐力嘅場地。先問清楚、保守開始，身體話要停就停。健康生活應該留返判斷空間。" },
        ],
      },
    ],
  },
  {
    slug: "healthy-food-should-still-taste-like-hong-kong",
    number: "04",
    format: { en: "Feature", "zh-hk": "專題" },
    category: { en: "Food", "zh-hk": "飲食" },
    title: { en: "Healthy food should still taste like Hong Kong.", "zh-hk": "健康飲食，仍然可以有香港味道。" },
    deck: { en: "Eating well should expand local food culture, not replace it with the same imported bowl in every neighbourhood.", "zh-hk": "食得好應該令本地飲食文化更豐富，而唔係每區都換成同一碗入口健康餐。" },
    date: { en: "31 August 2026", "zh-hk": "2026年8月31日" },
    readTime: { en: "11 min read", "zh-hk": "閱讀約11分鐘" },
    accent: "clay",
    sections: [
      {
        paragraphs: [
          { en: "Too much wellness food looks as if it could belong to any wealthy city: the same bowls, the same beige interiors, the same list of ingredients flown farther than most customers travel in a year.", "zh-hk": "太多健康餐廳放喺任何富裕城市都一樣：同一款碗、同一種米色裝修，同一張食材飛得比大部分客人一年旅程更遠嘅餐牌。" },
          { en: "Hong Kong already has a deep vocabulary for balance, seasonality, texture and sharing. A healthier food culture should be curious about that inheritance—not embarrassed by it. It should make room for soup, rice, tea, tofu and the pleasure of eating together.", "zh-hk": "香港本身就有一套關於平衡、時令、口感同分享嘅深厚語言。更健康嘅飲食文化應該對呢份傳承保持好奇，而唔係嫌棄。湯、飯、茶、豆腐，同一齊食飯嘅快樂，都應該有位置。" },
        ],
      },
      {
        heading: { en: "Healthy is not a single aesthetic", "zh-hk": "健康唔係得一種美學" },
        paragraphs: [
          { en: "The most interesting restaurants are not those that perform health most loudly. They are the ones that make vegetables desirable, portions thoughtful and everyday meals satisfying enough to return to.", "zh-hk": "最有趣嘅餐廳唔係最大聲表演健康嗰啲，而係令蔬菜變得吸引、份量有心思，日常一餐好食到令人想再返去嗰啲。" },
        ],
      },
    ],
  },
  {
    slug: "public-sports-centres-are-wellness-infrastructure",
    number: "05",
    format: { en: "Feature", "zh-hk": "專題" },
    category: { en: "The city", "zh-hk": "城市" },
    title: { en: "Public sports centres are wellness infrastructure.", "zh-hk": "公共體育館，就係健康生活基建。" },
    deck: { en: "Wellbeing is not only built in boutique studios. It is built in affordable courts, pools and rooms people can reach.", "zh-hk": "健康唔只喺精品工作室建立，亦喺人人去得到、負擔得起嘅球場、泳池同活動室建立。" },
    date: { en: "24 August 2026", "zh-hk": "2026年8月24日" },
    readTime: { en: "12 min read", "zh-hk": "閱讀約12分鐘" },
    accent: "jade",
    sections: [
      {
        paragraphs: [
          { en: "The modern wellness story loves novelty. Yet some of the city’s most useful wellbeing spaces are familiar municipal buildings: badminton courts above markets, pools beside housing estates and fitness rooms that cost less than lunch.", "zh-hk": "現代健康生活故事鍾意新鮮感，但城中最實用嘅健康空間，往往係熟悉嘅市政建築：街市樓上嘅羽毛球場、屋邨旁邊嘅泳池，同平過一餐午飯嘅健身室。" },
          { en: "These places matter because access matters. A city cannot treat movement as essential while leaving it dependent on premium memberships, long journeys or insider knowledge.", "zh-hk": "呢啲地方重要，因為可達性重要。一個城市唔可以一邊話運動必不可少，一邊又令運動依賴昂貴會籍、長途交通或者內行資訊。" },
        ],
      },
      {
        heading: { en: "Celebrate the ordinary", "zh-hk": "欣賞日常" },
        paragraphs: [
          { en: "Public facilities do not need to pretend to be retreats. They need clear information, reliable maintenance, fair booking and a welcome that extends beyond experienced users. Ordinary access, done well, is an ambitious wellness policy.", "zh-hk": "公共設施唔需要扮度假村。佢哋需要清楚資訊、可靠保養、公平預訂，同對新手都友善嘅環境。將日常可達性做好，本身就係有野心嘅健康政策。" },
        ],
      },
    ],
  },
  {
    slug: "rest-is-not-a-reward-for-productivity",
    number: "06",
    format: { en: "Opinion", "zh-hk": "觀點" },
    category: { en: "Rest", "zh-hk": "休息" },
    title: { en: "Rest is not a reward for productivity.", "zh-hk": "休息唔係努力工作之後嘅獎品。" },
    deck: { en: "If recovery must always be earned, it never truly arrives. Sometimes stopping is simply part of being a person.", "zh-hk": "如果休息永遠都要先賺返嚟，真正嘅休息就永遠唔會到。有時停低，只係做人嘅一部分。" },
    date: { en: "17 August 2026", "zh-hk": "2026年8月17日" },
    readTime: { en: "10 min read", "zh-hk": "閱讀約10分鐘" },
    accent: "clay",
    sections: [
      {
        paragraphs: [
          { en: "Even rest has been recruited into productivity. We sleep to perform, meditate to focus and recover so we can return to work faster. The pause is justified only by the output it promises later.", "zh-hk": "連休息都被生產力收編。我哋瞓覺為咗表現更好，冥想為咗更集中，恢復為咗快啲返工。停一停嘅價值，永遠要靠之後嘅產出去證明。" },
          { en: "That framing keeps the nervous system on the clock. A walk with no step target, an afternoon with no improvement project and a meal that is simply pleasant can feel almost rebellious. Perhaps that is why they are necessary.", "zh-hk": "呢種框架令身心連休息都要計時。冇步數目標嘅散步、冇自我提升計劃嘅下晝，同純粹食得開心嘅一餐，竟然有少少反叛。可能正因如此，佢哋先係必要。" },
        ],
      },
      {
        heading: { en: "Leave some time unmeasured", "zh-hk": "留一啲唔量度嘅時間" },
        paragraphs: [
          { en: "Not every restorative thing needs a booking, a wearable or a name. Make room for experiences that do not report back. Their value can remain private, felt and pleasantly difficult to quantify.", "zh-hk": "唔係每一樣令人恢復嘅事都需要預約、穿戴裝置或者一個名目。留返空間畀一啲唔需要匯報成果嘅體驗。佢哋嘅價值可以保持私人、只靠感受，而且舒服地難以量化。" },
        ],
      },
    ],
  },
];

export const editorials: Editorial[] = shortEditorials.map((article) => ({
  ...article,
  sections: [...article.sections, ...(editorialLongform[article.slug] ?? []), ...(editorialFieldNotes[article.slug] ?? [])],
}));

export function getEditorial(slug: string) {
  return editorials.find((article) => article.slug === slug);
}
