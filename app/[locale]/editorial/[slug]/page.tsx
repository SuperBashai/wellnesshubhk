import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import venueImages from "@/data/venue-images.json";
import { getListingBySlug, listingName, type Locale } from "@/lib/data";
import { editorialRecommendations } from "@/lib/editorial-recommendations";
import { editorials, getEditorial } from "@/lib/editorials";
import { absoluteUrl, defaultSocialImage, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.flatMap((locale) => editorials.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const article = getEditorial(slug);
  if (!article || !locales.includes(locale)) return {};
  const canonical = `/${locale}/editorial/${slug}`;
  const image = article.coverImage ?? defaultSocialImage;
  return {
    title: `${article.title[locale]} — Wellness Hub Editorial`,
    description: article.deck[locale],
    alternates: { canonical, languages: { en: `/en/editorial/${slug}`, "zh-HK": `/zh-hk/editorial/${slug}`, "x-default": `/en/editorial/${slug}` } },
    openGraph: { type: "article", url: canonical, siteName, title: article.title[locale], description: article.deck[locale], locale: locale === "en" ? "en_HK" : "zh_HK", publishedTime: new Date(article.date.en).toISOString(), modifiedTime: "2026-10-02T00:00:00+08:00", section: article.category[locale], images: [image] },
    twitter: { card: "summary_large_image", title: article.title[locale], description: article.deck[locale], images: [image] },
  };
}

export default async function EditorialArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const article = getEditorial(slug);
  if (!article) notFound();
  const articleIndex = editorials.findIndex((item) => item.slug === slug);
  const next = editorials[(articleIndex + 1) % editorials.length];
  const recommendations = (editorialRecommendations[slug] ?? [])
    .map((venueSlug) => ({ slug: venueSlug, listing: getListingBySlug(venueSlug) }))
    .filter((item): item is { slug: string; listing: NonNullable<ReturnType<typeof getListingBySlug>> } => Boolean(item.listing));
  const galleries = venueImages as Record<string, Array<{ url: string }>>;
  const canonicalUrl = absoluteUrl(`/${locale}/editorial/${slug}`);
  const articleImage = absoluteUrl(article.coverImage ?? "/well-hk-hero.png");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article", "@id": `${canonicalUrl}#article`, headline: article.title[locale], description: article.deck[locale],
        image: [articleImage], datePublished: new Date(article.date.en).toISOString(), dateModified: "2026-10-02T00:00:00+08:00",
        author: { "@type": "Organization", name: siteName, url: absoluteUrl(`/${locale}`) }, publisher: { "@type": "Organization", name: siteName, url: absoluteUrl(`/${locale}`) },
        mainEntityOfPage: canonicalUrl, articleSection: article.category[locale], inLanguage: locale === "en" ? "en-HK" : "zh-HK",
        wordCount: article.sections.flatMap((section) => section.paragraphs).map((paragraph) => paragraph[locale]).join(" ").split(/\s+/).length,
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: locale === "en" ? "Editorial" : "生活誌", item: absoluteUrl(`/${locale}/editorial`) },
          { "@type": "ListItem", position: 3, name: article.title[locale], item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <><JsonLd data={jsonLd} /><main>
      <SiteHeader locale={locale} page="guide" alternatePath={`/editorial/${slug}`} />
      <article className={`opinion-page editorial-accent-${article.accent}`}>
        <header className="opinion-header">
          <div className="shell opinion-header-inner">
            <Link className="opinion-back" href={`/${locale}/editorial`}><ArrowLeft size={16} />{locale === "en" ? "All editorials" : "全部生活誌文章"}</Link>
            <div className="opinion-title-grid">
              <div><span className="editorial-issue">{article.format[locale]} / {article.number}</span><p>{article.category[locale]}</p></div>
              <h1>{article.title[locale]}</h1>
            </div>
            <div className="opinion-deck"><p>{article.deck[locale]}</p><div className="editorial-meta"><span>{article.date[locale]}</span><span>{article.readTime[locale]}</span></div></div>
          </div>
          {article.coverImage && <div className="opinion-cover"><Image src={article.coverImage} alt={article.coverAlt?.[locale] ?? ""} fill priority sizes="100vw" /></div>}
        </header>

        <div className="opinion-body shell">
          <aside><span>Wellness Hub</span><p>{locale === "en" ? "An independent point of view on living well in Hong Kong." : "關於喺香港好好生活嘅獨立觀點。"}</p></aside>
          <div className="opinion-copy">
            {article.sections.map((section, index) => <section key={section.heading?.en ?? index}>
              {section.heading && <h2>{section.heading[locale]}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}
            </section>)}
            <div className="opinion-note"><strong>{locale === "en" ? "Editorial note" : "編輯註"}</strong><p>{locale === "en" ? "This article expresses an editorial point of view and is for general information only. It is not medical advice." : "本文屬編輯觀點及一般資訊分享，並非醫療建議。"}</p></div>
          </div>
        </div>

        {recommendations.length > 0 && <section className="editorial-places">
          <div className="shell">
            <div className="editorial-places-heading">
              <div><span>{locale === "en" ? "Keep exploring" : "繼續探索"}</span><h2>{locale === "en" ? "Places that fit this story" : "同今篇文章有關嘅地方"}</h2></div>
              <p>{locale === "en" ? "A few directory picks to help turn the idea into a real day out." : "精選幾個目錄場地，將文章想法變成一個真實行程。"}</p>
            </div>
            <div className="editorial-place-grid">
              {recommendations.map(({ slug: venueSlug, listing }) => {
                const photo = galleries[venueSlug]?.[0];
                return <Link className="editorial-place-card" href={`/${locale}/venues/${venueSlug}`} key={venueSlug}>
                  <div className={`editorial-place-media${photo ? " has-photo" : ""}`}>
                    {photo ? <Image src={photo.url} alt="" fill unoptimized sizes="(max-width: 780px) 100vw, 33vw" /> : <span>WELL / HK</span>}
                  </div>
                  <div className="editorial-place-copy">
                    <span><MapPin size={14} />{listing.area[locale]}</span>
                    <h3>{listingName(listing, locale)}</h3>
                    <p>{listing.description[locale]}</p>
                    <strong>{locale === "en" ? "View place" : "查看場地"}<ArrowUpRight size={16} /></strong>
                  </div>
                </Link>;
              })}
            </div>
          </div>
        </section>}

        <footer className="opinion-next"><div className="shell"><span>{locale === "en" ? "Read next" : "下一篇"}</span><Link href={`/${locale}/editorial/${next.slug}`}><strong>{next.title[locale]}</strong><ArrowRight size={26} /></Link></div></footer>
      </article>
      <SiteFooter locale={locale} />
    </main></>
  );
}
