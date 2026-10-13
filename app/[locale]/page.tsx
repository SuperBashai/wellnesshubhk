import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WellnessHome } from "@/components/wellness-home";
import { JsonLd } from "@/components/json-ld";
import type { Locale } from "@/lib/data";
import { absoluteUrl, defaultSocialImage, localizedLanguageAlternates, siteName } from "@/lib/seo";

const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const chinese = locale === "zh-hk";
  const title = chinese ? "香港健康生活指南｜Wellness Hub" : "Hong Kong Wellness Guide | Wellness Hub";
  const description = chinese
    ? "探索全港健身及運動場地、瑜伽與普拉提、冰浴、桑拿、健康餐廳及健康食品店。"
    : "Your guide to Hong Kong wellness: explore gyms, sports facilities, yoga, Pilates, ice baths, saunas, healthy dining and wellness shops.";
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: chinese ? "/zh-hk" : "/en", languages: localizedLanguageAlternates() },
    openGraph: {
      url: chinese ? "/zh-hk" : "/en", locale: chinese ? "zh_HK" : "en_HK",
      title,
      description,
      images: [defaultSocialImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [defaultSocialImage] },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const typedLocale = locale as Locale;
  const pageUrl = absoluteUrl(`/${locale}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: siteName, alternateName: ["Wellness Hub HK", "Hong Kong Wellness", "Wellness Hong Kong"], url: absoluteUrl("/"), logo: absoluteUrl("/icon.svg"), areaServed: { "@type": "AdministrativeArea", name: "Hong Kong SAR" } },
      { "@type": "WebSite", "@id": `${absoluteUrl("/")}#website`, name: siteName, alternateName: ["Wellness Hub HK", "Hong Kong Wellness", "Wellness Hong Kong"], url: absoluteUrl("/"), inLanguage: ["en-HK", "zh-HK"], publisher: { "@id": `${absoluteUrl("/")}#organization` }, potentialAction: { "@type": "SearchAction", target: `${absoluteUrl(`/${locale}/places`)}?q={search_term_string}`, "query-input": "required name=search_term_string" } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: typedLocale === "en" ? "Hong Kong Wellness Guide" : "香港健康生活指南", description: typedLocale === "en" ? "A bilingual guide to wellness in Hong Kong, from movement and recovery to healthy dining." : "雙語香港健康生活指南，涵蓋運動、恢復及健康飲食。", isPartOf: { "@id": `${absoluteUrl("/")}#website` }, inLanguage: typedLocale === "en" ? "en-HK" : "zh-HK" },
    ],
  };
  return <><JsonLd data={jsonLd} /><WellnessHome locale={typedLocale} /></>;
}
