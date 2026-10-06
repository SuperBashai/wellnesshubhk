import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Map as MapIcon, Dumbbell, Flame, Leaf, MapPin, Phone, ShoppingBasket, Snowflake } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { VenueGallery, type VenuePhoto } from "@/components/venue-gallery";
import { GooglePlacePhoto } from "@/components/google-place-photo";
import { VenueReviews } from "@/components/venue-reviews";
import venueImages from "@/data/venue-images.json";
import { listingCategories } from "@/lib/listing-categories";
import { sports, listingSports } from "@/lib/sports";
import { categories, getListingBySlug, listingName, listingSlug, listings, territories, type CategoryId, type Locale } from "@/lib/data";
import { absoluteUrl, conciseDescription, defaultSocialImage, languageTag, localizedLanguageAlternates, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];
const categoryIcons = { movement: Dumbbell, recovery: Snowflake, sauna: Flame, food: Leaf, shops: ShoppingBasket };

function venueIntro(listing: NonNullable<ReturnType<typeof getListingBySlug>>, locale: Locale) {
  const area = listing.area[locale];
  const context: Record<CategoryId, string> = locale === "en" ? {
    movement: `It is one option to consider if you want to make movement part of your routine in ${area}.`,
    recovery: `It offers a focused place to pause and recover in ${area}.`,
    sauna: `It is a local option for slowing down with heat-based recovery in ${area}.`,
    food: `It is an easy option to keep in mind when you want to eat well around ${area}.`,
    shops: `It is a practical local stop for wellness essentials in ${area}.`,
  } : {
    movement: `如果你想喺${area}將運動融入日常，呢度係其中一個值得考慮嘅選擇。`,
    recovery: `想喺${area}停一停、集中恢復，可以由呢度開始了解。`,
    sauna: `想喺${area}用熱療放慢節奏、重新回復狀態，可以考慮呢個選擇。`,
    food: `想喺${area}食得好啲，呢度係一個方便記低嘅選擇。`,
    shops: `想喺${area}添置健康生活日用品，呢度係一個實用嘅本地選擇。`,
  };

  return `${listing.description[locale]} ${context[listing.category]}`;
}

const venueCopy = {
  en: {
    back: "Back to directory", verified: "Sources checked October 2026", visit: "Visit official website", overview: "Venue overview",
    about: "Plan your visit", aboutBody: "Check the location and facilities, then visit the official website for current opening hours, prices and bookings.",
    area: "Neighbourhood", address: "Address", hours: "Opening hours", phone: "Phone", hoursUnavailable: "Not published — check the official website before visiting.", phoneUnavailable: "Not published — contact via the official website.", territory: "Region", offers: "What you'll find", source: "Official source", sourceBody: "We link directly to the venue or public-facility source and do not invent ratings.",
    relatedEyebrow: "Keep exploring", relatedTitle: "More places in this category", view: "View venue", directory: "Browse all places",
  },
  "zh-hk": {
    back: "返回目錄", verified: "資料於2026年10月查閱", visit: "前往官方網站", overview: "場地簡介",
    about: "安排你嘅行程", aboutBody: "睇吓位置同設施，再到官方網站查閱最新開放時間、收費同預約詳情。",
    area: "地區", address: "地址", hours: "營業時間", phone: "電話", hoursUnavailable: "官方未有公布，出發前請查看官方網站。", phoneUnavailable: "官方未有公布，請經官方網站聯絡。", territory: "區域", offers: "場地特色", source: "官方資料來源", sourceBody: "我哋會直接連結場地或公共設施官方資料，亦唔會虛構評分。",
    relatedEyebrow: "繼續探索", relatedTitle: "同類型其他地方", view: "查看場地", directory: "瀏覽全部地方",
  },
} as const;

export function generateStaticParams() {
  return locales.flatMap((locale) => listings.map((listing) => ({ locale, slug: listingSlug(listing) })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = locales.includes(localeParam as Locale) ? localeParam as Locale : "en";
  const listing = getListingBySlug(slug);
  if (!listing) return {};
  const name = listingName(listing, locale);
  const area = listing.area[locale];
  const canonical = `/${locale}/venues/${slug}`;
  const title = locale === "en" ? `${name} - ${area}, Hong Kong` : `${name}｜${area}｜香港`;
  const description = conciseDescription(locale === "en"
    ? `${name} in ${area}, Hong Kong. ${listing.description.en} Find its address, opening hours, phone number and official website.`
    : `${name}位於${area}。${listing.description["zh-hk"]}查看地址、營業時間、電話及官方網站。`);
  const images = (venueImages as Record<string, VenuePhoto[]>)[slug]?.map((photo) => absoluteUrl(photo.url)) ?? [defaultSocialImage];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages: localizedLanguageAlternates(`/venues/${slug}`) },
    openGraph: { type: "website", url: canonical, siteName, title, description, locale: locale === "en" ? "en_HK" : "zh_HK", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function VenuePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const t = venueCopy[locale];
  const name = listingName(listing, locale);
  const venueCategories = categories.filter((item) => listingCategories(listing).includes(item.id));
  const photos = (venueImages as Record<string, VenuePhoto[]>)[slug] ?? [];
  const activities = listingSports(listing);
  const territory = territories.find((item) => item.id === listing.territory)!;
  const Icon = categoryIcons[listing.category as CategoryId];
  const canonicalUrl = absoluteUrl(`/${locale}/venues/${slug}`);
  const schemaType: Record<CategoryId, string> = { movement: "SportsActivityLocation", recovery: "HealthAndBeautyBusiness", sauna: "HealthAndBeautyBusiness", food: "Restaurant", shops: "Store" };
  const alternateName = listingName(listing, locale === "en" ? "zh-hk" : "en");
  const mapUrl = listing.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listingName(listing, "en")}, ${listing.address.en}, Hong Kong`)}` : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": schemaType[listing.category], "@id": `${canonicalUrl}#venue`, name, alternateName: alternateName !== name ? alternateName : undefined, url: canonicalUrl,
        description: listing.description[locale], telephone: listing.phone, image: photos.map((photo) => absoluteUrl(photo.url)),
        address: listing.address ? { "@type": "PostalAddress", streetAddress: listing.address[locale], addressLocality: listing.area[locale], addressRegion: "Hong Kong", addressCountry: "HK" } : undefined,
        areaServed: { "@type": "AdministrativeArea", name: "Hong Kong SAR" },
        inLanguage: languageTag(locale), mainEntityOfPage: canonicalUrl, hasMap: mapUrl,
        sameAs: [listing.url], keywords: listing.tags[locale].join(", "),
      },
      {
        "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: siteName, item: absoluteUrl(`/${locale}`) },
          { "@type": "ListItem", position: 2, name: locale === "en" ? "Venue directory" : "場地目錄", item: absoluteUrl(`/${locale}/places`) },
          { "@type": "ListItem", position: 3, name, item: canonicalUrl },
        ],
      },
    ],
  };
  const related = listings
    .filter((candidate) => listingCategories(candidate).some((id) => listingCategories(listing).includes(id)) && listingSlug(candidate) !== slug)
    .sort((a, b) => Number(b.territory === listing.territory) - Number(a.territory === listing.territory))
    .slice(0, 3);

  return (
    <><JsonLd data={jsonLd} /><main>
      <SiteHeader locale={locale} page="venue" alternatePath={`/venues/${slug}`} />
      <article className={`venue-page venue-${listing.category}`}>
        <header className="venue-hero">
          <div className="shell">
            <Link className="venue-back" href={`/${locale}/places`}><ArrowLeft size={16} />{t.back}</Link>
            <div className={`venue-hero-grid${photos.length ? " has-photos" : ""}`}>
              <div className="venue-title-block">
                <span className="eyebrow"><span />{venueCategories.map((item) => item.label[locale]).join(" · ")} · {listing.area[locale]}</span>
                <h1>{name}</h1>
                <p className="venue-intro">{venueIntro(listing, locale)}</p>
                <div className="venue-hero-actions">
                  <a href={listing.url} target="_blank" rel="noreferrer">{t.visit}<ArrowUpRight size={17} /></a>
                  {listing.address && <a className="venue-directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${listingName(listing, "en")}, ${listing.address.en}, Hong Kong`)}`} target="_blank" rel="noreferrer"><MapPin size={17} />{locale === "en" ? "Find on map" : "睇地圖"}</a>}
                  <span><Check size={15} />{t.verified}</span>
                </div>
              </div>
              {photos.length ? <VenueGallery photos={photos} locale={locale} /> : <GooglePlacePhoto slug={slug} locale={locale} category={listing.category} />}
            </div>
          </div>
        </header>

        <section className="venue-details section">
          <div className="shell venue-details-grid">
            <div className="venue-story">
              <p className="chapter">01 — {t.overview.toUpperCase()}</p>
              <h2>{t.about}</h2>
              <p>{t.aboutBody}</p>
              <div className="venue-source-note"><Check size={20} /><div><strong>{t.source}</strong><p>{t.sourceBody}</p><a href={listing.url} target="_blank" rel="noreferrer">{new URL(listing.url).hostname.replace("www.", "")}<ArrowUpRight size={14} /></a></div></div>
            </div>
            <aside className="venue-facts">
              {activities.length > 0 && <div><Dumbbell size={19} /><span><small>{locale === "en" ? "Sports & activities" : "運動項目"}</small><span className="venue-tag-list">{sports.filter((item) => activities.includes(item.id)).map((item) => <i key={item.id}>{item.label[locale]}</i>)}</span></span></div>}
              <div><MapPin size={19} /><span><small>{t.area}</small><strong>{listing.area[locale]}</strong></span></div>
              {listing.address && <div><ArrowRight size={19} /><span><small>{t.address}</small><strong>{listing.address[locale]}</strong></span></div>}
              <div><Clock3 size={19} /><span><small>{t.hours}</small><strong>{listing.openingHours?.[locale] ?? t.hoursUnavailable}</strong></span></div>
              <div><Phone size={19} /><span><small>{t.phone}</small>{listing.phone ? <a className="venue-phone" href={`tel:${listing.phone.replace(/[^+\d]/g, "")}`}>{listing.phone}</a> : <strong>{t.phoneUnavailable}</strong>}</span></div>
              <div><MapIcon size={19} /><span><small>{t.territory}</small><strong>{territory.label[locale]}</strong></span></div>
              <div className="venue-offers"><Icon size={19} /><span><small>{t.offers}</small><span className="venue-tag-list">{listing.tags[locale].map((tag) => <i key={tag}>{tag}</i>)}</span></span></div>
            </aside>
          </div>
        </section>

        <VenueReviews locale={locale} slug={slug} venueName={name} />

        <section className="venue-related section">
          <div className="shell">
            <div className="section-heading split-heading"><div><span className="eyebrow"><span />{t.relatedEyebrow}</span><h2>{t.relatedTitle}</h2></div><Link className="related-all" href={`/${locale}/places`}>{t.directory}<ArrowRight size={16} /></Link></div>
            <div className="related-list">{related.map((item, index) => <Link key={listingSlug(item)} href={`/${locale}/venues/${listingSlug(item)}`}><span>0{index + 1}</span><div><small>{item.area[locale]}</small><h3>{listingName(item, locale)}</h3><p>{item.description[locale]}</p></div><strong>{t.view}<ArrowUpRight size={16} /></strong></Link>)}</div>
          </div>
        </section>
      </article>
      <SiteFooter locale={locale} />
    </main></>
  );
}
