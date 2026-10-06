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
  return {
    title: { absolute: chinese ? "Wellness Hub — 香港健康生活地圖" : "Wellness Hub — Hong Kong Wellness Directory" },
    description: chinese ? "按地區探索全港運動場地、恢復空間、健康餐廳及健康食品店。" : "Discover sports facilities, recovery spaces, healthy restaurants and wellness shops across Hong Kong.",
    alternates: { canonical: chinese ? "/zh-hk" : "/en", languages: localizedLanguageAlternates() },
    openGraph: {
      url: chinese ? "/zh-hk" : "/en", locale: chinese ? "zh_HK" : "en_HK",
      title: chinese ? "Wellness Hub — 香港健康生活地圖" : "Wellness Hub — Hong Kong Wellness Directory",
      description: chinese ? "按地區探索全港運動場地、恢復空間、健康餐廳及健康食品店。" : "Discover sports facilities, recovery spaces, healthy restaurants and wellness shops across Hong Kong.",
      images: [defaultSocialImage],
    },
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
      { "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: siteName, alternateName: "Wellness Hub HK", url: absoluteUrl("/"), logo: absoluteUrl("/icon.svg"), areaServed: { "@type": "AdministrativeArea", name: "Hong Kong SAR" } },
      { "@type": "WebSite", "@id": `${absoluteUrl("/")}#website`, name: siteName, alternateName: "Wellness Hub HK", url: absoluteUrl("/"), inLanguage: ["en-HK", "zh-HK"], publisher: { "@id": `${absoluteUrl("/")}#organization` }, potentialAction: { "@type": "SearchAction", target: `${absoluteUrl(`/${locale}/places`)}?q={search_term_string}`, "query-input": "required name=search_term_string" } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: typedLocale === "en" ? "Hong Kong Wellness Directory" : "香港健康生活地圖", isPartOf: { "@id": `${absoluteUrl("/")}#website` }, inLanguage: typedLocale === "en" ? "en-HK" : "zh-HK" },
    ],
  };
  return <><JsonLd data={jsonLd} /><WellnessHome locale={typedLocale} /></>;
}
