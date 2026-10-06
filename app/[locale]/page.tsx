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
  const title = chinese ? "香港運動、恢復與健康飲食指南｜Wellness Hub" : "Move, Recover & Eat Well in Hong Kong | Wellness Hub";
  const description = chinese
    ? "探索全港健身及運動場地、瑜伽與普拉提、冰浴、桑拿、健康餐廳及健康食品店。"
    : "Explore Hong Kong gyms, sports facilities, yoga and Pilates studios, ice baths, saunas, healthy restaurants and wellness shops.";
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
      { "@type": "Organization", "@id": `${absoluteUrl("/")}#organization`, name: siteName, alternateName: "Wellness Hub HK", url: absoluteUrl("/"), logo: absoluteUrl("/icon.svg"), areaServed: { "@type": "AdministrativeArea", name: "Hong Kong SAR" } },
      { "@type": "WebSite", "@id": `${absoluteUrl("/")}#website`, name: siteName, alternateName: "Wellness Hub HK", url: absoluteUrl("/"), inLanguage: ["en-HK", "zh-HK"], publisher: { "@id": `${absoluteUrl("/")}#organization` }, potentialAction: { "@type": "SearchAction", target: `${absoluteUrl(`/${locale}/places`)}?q={search_term_string}`, "query-input": "required name=search_term_string" } },
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: typedLocale === "en" ? "Move, Recover & Eat Well in Hong Kong" : "香港運動、恢復與健康飲食指南", isPartOf: { "@id": `${absoluteUrl("/")}#website` }, inLanguage: typedLocale === "en" ? "en-HK" : "zh-HK" },
    ],
  };
  return <><JsonLd data={jsonLd} /><WellnessHome locale={typedLocale} /></>;
}
