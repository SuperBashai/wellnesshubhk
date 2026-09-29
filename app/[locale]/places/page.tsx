import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { VenueDirectory } from "@/components/venue-directory";
import { categories, listingName, listingSlug, listings, territories, type Locale } from "@/lib/data";
import { listingCategories } from "@/lib/listing-categories";
import { absoluteUrl, defaultSocialImage } from "@/lib/seo";
import venueImages from "@/data/venue-images.json";

type DirectorySearchParams = { category?: string; territory?: string; q?: string };

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<DirectorySearchParams> }): Promise<Metadata> {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);
  const typedLocale = locale === "zh-hk" ? "zh-hk" : "en";
  const category = categories.find((item) => item.id === filters.category);
  const territory = territories.find((item) => item.id === filters.territory);
  const label = [category?.label[typedLocale], territory?.label[typedLocale]].filter(Boolean).join(" — ");
  const title = typedLocale === "en" ? `${label ? `${label} | ` : ""}Hong Kong wellness venues` : `${label ? `${label}｜` : ""}香港健康生活場地`;
  const description = typedLocale === "en"
    ? `Find ${category ? category.label.en.toLowerCase() : "sports, recovery, healthy dining and wellness"} venues${territory ? ` in ${territory.label.en}` : " across Hong Kong"}, with addresses and official contact details.`
    : `搜尋${territory ? territory.label["zh-hk"] : "全香港"}${category ? category.label["zh-hk"] : "運動、恢復、健康飲食及健康生活"}場地，查看地址及官方聯絡資料。`;
  const query = new URLSearchParams();
  if (category) query.set("category", category.id);
  if (territory) query.set("territory", territory.id);
  const suffix = query.size ? `?${query.toString()}` : "";
  const canonical = `/${locale}/places${suffix}`;
  return {
    title, description,
    alternates: { canonical, languages: { en: `/en/places${suffix}`, "zh-HK": `/zh-hk/places${suffix}`, "x-default": `/en/places${suffix}` } },
    robots: filters.q ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: "website", url: canonical, title, description, locale: typedLocale === "en" ? "en_HK" : "zh_HK", images: [defaultSocialImage] },
    twitter: { card: "summary_large_image", title, description, images: [defaultSocialImage] },
  };
}
export default async function PlacesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<DirectorySearchParams> }) {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);
  if (locale !== "en" && locale !== "zh-hk") notFound();
  const category = categories.find(item => item.id === filters.category)?.id ?? "all";
  const territory = territories.find(item => item.id === filters.territory)?.id ?? "all";
  const query = typeof filters.q === "string" ? filters.q : "";
  const covers = Object.fromEntries(Object.entries(venueImages).map(([slug, photos]) => [slug, photos[0].url]));
  const visibleListings = listings.filter((listing) => (category === "all" || listingCategories(listing).includes(category)) && (territory === "all" || listing.territory === territory));
  const structuredQuery = new URLSearchParams();
  if (category !== "all") structuredQuery.set("category", category);
  if (territory !== "all") structuredQuery.set("territory", territory);
  const pageUrl = absoluteUrl(`/${locale}/places${structuredQuery.size ? `?${structuredQuery.toString()}` : ""}`);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#collection`, url: pageUrl,
    name: locale === "en" ? "Hong Kong wellness venue directory" : "香港健康生活場地目錄",
    description: locale === "en" ? "A bilingual directory of wellness venues across Hong Kong." : "全香港健康生活場地雙語目錄。",
    inLanguage: locale === "en" ? "en-HK" : "zh-HK",
    mainEntity: { "@type": "ItemList", numberOfItems: visibleListings.length, itemListElement: visibleListings.slice(0, 100).map((listing, index) => ({ "@type": "ListItem", position: index + 1, name: listingName(listing, locale as Locale), url: absoluteUrl(`/${locale}/venues/${listingSlug(listing)}`) })) },
  };
  return <><JsonLd data={jsonLd} /><VenueDirectory key={JSON.stringify([locale, category, territory, query])} locale={locale as Locale} covers={covers} initialCategory={category} initialTerritory={territory} initialQuery={query} /></>;
}
