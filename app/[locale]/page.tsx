import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WellnessHome } from "@/components/wellness-home";
import type { Locale } from "@/lib/data";

const locales: Locale[] = ["en", "zh-hk"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const chinese = locale === "zh-hk";
  return {
    title: { absolute: chinese ? "Wellness Hub — 香港健康生活地圖" : "Wellness Hub" },
    description: chinese ? "按地區探索全港運動場地、恢復空間、健康餐廳及健康食品店。" : "Discover sports facilities, recovery spaces, healthy restaurants and wellness shops across Hong Kong.",
    alternates: { languages: { en: "/en", "zh-HK": "/zh-hk" } },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <WellnessHome locale={locale as Locale} />;
}
