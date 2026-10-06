import type { MetadataRoute } from "next";
import { editorials } from "@/lib/editorials";
import { categories, listingSlug, listings, territories } from "@/lib/data";
import { absoluteUrl } from "@/lib/seo";

const locales = ["en", "zh-hk"] as const;
const updated = new Date("2026-10-06T00:00:00+08:00");

function localizedEntry(path: string, locale: typeof locales[number], priority: number, changeFrequency: "weekly" | "monthly"): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(`/${locale}${path}`), lastModified: updated, changeFrequency, priority,
    alternates: { languages: { "en-HK": absoluteUrl(`/en${path}`), "zh-HK": absoluteUrl(`/zh-hk${path}`), "x-default": absoluteUrl(`/en${path}`) } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    localizedEntry("", locale, 1, "weekly"),
    localizedEntry("/places", locale, 0.9, "weekly"),
    ...categories.map((category) => localizedEntry(`/places?category=${category.id}`, locale, 0.84, "weekly")),
    ...territories.map((territory) => localizedEntry(`/places?territory=${territory.id}`, locale, 0.82, "weekly")),
    localizedEntry("/editorial", locale, 0.8, "weekly"),
    ...editorials.map((article) => localizedEntry(`/editorial/${article.slug}`, locale, 0.72, "monthly")),
    ...listings.map((listing) => localizedEntry(`/venues/${listingSlug(listing)}`, locale, 0.7, "monthly")),
  ]);
}
