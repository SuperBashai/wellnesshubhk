import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MapPin, TrainFront } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import venueImages from "@/data/venue-images.json";
import { areaHubs } from "@/lib/area-hubs";
import { categories, listingName, listingSlug, listings, type Locale } from "@/lib/data";
import { listingCategories } from "@/lib/listing-categories";
import { absoluteUrl, localizedLanguageAlternates, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];
const photos = venueImages as Record<string, { url: string; alt: Record<Locale, string> }[]>;

export function generateStaticParams() {
  return locales.flatMap((locale) => areaHubs.map((area) => ({ locale, slug: area.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = areaHubs.find((item) => item.slug === slug);
  if (!area || !locales.includes(locale as Locale)) return {};
  const typedLocale = locale as Locale;
  const title = typedLocale === "en" ? `Wellness in ${area.name.en}, Hong Kong | ${siteName}` : `${area.name["zh-hk"]}健康生活好去處 | ${siteName}`;
  return {
    title, description: area.intro[typedLocale],
    alternates: { canonical: `/${locale}/areas/${slug}`, languages: localizedLanguageAlternates(`/areas/${slug}`) },
    openGraph: { type: "website", url: absoluteUrl(`/${locale}/areas/${slug}`), title, description: area.intro[typedLocale], locale: locale === "en" ? "en_HK" : "zh_HK" },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: localeParam, slug } = await params;
  if (!locales.includes(localeParam as Locale)) notFound();
  const locale = localeParam as Locale;
  const area = areaHubs.find((item) => item.slug === slug);
  if (!area) notFound();
  const localListings = listings.filter((listing) => listing.area.en === area.name.en);
  if (localListings.length < 3) notFound();
  const counts = categories.map((category) => ({ category, count: localListings.filter((listing) => listingCategories(listing).includes(category.id)).length })).filter((item) => item.count > 0);
  const displayed = [...localListings].sort((left, right) => Number(Boolean(photos[listingSlug(right)])) - Number(Boolean(photos[listingSlug(left)]))).slice(0, 18);
  const areaQuery = encodeURIComponent(area.name.en);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${areaQuery}%2C%20Hong%20Kong`;
  return <main className="area-hub-page">
    <SiteHeader locale={locale} alternatePath={`/areas/${slug}`} />
    <div className="shell area-hub-shell">
      <Link className="event-detail-back" href={`/${locale}#areas`}><ArrowLeft size={16} />{locale === "en" ? "Explore areas" : "探索地區"}</Link>
      <header className="area-hub-heading"><span className="events-eyebrow">{locale === "en" ? "Wellness, neighbourhood by neighbourhood" : "按社區探索健康生活"}</span><h1>{locale === "en" ? `Wellness in ${area.name.en}.` : `${area.name["zh-hk"]}健康生活好去處。`}</h1><p>{area.intro[locale]}</p></header>
      <div className="area-hub-facts"><div><TrainFront size={20} /><span><small>{locale === "en" ? "Nearby MTR" : "附近港鐵站"}</small>{area.mtr[locale]}</span></div><a href={mapUrl} target="_blank" rel="noreferrer"><MapPin size={20} /><span>{locale === "en" ? "View neighbourhood map" : "睇社區地圖"}</span><ArrowUpRight size={15} /></a><div><strong>{localListings.length}</strong><span>{locale === "en" ? "listed places" : "個已收錄地點"}</span></div></div>
      <section className="area-hub-categories" aria-label={locale === "en" ? "Activities in this area" : "區內活動"}>{counts.map(({ category, count }) => <span key={category.id}>{category.label[locale]} <strong>{count}</strong></span>)}</section>
      <section className="area-hub-places"><div className="area-hub-section-title"><div><span className="events-eyebrow">{locale === "en" ? "Explore locally" : "就近探索"}</span><h2>{locale === "en" ? `Places in ${area.name.en}` : `${area.name["zh-hk"]}嘅好去處`}</h2></div><p>{area.note[locale]}</p></div><div className="area-hub-grid">{displayed.map((listing) => { const venueSlug = listingSlug(listing); const photo = photos[venueSlug]?.[0]; return <Link className="area-hub-card" href={`/${locale}/venues/${venueSlug}`} key={venueSlug}>{photo ? <div className="area-hub-card-image"><Image src={photo.url} alt={photo.alt[locale]} fill sizes="(max-width: 700px) 100vw, 33vw" /></div> : <div className="area-hub-card-image area-hub-card-empty" aria-hidden="true" />}<span>{categories.find((item) => item.id === listing.category)?.label[locale]}</span><h3>{listingName(listing, locale)}</h3><p>{listing.description[locale]}</p><small>{locale === "en" ? "View venue" : "查看場地"}<ArrowUpRight size={15} /></small></Link>; })}</div>{localListings.length > displayed.length && <Link className="area-hub-more" href={`/${locale}/places?q=${areaQuery}`}>{locale === "en" ? `See more places in ${area.name.en}` : `睇更多${area.name["zh-hk"]}場地`}<ArrowUpRight size={17} /></Link>}</section>
    </div>
    <SiteFooter locale={locale} />
  </main>;
}
