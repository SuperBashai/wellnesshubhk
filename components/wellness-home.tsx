import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Dumbbell, Flame, Leaf, ShoppingBasket, Snowflake } from "lucide-react";
import { categories, copy, listingName, listingSlug, listings, territories, type Locale } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSearch } from "@/components/hero-search";
import { HomeVenueCarousel } from "@/components/home-venue-carousel";
import venueImages from "@/data/venue-images.json";
import { eventImages, wellnessEvents } from "@/lib/events";
const categoryIcons = { movement: Dumbbell, recovery: Snowflake, sauna: Flame, food: Leaf, shops: ShoppingBasket };
const territoryMapLabels = {
  island: { en: "HK Island", "zh-hk": "香港島" },
  kowloon: { en: "Kowloon", "zh-hk": "九龍" },
  "new-territories": { en: "New Territories", "zh-hk": "新界及離島" },
} as const;
const homeVisuals = [
  {
    slug: "dink-city",
    category: { en: "Move", "zh-hk": "運動" },
    name: "Dink City",
    image: "/venue-images/dink-city-1-7e1417ab67.webp",
    credit: "Dink City",
    alt: { en: "Indoor pickleball courts at Dink City", "zh-hk": "Dink City 室內匹克球場" },
  },
  {
    slug: "the-ice-bath-club-kennedy-town",
    category: { en: "Recover", "zh-hk": "恢復" },
    name: "The Ice Bath Club",
    image: "/venue-images/the-ice-bath-club-kennedy-town-1-c956275b89.webp",
    credit: "The Ice Bath Club",
    alt: { en: "Cold-plunge space at The Ice Bath Club", "zh-hk": "The Ice Bath Club 冰浴恢復空間" },
  },
  {
    slug: "the-clubhouse-recharge-suite",
    category: { en: "Reset", "zh-hk": "放鬆" },
    name: "The Clubhouse",
    image: "/venue-images/the-clubhouse-recharge-suite-1-1890cf0218.webp",
    credit: "The Clubhouse Hong Kong",
    alt: { en: "The Clubhouse Recharge Suite", "zh-hk": "The Clubhouse Recharge Suite 恢復空間" },
  },
  {
    slug: "treehouse-central",
    category: { en: "Eat well", "zh-hk": "食得好" },
    name: "TREEHOUSE",
    image: "/venue-images/treehouse-central-1-70398703dd.webp",
    credit: "TREEHOUSE",
    alt: { en: "Plant-based dining at TREEHOUSE", "zh-hk": "TREEHOUSE 植物為本餐飲" },
  },
] as const;

export function WellnessHome({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const extraVenues = ["the-ceremony", "united-services-recreation-club", "kinship", "golfzon-causeway-bay", "ikigai-causeway-bay", "go-park-sai-sha", "the-player-climbingym", "asap"];
  const rotatingVenues = [
    ...homeVisuals.map((item) => ({ ...item, category: item.category[locale], alt: item.alt[locale] })),
    ...extraVenues.flatMap((slug) => {
      const listing = listings.find((item) => listingSlug(item) === slug);
      const photo = (venueImages as Record<string, { url: string; alt: Record<Locale, string>; credit: string }[]>)[slug]?.[0];
      return listing && photo ? [{ slug, name: listingName(listing, locale), category: categories.find((item) => item.id === listing.category)!.label[locale], image: photo.url, alt: photo.alt[locale], credit: photo.credit }] : [];
    }),
  ];
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const upcomingEvents = wellnessEvents.filter((event) => (event.endDate ?? event.startDate).slice(0, 10) >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 3);
  const searchSuggestions = listings.map((listing) => ({
    name: listingName(listing, locale),
    area: listing.area[locale],
    category: categories.find((category) => category.id === listing.category)?.label[locale] ?? "",
    href: `/${locale}/venues/${listingSlug(listing)}`,
    searchText: [listingName(listing, "en"), listingName(listing, "zh-hk"), listing.area.en, listing.area["zh-hk"], ...listing.tags.en, ...listing.tags["zh-hk"]].join(" "),
  }));
  return (
    <main>
      <SiteHeader locale={locale} />
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span />{t.heroEyebrow}</span>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroBody}</p>
            <HeroSearch
              locale={locale}
              suggestions={searchSuggestions}
              territories={territories.map((item) => ({ id: item.id, label: item.label[locale] }))}
              labels={{ placeholder: t.searchPlaceholder, allAreas: t.allAreas, submit: t.search, suggestions: locale === "en" ? "Venue suggestions" : "場地建議", viewAll: locale === "en" ? "Search the full directory" : "搜尋完整目錄" }}
            />
            <a className="hero-scroll" href="#discover"><ArrowDown size={16} />{t.browseEyebrow}</a>
          </div>
          <div className="hero-image-wrap">
            <Image className="hero-image" src="/well-hk-hero.png" alt={locale === "en" ? "Morning wellness terrace overlooking Hong Kong" : "俯瞰香港景色嘅晨早健康生活空間"} fill priority sizes="(max-width: 800px) 100vw, 48vw" />
            <div className="image-note"><span>22.3193° N</span><span>{locale === "en" ? "Hong Kong SAR" : "香港特別行政區"}</span></div>
          </div>
        </div>
      </section>

      <section className="section browse-section" id="discover">
        <div className="shell">
          <div className="section-heading split-heading"><div><span className="eyebrow"><span />{t.browseEyebrow}</span><h2>{t.browseTitle}</h2></div><p>{t.browseBody}</p></div>
          <div className="category-rail">
            {categories.map((item, index) => {
              const Icon = categoryIcons[item.id];
              return <Link key={item.id} href={`/${locale}/places?category=${item.id}`}><span className="category-number">0{index + 1}</span><Icon size={25} strokeWidth={1.6} /><strong>{item.label[locale]}</strong><small>{item.detail[locale]}</small><ArrowUpRight className="category-arrow" size={18} /></Link>;
            })}
          </div>
        </div>
      </section>

      <section className="section home-visual-section" aria-labelledby="home-visual-title">
        <div className="shell">
          <div className="home-visual-heading">
            <div><span className="eyebrow"><span />{locale === "en" ? "Inside Wellness Hub" : "走入 Wellness Hub"}</span><h2 id="home-visual-title">{locale === "en" ? "See what feeling good can look like." : "睇吓好好生活，可以係點樣。"}</h2></div>
            <p>{locale === "en" ? "A visual glimpse of places to move, recover and eat well around the city." : "用相片探索城中運動、恢復同健康飲食空間。"}</p>
          </div>
          <HomeVenueCarousel venues={rotatingVenues} locale={locale} />
        </div>
      </section>

      <section className="section home-events" aria-labelledby="home-events-title">
        <div className="shell">
          <div className="home-events-heading"><div><span className="eyebrow"><span />{locale === "en" ? "Make a plan" : "約定一齊出發"}</span><h2 id="home-events-title">{locale === "en" ? "What's on around Hong Kong." : "香港有咩好活動？"}</h2><p>{locale === "en" ? "A few dates for your diary. Move, unwind and meet your community." : "記低幾個好日子，一齊郁動、放鬆，認識同路人。"}</p></div><Link href={`/${locale}/events`}>{locale === "en" ? "All events" : "全部活動"}<ArrowUpRight size={19} /></Link></div>
          <div className="home-events-grid">
            {upcomingEvents.map((event) => <article className="home-event-card" key={event.slug}>
              <Link href={`/${locale}/events#${event.slug}`} className="home-event-photo"><Image src={eventImages[event.slug]} alt={event.title[locale]} fill sizes="(max-width: 780px) 100vw, 33vw" /><span>{event.day} {event.month[locale]}</span></Link>
              <div className="home-event-body"><small>{event.category[locale]}</small><h3><Link href={`/${locale}/events#${event.slug}`}>{event.title[locale]}</Link></h3><p>{event.location[locale]}</p><span>{event.time[locale]}</span><Link className="home-event-details" href={`/${locale}/events#${event.slug}`}>{locale === "en" ? "Event details" : "活動詳情"}<ArrowUpRight size={17} /></Link></div>
            </article>)}
          </div>
          {upcomingEvents.length === 0 && <p>{locale === "en" ? "New dates are on the way. Explore the calendar for more." : "新活動即將公布，歡迎查看活動日曆。"}</p>}
        </div>
      </section>

      <section className="section area-section" id="areas">
        <div className="shell">
          <div className="section-heading"><span className="eyebrow light"><span />{t.areasEyebrow}</span><h2>{t.areasTitle}</h2></div>
          <div className="area-layout">
            <figure className="area-map">
              <div className="area-map-canvas">
                {/* Wikimedia Commons map, attributed in the caption below. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hong-kong-districts-map.svg" alt={locale === "en" ? "Map of Hong Kong's 18 districts" : "香港十八區地圖"} />
                {territories.map((item) => (
                  <Link
                    className={`area-map-link area-map-link--${item.id}`}
                    href={`/${locale}/places?territory=${item.id}`}
                    key={item.id}
                    aria-label={locale === "en" ? `Explore wellness places in ${item.label.en}` : `探索${item.label["zh-hk"]}健康生活地點`}
                  >
                    {territoryMapLabels[item.id][locale]}<ArrowUpRight size={14} />
                  </Link>
                ))}
              </div>
              <figcaption>
                <span>{locale === "en" ? "Hong Kong's 18 districts" : "香港十八區"}</span>
                <span aria-hidden="true">·</span>
                <a href="https://commons.wikimedia.org/wiki/File:Hong_Kong_18_Districts_Blank_Map.svg" target="_blank" rel="noreferrer">{locale === "en" ? "Map: wahaha2005 / Wikimedia Commons" : "地圖：wahaha2005 / Wikimedia Commons"}</a>
                <span aria-hidden="true">·</span>
                <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a>
              </figcaption>
            </figure>
            <div className="area-list">
              {territories.map((item, index) => <Link key={item.id} href={`/${locale}/places?territory=${item.id}`}><span>0{index + 1}</span><div><strong>{item.label[locale]}</strong><small>{item.areas[locale]}</small></div><ArrowUpRight size={24} /></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-teaser"><div className="shell"><span className="eyebrow">{t.guideEyebrow}</span><h2>{t.guideTitle}</h2><Link href={`/${locale}/editorial`}>{t.guideCta}<ArrowUpRight size={22} /></Link></div></section>

      <section className="trust-section"><div className="shell trust-grid"><span className="trust-mark">✓</span><h2>{t.trustTitle}</h2><p>{t.trustBody}</p></div></section>
      <SiteFooter locale={locale} />
    </main>
  );
}
