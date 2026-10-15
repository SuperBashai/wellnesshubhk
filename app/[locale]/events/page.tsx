import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/data";
import { eventImages, eventMonths, wellnessEvents } from "@/lib/events";
import { absoluteUrl, localizedLanguageAlternates, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];
const heroImage = "/editorial-walk-without-tracking.jpg";

const pageCopy = {
  en: {
    eyebrow: "HONG KONG WELLNESS CALENDAR",
    title: "Good things are happening all over Hong Kong.",
    intro: "Runs, movement sessions, mindfulness workshops and community days—one calm place to see what is coming up and make a plan.",
    jump: "See upcoming events",
    count: `${wellnessEvents.length} verified events`,
    updated: "Updated 12 October 2026",
    next: "Next up",
    upcoming: "Upcoming in Hong Kong",
    upcomingIntro: "Listed in date order and checked against organiser information. Availability can change, so always confirm before you go.",
    eventDetails: "Official event details",
    hostedBy: "Hosted by",
    noteTitle: "A useful heads-up",
    note: "Wellness Hub lists events independently and does not organise or endorse them. Dates, routes, capacity and registration status can change. Please check the organiser’s page before booking or travelling.",
    directory: "Find places to train",
    imageAlt: "People walking together beside Victoria Harbour in Hong Kong",
  },
  "zh-hk": {
    eyebrow: "香港健康活動日曆",
    title: "香港各區，都有健康好活動發生。",
    intro: "跑步、運動體驗、靜觀工作坊同社區活動，一個清爽好用嘅日曆，幫你睇清楚有咩新鮮事，約定時間出發。",
    jump: "睇即將舉行活動",
    count: `${wellnessEvents.length} 個已核實活動`,
    updated: "2026年10月12日更新",
    next: "下一個活動",
    upcoming: "香港即將舉行",
    upcomingIntro: "按日期排列，並根據主辦方資料核對。名額及安排可能有變，出發前記得再確認。",
    eventDetails: "查看官方活動詳情",
    hostedBy: "主辦單位",
    noteTitle: "出發前提提你",
    note: "Wellness Hub 獨立整理活動資料，並非活動主辦或認可機構。日期、路線、名額及報名狀況可能有變，報名或出發前請先查閱主辦方最新公布。",
    directory: "搵地方練習",
    imageAlt: "一班人喺香港維港旁邊一齊散步",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const chinese = locale === "zh-hk";
  const title = chinese ? "香港健康活動日曆 — 跑步、運動與身心工作坊" : "Hong Kong Wellness Events — Runs, Workshops & Community Days";
  const description = chinese ? pageCopy["zh-hk"].intro : pageCopy.en.intro;
  const socialImage = absoluteUrl(heroImage);
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/events`, languages: localizedLanguageAlternates("/events") },
    openGraph: { type: "website", url: `/${locale}/events`, siteName, title, description, locale: chinese ? "zh_HK" : "en_HK", images: [socialImage] },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const t = pageCopy[locale];
  const firstEvent = wellnessEvents[0];
  const pageUrl = absoluteUrl(`/${locale}/events`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: t.title,
    description: t.intro,
    inLanguage: locale === "en" ? "en-HK" : "zh-HK",
    isPartOf: { "@type": "WebSite", name: siteName, url: absoluteUrl(`/${locale}`) },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: wellnessEvents.length,
      itemListElement: wellnessEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Event",
          name: event.title[locale],
          description: event.description[locale],
          startDate: event.startDate,
          ...(event.endDate ? { endDate: event.endDate } : {}),
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: { "@type": "Place", name: event.location[locale], address: { "@type": "PostalAddress", addressRegion: "Hong Kong", addressCountry: "HK" } },
          organizer: { "@type": "Organization", name: event.organizer[locale], url: event.url[locale] },
          image: absoluteUrl(eventImages[event.slug]),
          url: event.url[locale],
        },
      })),
    },
  };

  return (
    <><JsonLd data={jsonLd} /><main className="events-page">
      <SiteHeader locale={locale} alternatePath="/events" />
      <header className="events-hero">
        <div className="shell events-hero-grid">
          <div className="events-hero-copy">
            <span className="events-eyebrow">{t.eyebrow}</span>
            <h1>{t.title}</h1>
            <p>{t.intro}</p>
            <div className="events-hero-actions">
              <Link className="events-primary-link" href="#upcoming">{t.jump}<ArrowDown size={17} /></Link>
              <span>{t.count}<small>{t.updated}</small></span>
            </div>
          </div>
          <div className="events-hero-media">
            <Image src={heroImage} alt={t.imageAlt} fill priority sizes="(max-width: 780px) 100vw, 44vw" />
            <span>{locale === "en" ? "Move together / Hong Kong" : "一齊郁動 / 香港"}</span>
          </div>
        </div>
      </header>

      <section className="events-next" aria-label={t.next}>
        <div className="shell events-next-grid">
          <span>{t.next}</span>
          <div className="events-next-date"><strong>{firstEvent.day}</strong><small>{firstEvent.month[locale]}</small></div>
          <div><p>{firstEvent.category[locale]}</p><h2>{firstEvent.title[locale]}</h2><span><MapPin size={14} />{firstEvent.location[locale]}</span></div>
          <a href={firstEvent.url[locale]} target="_blank" rel="noreferrer" aria-label={`${t.eventDetails}: ${firstEvent.title[locale]}`}><ArrowUpRight size={23} /></a>
        </div>
      </section>

      <section className="events-calendar section" id="upcoming">
        <div className="shell">
          <div className="events-section-heading">
            <div><span>{t.eyebrow}</span><h2>{t.upcoming}</h2></div>
            <p>{t.upcomingIntro}</p>
          </div>
          {eventMonths.map((month) => <section className="events-month" key={month.monthKey}>
            <div className="events-month-heading"><h3>{month.heading[locale]}</h3><span>{String(month.events.length).padStart(2, "0")}</span></div>
            <div className="events-list">
              {month.events.map((event) => <article className="event-row" id={event.slug} key={event.slug}>
                <div className="event-date"><strong>{event.day}</strong><span>{event.month[locale]}</span></div>
                <div className="event-image"><Image src={eventImages[event.slug]} alt={event.title[locale]} fill sizes="(max-width: 780px) 75vw, (max-width: 980px) 180px, 220px" /></div>
                <div className="event-main">
                  <div className="event-labels"><span>{event.category[locale]}</span><span>{event.status[locale]}</span></div>
                  <h4>{event.title[locale]}</h4>
                  <p>{event.description[locale]}</p>
                  <div className="event-facts">
                    <span><CalendarDays size={15} />{event.dateLabel[locale]}</span>
                    <span><Clock3 size={15} />{event.time[locale]}</span>
                    <span><MapPin size={15} />{event.location[locale]}</span>
                  </div>
                  <small>{t.hostedBy}: {event.organizer[locale]}</small>
                </div>
                <a className="event-link" href={event.url[locale]} target="_blank" rel="noreferrer"><span>{t.eventDetails}</span><ArrowUpRight size={19} /></a>
              </article>)}
            </div>
          </section>)}
          <div className="events-note">
            <div><span>{t.noteTitle}</span><p>{t.note}</p></div>
            <Link href={`/${locale}/places`}>{t.directory}<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      <SiteFooter locale={locale} />
    </main></>
  );
}
