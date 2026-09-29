import { notFound } from "next/navigation";
import { VenueDirectory } from "@/components/venue-directory";
import { categories, territories, type Locale } from "@/lib/data";
import venueImages from "@/data/venue-images.json";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "en" ? "Venue directory" : "場地目錄" };
}
export default async function PlacesPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ category?: string; territory?: string; q?: string }> }) {
  const [{ locale }, filters] = await Promise.all([params, searchParams]);
  if (locale !== "en" && locale !== "zh-hk") notFound();
  const category = categories.find(item => item.id === filters.category)?.id ?? "all";
  const territory = territories.find(item => item.id === filters.territory)?.id ?? "all";
  const query = typeof filters.q === "string" ? filters.q : "";
  const covers = Object.fromEntries(Object.entries(venueImages).map(([slug, photos]) => [slug, photos[0].url]));
  return <VenueDirectory key={JSON.stringify([locale, category, territory, query])} locale={locale as Locale} covers={covers} initialCategory={category} initialTerritory={territory} initialQuery={query} />;
}
