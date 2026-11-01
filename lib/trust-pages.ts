import type { LocalText } from "@/lib/data";

export type TrustPage = {
  slug: "about" | "methodology" | "editorial-policy";
  title: LocalText;
  intro: LocalText;
  sections: { heading: LocalText; paragraphs: LocalText[] }[];
};

export const trustPages: TrustPage[] = [
  {
    slug: "about",
    title: { en: "About Wellness Hub", "zh-hk": "關於 Wellness Hub" },
    intro: { en: "A neighbourhood-first guide to places to move, recover and eat well across Hong Kong.", "zh-hk": "由社區出發，探索全港運動、恢復同健康飲食嘅實用指南。" },
    sections: [
      { heading: { en: "What we do", "zh-hk": "我哋做啲咩" }, paragraphs: [
        { en: "Wellness Hub brings public facilities and private businesses into one bilingual directory. We organise places by activity and area, so you can find something that fits an ordinary week—not just a special occasion.", "zh-hk": "Wellness Hub 將公共設施同私人場地整理喺同一個雙語目錄，按活動同地區分類，幫你搵到適合日常生活、唔使等特別日子先去嘅地方。" },
        { en: "Our events calendar highlights upcoming activities using organiser information and links you back to the original source for booking and updates.", "zh-hk": "健康活動日曆根據主辦方資料整理即將舉行嘅活動，並連結原始來源，方便你查閱最新安排同報名。" },
      ] },
      { heading: { en: "What we are not", "zh-hk": "我哋唔係咩" }, paragraphs: [
        { en: "A listing is not a recommendation or medical endorsement. Opening hours, prices and availability can change. Please confirm important details directly with the venue before you go.", "zh-hk": "收錄場地唔等於推薦或醫療認可。開放時間、收費同名額都可能改變，出發前請直接向場地核實重要資料。" },
      ] },
    ],
  },
  {
    slug: "methodology",
    title: { en: "How we build the directory", "zh-hk": "場地資料點樣整理" },
    intro: { en: "A practical account of how we select, source and maintain venue and event listings.", "zh-hk": "講清楚我哋點樣揀選、查證同更新場地及活動資料。" },
    sections: [
      { heading: { en: "Selection and sources", "zh-hk": "揀選及資料來源" }, paragraphs: [
        { en: "We include Hong Kong places connected to movement, recovery, healthy dining and health-related shopping. Public facilities and private businesses can both qualify. Each venue page links to an official source; event pages link to the organiser or official booking page.", "zh-hk": "我哋收錄香港與運動、恢復、健康飲食及健康用品有關嘅地方，公共設施同私人場地都可以入選。每個場地頁會連結官方來源；活動頁會連結主辦方或官方報名頁。" },
        { en: "We use published details where available, and leave a field unconfirmed when it has not been published. A missing phone number, price or opening hour is better than a guessed one.", "zh-hk": "有公布嘅資料先會列出；未公布嘅電話、收費或營業時間會保留為未確認，唔會估。" },
      ] },
      { heading: { en: "Updates and corrections", "zh-hk": "更新及更正" }, paragraphs: [
        { en: "Listings can change without notice. We review official venue and organiser information, including announced openings, relocations, closures and event changes. The source link on each page is the best place to verify a detail immediately before visiting.", "zh-hk": "場地資料可能隨時變動。我哋會查看場地同主辦方官方資料，包括新開幕、搬遷、結業同活動改動。出發前，請到頁面上嘅官方連結再核對一次。" },
        { en: "If information is unclear or conflicts across sources, we avoid presenting it as certain until it can be resolved. We do not manufacture ratings or reviews.", "zh-hk": "如果資料未清楚，或者不同來源有衝突，我哋唔會當成已確認資訊刊登；亦唔會虛構評分或評論。" },
      ] },
    ],
  },
  {
    slug: "editorial-policy",
    title: { en: "Editorial policy", "zh-hk": "生活誌編輯方針" },
    intro: { en: "How we approach opinions, features, reviews and health-related claims.", "zh-hk": "我哋點樣處理觀點、專題、評評同健康相關內容。" },
    sections: [
      { heading: { en: "Clear labels, independent voice", "zh-hk": "清楚標示，獨立表達" }, paragraphs: [
        { en: "Opinion pieces express a point of view; features explore a topic; reviews describe an experience. We label these formats so readers know what they are reading. A venue appearing in an article or recommendation list is not a guarantee of quality or results.", "zh-hk": "觀點文章表達立場，專題深入探討題目，評評記錄體驗。我哋會標示文章類型，等讀者知道讀緊咩。場地出現喺文章或推薦名單，唔代表保證質素或效果。" },
      ] },
      { heading: { en: "Health information", "zh-hk": "健康資訊" }, paragraphs: [
        { en: "Our editorial content is for general information, not personal medical advice. Research about wellness practices is often limited or context-dependent. We aim to describe uncertainty and avoid claims that any single treatment is right for everyone.", "zh-hk": "生活誌內容只供一般參考，唔係個人醫療建議。健康方法嘅研究可能有限，亦會因情況而異；我哋會交代不確定之處，唔會話某一種療法人人都啱。" },
        { en: "Articles are not medically reviewed unless a named qualified reviewer is explicitly credited. Anyone with a medical condition should seek advice from an appropriate healthcare professional before trying a new practice.", "zh-hk": "除非文章清楚列出具名合資格審閱者，否則內容並未經醫療專業審閱。如果你有健康狀況，嘗試新方法前應向合適醫護專業人士查詢。" },
      ] },
      { heading: { en: "Reviews and corrections", "zh-hk": "評論及更正" }, paragraphs: [
        { en: "Visitor reviews are submitted by users and checked before public display; they are not the views of Wellness Hub. If an article or listing contains an error, we will correct the published information after checking the relevant source.", "zh-hk": "讀者評論由用戶提交，公開顯示前會經過檢查，唔代表 Wellness Hub 立場。如文章或場地資料有錯，我哋會核對相關來源後更正。" },
      ] },
    ],
  },
];
