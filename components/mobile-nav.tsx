"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { categories, territories, type Locale } from "@/lib/data";

export function MobileNav({ locale, labels }: { locale: Locale; labels: { discover: string; areas: string; guide: string } }) {
  return <details className="mobile-menu" suppressHydrationWarning>
    <summary aria-label={locale === "en" ? "Navigation menu" : "導覽選單"}><Menu size={22} /></summary>
    <nav aria-label={locale === "en" ? "Mobile navigation" : "手機導覽"} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) event.currentTarget.closest("details")?.removeAttribute("open"); }}>
      <div className="mobile-nav-main">
        <Link href={`/${locale}/places`}>{locale === "en" ? "Venue directory" : "場地目錄"}</Link>
        <Link href={`/${locale}#discover`}>{labels.discover}</Link>
        <Link href={`/${locale}/editorial`}>{labels.guide}</Link>
      </div>
      <div className="mobile-nav-group">
        <strong>{locale === "en" ? "Activities" : "活動"}</strong>
        {categories.map((item) => <Link key={item.id} href={`/${locale}/places?category=${item.id}`}>{item.label[locale]}</Link>)}
      </div>
      <div className="mobile-nav-group">
        <strong>{labels.areas}</strong>
        {territories.map((item) => <Link key={item.id} href={`/${locale}/places?territory=${item.id}`}>{item.label[locale]}</Link>)}
      </div>
    </nav>
  </details>;
}
