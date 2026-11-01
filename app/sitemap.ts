import type { MetadataRoute } from "next";
import { editorials } from "@/lib/editorials";
import { categories, listingSlug, listings, territories } from "@/lib/data";
import { upcomingEvents } from "@/lib/events";
import { areaHubs } from "@/lib/area-hubs";
import { trustPages } from "@/lib/trust-pages";
import { absoluteUrl } from "@/lib/seo";

const locales = ["en", "zh-hk"] as const;
export const revalidate = 3600;
const latestDirectoryUpdate = "2026-11-01";

function localizedEntry(path: string, locale: typeof locales[number], priority: number, changeFrequency: "weekly" | "monthly", modified?: string): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(`/${locale}${path}`), ...(modified ? { lastModified: new Date(`${modified}T00:00:00+08:00`) } : {}), changeFrequency, priority,
    alternates: { languages: { "en-HK": absoluteUrl(`/en${path}`), "zh-HK": absoluteUrl(`/zh-hk${path}`), "x-default": absoluteUrl(`/en${path}`) } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    localizedEntry("", locale, 1, "weekly", latestDirectoryUpdate),
    localizedEntry("/places", locale, 0.9, "weekly", latestDirectoryUpdate),
    ...categories.map((category) => localizedEntry(`/places?category=${category.id}`, locale, 0.84, "weekly", ["movement", "recovery", "sauna"].includes(category.id) ? latestDirectoryUpdate : undefined)),
    ...territories.map((territory) => localizedEntry(`/places?territory=${territory.id}`, locale, 0.82, "weekly", territory.id === "island" ? latestDirectoryUpdate : undefined)),
    localizedEntry("/events", locale, 0.86, "weekly", latestDirectoryUpdate),
    ...upcomingEvents().map((event) => localizedEntry(`/events/${event.slug}`, locale, 0.69, "monthly", event.updatedAt)),
    localizedEntry("/editorial", locale, 0.8, "weekly"),
    ...trustPages.map((page) => localizedEntry(`/${page.slug}`, locale, 0.45, "monthly", "2026-11-01")),
    ...areaHubs.map((area) => localizedEntry(`/areas/${area.slug}`, locale, 0.78, "weekly", "2026-11-01")),
    ...editorials.map((article) => localizedEntry(`/editorial/${article.slug}`, locale, 0.72, "monthly", article.updatedAt)),
    ...listings.map((listing) => localizedEntry(`/venues/${listingSlug(listing)}`, locale, 0.7, "monthly", listing.updatedAt)),
  ]);
}
