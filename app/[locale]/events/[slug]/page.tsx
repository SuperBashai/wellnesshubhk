import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/data";
import { eventImageAlts, eventImages, wellnessEvents } from "@/lib/events";
import { absoluteUrl, languageTag, localizedLanguageAlternates, siteName } from "@/lib/seo";

export const revalidate = 3600;
const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.flatMap((locale) => wellnessEvents.map((event) => ({ locale, slug: event.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = wellnessEvents.find((item) => item.slug === slug);
  if (!event || !locales.includes(locale as Locale)) return {};
  const typedLocale = locale as Locale;
  const path = `/events/${slug}`;
  const title = `${event.title[typedLocale]} | ${event.dateLabel[typedLocale]}`;
  const description = `${event.description[typedLocale]} ${event.location[typedLocale]}.`;
  const image = absoluteUrl(eventImages[slug]);
  const ended = (event.endDate ?? event.startDate).slice(0, 10) < new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return {
    title, description,
    alternates: { canonical: `/${locale}${path}`, languages: localizedLanguageAlternates(path) },
    robots: ended ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: "website", url: `/${locale}${path}`, siteName, title, description, locale: locale === "en" ? "en_HK" : "zh_HK", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const event = wellnessEvents.find((item) => item.slug === slug);
  if (!event) notFound();

  const pageUrl = absoluteUrl(`/${locale}/events/${slug}`);
  const isEnglish = locale === "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event", "@id": `${pageUrl}#event`, url: pageUrl,
        name: event.title[locale], description: event.description[locale],
        startDate: event.startDate, ...(event.endDate ? { endDate: event.endDate } : {}),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [absoluteUrl(eventImages[slug])],
        location: { "@type": "Place", name: event.location[locale], address: { "@type": "PostalAddress", ...(event.address ? { streetAddress: event.address[locale] } : {}), addressRegion: "Hong Kong", addressCountry: "HK" } },
        organizer: { "@type": "Organization", name: event.organizer[locale], url: event.url[locale] },
        ...(event.price !== undefined ? { offers: { "@type": "Offer", url: event.url[locale], price: event.price, priceCurrency: "HKD" } } : {}),
        inLanguage: languageTag(locale), mainEntityOfPage: pageUrl,
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: isEnglish ? "Events" : "健康活動", item: absoluteUrl(`/${locale}/events`) },
          { "@type": "ListItem", position: 3, name: event.title[locale], item: pageUrl },
        ],
      },
    ],
  };

  return <><JsonLd data={jsonLd} /><main className="event-detail-page">
    <SiteHeader locale={locale} alternatePath={`/events/${slug}`} />
    <div className="shell event-detail-shell">
      <Link className="event-detail-back" href={`/${locale}/events`}><ArrowLeft size={16} />{isEnglish ? "All events" : "全部活動"}</Link>
      <div className="event-detail-grid">
        <div className="event-detail-copy">
          <span className="events-eyebrow">{event.category[locale]} · {isEnglish ? "Hong Kong wellness event" : "香港健康活動"}</span>
          <h1>{event.title[locale]}</h1>
          <p className="event-detail-intro">{event.description[locale]}</p>
          <div className="event-detail-facts">
            <div><CalendarDays size={19} /><span><small>{isEnglish ? "Date" : "日期"}</small>{event.dateLabel[locale]}</span></div>
            <div><Clock3 size={19} /><span><small>{isEnglish ? "Time" : "時間"}</small>{event.time[locale]}</span></div>
            <div><MapPin size={19} /><span><small>{isEnglish ? "Place" : "地點"}</small>{event.location[locale]}</span></div>
            {event.price !== undefined && <div><span className="event-detail-price-mark">HK$</span><span><small>{isEnglish ? "Published price" : "公布收費"}</small>{event.price === 0 ? (isEnglish ? "Free admission" : "免費入場") : `HK$${event.price.toLocaleString("en-HK")}`}</span></div>}
          </div>
          <p className="event-detail-organizer">{isEnglish ? "Organised by" : "主辦單位"} <strong>{event.organizer[locale]}</strong></p>
          <p className="event-detail-status">{event.status[locale]}</p>
          <a className="event-detail-cta" href={event.url[locale]} target="_blank" rel="noreferrer">{isEnglish ? "Check details and booking with the organiser" : "向主辦方查看詳情及報名"}<ArrowUpRight size={18} /></a>
          <p className="event-detail-note">{isEnglish ? "Schedules, prices and availability can change. Please confirm directly with the organiser before booking or travelling." : "時間、收費及名額可能有變；報名或出發前請先向主辦方確認。"}</p>
        </div>
        <figure className="event-detail-media"><Image src={eventImages[slug]} alt={eventImageAlts[slug]?.[locale] ?? event.title[locale]} fill priority sizes="(max-width: 800px) 100vw, 42vw" /></figure>
      </div>
    </div>
    <SiteFooter locale={locale} />
  </main></>;
}
