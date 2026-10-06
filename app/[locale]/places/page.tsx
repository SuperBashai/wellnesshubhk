import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { VenueDirectory } from "@/components/venue-directory";
import { categories, copy, listingName, listingSlug, listings, territories, type Locale } from "@/lib/data";
import { listingCategories } from "@/lib/listing-categories";
import { absoluteUrl, defaultSocialImage, localizedLanguageAlternates } from "@/lib/seo";
import venueImages from "@/data/venue-images.json";

type DirectorySearchParams = { category?: string; territory?: string; q?: string };

export async function generateMetadata({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<DirectorySearchParams> }): Promise<Metadata> {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);
  const typedLocale = locale === "zh-hk" ? "zh-hk" : "en";
  const category = categories.find((item) => item.id === filters.category);
  const territory = territories.find((item) => item.id === filters.territory);
  const title = typedLocale === "en"
    ? category && territory
      ? `${category.label.en} in ${territory.label.en}, Hong Kong`
      : category
        ? `${category.label.en} in Hong Kong`
        : territory
          ? `Wellness venues in ${territory.label.en}, Hong Kong`
          : "Hong Kong wellness venues"
    : category && territory
      ? `${territory.label["zh-hk"]}${category.label["zh-hk"]}｜香港`
      : category
        ? `香港${category.label["zh-hk"]}場地`
        : territory
          ? `${territory.label["zh-hk"]}健康生活場地`
          : "香港健康生活場地";
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
    alternates: { canonical, languages: localizedLanguageAlternates(`/places${suffix}`) },
    robots: filters.q || (category && territory) ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: "website", url: canonical, title, description, locale: typedLocale === "en" ? "en_HK" : "zh_HK", images: [defaultSocialImage] },
    twitter: { card: "summary_large_image", title, description, images: [defaultSocialImage] },
  };
}
export default async function PlacesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<DirectorySearchParams> }) {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);
  if (locale !== "en" && locale !== "zh-hk") notFound();
  const selectedCategory = categories.find(item => item.id === filters.category);
  const selectedTerritory = territories.find(item => item.id === filters.territory);
  const category = selectedCategory?.id ?? "all";
  const territory = selectedTerritory?.id ?? "all";
  const query = typeof filters.q === "string" ? filters.q : "";
  const covers = Object.fromEntries(Object.entries(venueImages).map(([slug, photos]) => [slug, photos[0].url]));
  const visibleListings = listings.filter((listing) => (category === "all" || listingCategories(listing).includes(category)) && (territory === "all" || listing.territory === territory));
  const structuredQuery = new URLSearchParams();
  if (category !== "all") structuredQuery.set("category", category);
  if (territory !== "all") structuredQuery.set("territory", territory);
  const pageUrl = absoluteUrl(`/${locale}/places${structuredQuery.size ? `?${structuredQuery.toString()}` : ""}`);
  const heading = locale === "en"
    ? selectedCategory && selectedTerritory
      ? `${selectedCategory.label.en} in ${selectedTerritory.label.en}`
      : selectedCategory
        ? `${selectedCategory.label.en} in Hong Kong`
        : selectedTerritory
          ? `Wellness venues in ${selectedTerritory.label.en}`
          : "Places worth knowing"
    : selectedCategory && selectedTerritory
      ? `${selectedTerritory.label["zh-hk"]}${selectedCategory.label["zh-hk"]}`
      : selectedCategory
        ? `香港${selectedCategory.label["zh-hk"]}場地`
        : selectedTerritory
          ? `${selectedTerritory.label["zh-hk"]}健康生活場地`
          : copy[locale].featuredTitle;
  const intro = locale === "en"
    ? `Browse verified ${selectedCategory ? selectedCategory.label.en.toLowerCase() : "wellness"} venues${selectedTerritory ? ` in ${selectedTerritory.label.en}` : " across Hong Kong"}, with addresses and official contact details where published.`
    : `瀏覽${selectedTerritory ? selectedTerritory.label["zh-hk"] : "全香港"}${selectedCategory ? selectedCategory.label["zh-hk"] : "健康生活"}場地，查看已公開地址及官方聯絡資料。`;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${pageUrl}#collection`, url: pageUrl,
    name: heading,
    description: intro,
    inLanguage: locale === "en" ? "en-HK" : "zh-HK",
    mainEntity: { "@type": "ItemList", numberOfItems: visibleListings.length, itemListElement: visibleListings.slice(0, 100).map((listing, index) => ({ "@type": "ListItem", position: index + 1, name: listingName(listing, locale as Locale), url: absoluteUrl(`/${locale}/venues/${listingSlug(listing)}`) })) },
  };
  return <><JsonLd data={jsonLd} /><VenueDirectory key={JSON.stringify([locale, category, territory, query])} locale={locale as Locale} covers={covers} initialCategory={category} initialTerritory={territory} initialQuery={query} heading={heading} intro={intro} /></>;
}
