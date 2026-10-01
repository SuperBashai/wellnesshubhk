import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import type { Locale } from "@/lib/data";
import { editorials } from "@/lib/editorials";
import { absoluteUrl, defaultSocialImage, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];

const pageCopy = {
  en: {
    issue: "THE WELLNESS HUB JOURNAL · ISSUE 01",
    title: "Stories for living well, as we are.",
    intro: "Thoughtful opinions, lived-in features and warm, honest reviews about moving, eating and finding a little more room in Hong Kong.",
    latest: "Cover story",
    read: "Read article",
    opinions: "Opinions",
    opinionsIntro: "Personal thoughts for real days—not another perfect routine.",
    features: "Features & field notes",
    featuresIntro: "Closer looks at the places, habits and ideas shaping how Hong Kong feels.",
    reviews: "Reviews",
    reviewsIntro: "Warm, honest notes on experiences that may be worth making time for.",
    browse: "Browse by format",
    note: "Independent editorial for general information—not medical advice.",
    directory: "Explore the directory",
  },
  "zh-hk": {
    issue: "WELLNESS HUB 生活誌 · 第一期",
    title: "如常生活，也可以好好生活。",
    intro: "有溫度嘅觀點、貼近日常嘅專題同真誠評評，寫香港人點樣郁動、食飯，同為自己留多少少空間。",
    latest: "今期封面故事",
    read: "閱讀文章",
    opinions: "觀點",
    opinionsIntro: "寫畀真實日子嘅個人想法，而唔係另一套完美規則。",
    features: "專題與現場筆記",
    featuresIntro: "行近一步，睇清塑造香港生活感受嘅地方、習慣同想法。",
    reviews: "評評",
    reviewsIntro: "溫暖而坦白嘅體驗筆記，陪你睇吓咩值得留時間。",
    browse: "按文章類型瀏覽",
    note: "獨立生活誌內容只供一般參考，並非醫療建議。",
    directory: "探索場地目錄",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const chinese = locale === "zh-hk";
  const title = chinese ? "生活誌 — 香港健康生活觀點" : "Editorial — Ideas for a healthier Hong Kong";
  const description = chinese ? pageCopy["zh-hk"].intro : pageCopy.en.intro;
  return {
    title, description,
    alternates: { canonical: `/${locale}/editorial`, languages: { en: "/en/editorial", "zh-HK": "/zh-hk/editorial", "x-default": "/en/editorial" } },
    openGraph: { type: "website", url: `/${locale}/editorial`, siteName, title, description, locale: chinese ? "zh_HK" : "en_HK", images: [defaultSocialImage] },
    twitter: { card: "summary_large_image", title, description, images: [defaultSocialImage] },
  };
}

export default async function EditorialIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const t = pageCopy[locale];
  const [lead] = editorials;
  const opinions = editorials.filter((article) => article.format.en === "Opinion");
  const features = editorials.filter((article) => article.format.en === "Feature" && article.slug !== lead.slug);
  const reviews = editorials.filter((article) => article.format.en === "Review");
  const pageUrl = absoluteUrl(`/${locale}/editorial`);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#collection`, url: pageUrl,
    name: t.title, description: t.intro, inLanguage: locale === "en" ? "en-HK" : "zh-HK",
    isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl(`/${locale}`) },
    mainEntity: { "@type": "ItemList", numberOfItems: editorials.length, itemListElement: editorials.map((article, index) => ({ "@type": "ListItem", position: index + 1, name: article.title[locale], url: absoluteUrl(`/${locale}/editorial/${article.slug}`) })) },
  };

  return (
    <><JsonLd data={jsonLd} /><main>
      <SiteHeader locale={locale} page="guide" />
      <div className="editorial-index">
        <header className="editorial-masthead">
          <div className="shell">
            <span className="editorial-issue">{t.issue}</span>
            <div className="editorial-masthead-grid">
              <h1>{t.title}</h1>
              <p>{t.intro}</p>
            </div>
            <nav className="editorial-format-nav" aria-label={t.browse}>
              <span>{t.browse}</span>
              <Link href="#opinions">{t.opinions}</Link>
              <Link href="#features">{t.features}</Link>
              <Link href="#reviews">{t.reviews}</Link>
            </nav>
          </div>
        </header>

        <section className={`editorial-lead editorial-accent-${lead.accent}`}>
          <div className="shell editorial-lead-grid">
            <Link className="editorial-cover-image" href={`/${locale}/editorial/${lead.slug}`} aria-label={`${t.read}: ${lead.title[locale]}`}>
              {lead.coverImage && <Image src={lead.coverImage} alt={lead.coverAlt?.[locale] ?? ""} fill priority sizes="(max-width: 780px) 100vw, 58vw" />}
              <span>{locale === "en" ? "Hong Kong / City life" : "香港 / 城市生活"}</span>
            </Link>
            <div className="editorial-lead-copy">
              <p className="editorial-kicker">{t.latest} · {lead.format[locale]}</p>
              <h2><Link href={`/${locale}/editorial/${lead.slug}`}>{lead.title[locale]}</Link></h2>
              <p>{lead.deck[locale]}</p>
              <div className="editorial-meta"><span>{lead.date[locale]}</span><span>{lead.readTime[locale]}</span></div>
              <Link className="editorial-read-link" href={`/${locale}/editorial/${lead.slug}`}>{t.read}<ArrowRight size={18} /></Link>
            </div>
          </div>
        </section>

        <section className="editorial-channel editorial-opinions section" id="opinions">
          <div className="shell">
            <div className="editorial-channel-heading"><span>{t.opinions}</span><h2>{t.opinionsIntro}</h2></div>
            <div className="editorial-opinion-grid">
              {opinions.map((article) => <article className={`editorial-story editorial-accent-${article.accent}`} key={article.slug}>
                <div className="editorial-story-top"><span>{article.number}</span><ArrowUpRight size={22} /></div>
                <Link className="editorial-card-image" href={`/${locale}/editorial/${article.slug}`} aria-label={`${t.read}: ${article.title[locale]}`}>
                  <Image src={article.coverImage!} alt={article.coverAlt?.[locale] ?? ""} fill sizes="(max-width: 780px) 100vw, 50vw" />
                </Link>
                <div className="editorial-row-meta"><span>{article.category[locale]}</span><span>{article.readTime[locale]}</span></div>
                <h3><Link href={`/${locale}/editorial/${article.slug}`}>{article.title[locale]}</Link></h3>
                <p>{article.deck[locale]}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section className="editorial-channel editorial-features section" id="features"><div className="shell">
          <div className="editorial-channel-heading"><span>{t.features}</span><h2>{t.featuresIntro}</h2></div>
          <div className="editorial-feature-list">{features.map((article) => <article className={`editorial-feature-row editorial-accent-${article.accent}`} key={article.slug}>
            <span className="editorial-row-number">{article.number}</span>
            <Link className="editorial-card-image" href={`/${locale}/editorial/${article.slug}`} aria-label={`${t.read}: ${article.title[locale]}`}>
              <Image src={article.coverImage!} alt={article.coverAlt?.[locale] ?? ""} fill sizes="(max-width: 780px) 100vw, 28vw" />
            </Link>
            <div><div className="editorial-row-meta"><span>{article.format[locale]}</span><span>{article.category[locale]}</span></div><h3><Link href={`/${locale}/editorial/${article.slug}`}>{article.title[locale]}</Link></h3></div>
            <p>{article.deck[locale]}</p>
            <Link className="editorial-row-arrow" href={`/${locale}/editorial/${article.slug}`} aria-label={`${t.read}: ${article.title[locale]}`}><ArrowUpRight size={22} /></Link>
          </article>)}</div>
        </div></section>

        <section className="editorial-channel editorial-reviews section" id="reviews"><div className="shell">
          <div className="editorial-channel-heading"><span>{t.reviews}</span><h2>{t.reviewsIntro}</h2></div>
          {reviews.map((article) => <article className={`editorial-review-card editorial-accent-${article.accent}`} key={article.slug}>
            <Link className="editorial-card-image" href={`/${locale}/editorial/${article.slug}`} aria-label={`${t.read}: ${article.title[locale]}`}>
              <Image src={article.coverImage!} alt={article.coverAlt?.[locale] ?? ""} fill sizes="(max-width: 780px) 100vw, 32vw" />
            </Link>
            <div><span className="editorial-review-verdict">{locale === "en" ? "A GENTLE TAKE" : "溫柔短評"}</span><strong>{locale === "en" ? "Come curious. Keep what feels good." : "帶住好奇嚟，舒服嘅先留低。"}</strong></div>
            <div><div className="editorial-row-meta"><span>{article.category[locale]}</span><span>{article.readTime[locale]}</span></div><h3><Link href={`/${locale}/editorial/${article.slug}`}>{article.title[locale]}</Link></h3><p>{article.deck[locale]}</p></div>
            <Link className="editorial-row-arrow" href={`/${locale}/editorial/${article.slug}`} aria-label={`${t.read}: ${article.title[locale]}`}><ArrowRight size={22} /></Link>
          </article>)}
          <div className="editorial-index-footer"><p>{t.note}</p><Link href={`/${locale}/places`}>{t.directory}<ArrowRight size={18} /></Link></div>
        </div></section>
      </div>
      <SiteFooter locale={locale} />
    </main></>
  );
}
