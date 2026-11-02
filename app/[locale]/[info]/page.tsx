import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/data";
import { absoluteUrl, localizedLanguageAlternates } from "@/lib/seo";
import { trustPages } from "@/lib/trust-pages";

const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.flatMap((locale) => trustPages.map((page) => ({ locale, info: page.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; info: string }> }): Promise<Metadata> {
  const { locale, info } = await params;
  const page = trustPages.find((item) => item.slug === info);
  if (!page || !locales.includes(locale as Locale)) return {};
  const typedLocale = locale as Locale;
  return {
    title: page.title[typedLocale],
    description: page.intro[typedLocale],
    alternates: { canonical: `/${locale}/${info}`, languages: localizedLanguageAlternates(`/${info}`) },
    openGraph: { type: "website", url: absoluteUrl(`/${locale}/${info}`), title: page.title[typedLocale], description: page.intro[typedLocale], locale: locale === "en" ? "en_HK" : "zh_HK" },
  };
}

export default async function InfoPage({ params }: { params: Promise<{ locale: string; info: string }> }) {
  const { locale: localeParam, info } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const page = trustPages.find((item) => item.slug === info);
  if (!page) notFound();
  return <main className="info-page">
    <SiteHeader locale={locale} alternatePath={`/${info}`} />
    <article className="shell info-shell">
      <Link className="event-detail-back" href={`/${locale}`}><ArrowLeft size={16} />{locale === "en" ? "Home" : "首頁"}</Link>
      <span className="events-eyebrow">Wellness Hub · {locale === "en" ? "Our approach" : "我哋嘅做法"}</span>
      <h1>{page.title[locale]}</h1>
      <p className="info-lead">{page.intro[locale]}</p>
      <div className="info-sections">{page.sections.map((section) => <section key={section.heading.en}><h2>{section.heading[locale]}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}</section>)}</div>
      {info === "contact" && <p><a href="mailto:wellnesshubhk@gmail.com">wellnesshubhk@gmail.com</a></p>}
      <nav className="info-related" aria-label={locale === "en" ? "Learn more" : "了解更多"}>{trustPages.filter((item) => item.slug !== info).map((item) => <Link href={`/${locale}/${item.slug}`} key={item.slug}>{item.title[locale]}</Link>)}</nav>
    </article>
    <SiteFooter locale={locale} />
  </main>;
}
