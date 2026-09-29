import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/data";
import { editorials, getEditorial } from "@/lib/editorials";

const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.flatMap((locale) => editorials.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const article = getEditorial(slug);
  if (!article || !locales.includes(locale)) return {};
  return {
    title: `${article.title[locale]} — WELL HK Editorial`,
    description: article.deck[locale],
    alternates: { languages: { en: `/en/editorial/${slug}`, "zh-HK": `/zh-hk/editorial/${slug}` } },
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

  return (
    <main>
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
          <aside><span>WELL HK</span><p>{locale === "en" ? "An independent point of view on living well in Hong Kong." : "關於喺香港好好生活嘅獨立觀點。"}</p></aside>
          <div className="opinion-copy">
            {article.sections.map((section, index) => <section key={section.heading?.en ?? index}>
              {section.heading && <h2>{section.heading[locale]}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}
            </section>)}
            <div className="opinion-note"><strong>{locale === "en" ? "Editorial note" : "編輯註"}</strong><p>{locale === "en" ? "This article expresses an editorial point of view and is for general information only. It is not medical advice." : "本文屬編輯觀點及一般資訊分享，並非醫療建議。"}</p></div>
          </div>
        </div>

        <footer className="opinion-next"><div className="shell"><span>{locale === "en" ? "Read next" : "下一篇"}</span><Link href={`/${locale}/editorial/${next.slug}`}><strong>{next.title[locale]}</strong><ArrowRight size={26} /></Link></div></footer>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}
