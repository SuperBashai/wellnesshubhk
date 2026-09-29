"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/lib/data";

export function MobileNav({ locale, labels }: { locale: Locale; labels: { discover: string; areas: string; guide: string } }) {
  return <details className="mobile-menu">
    <summary aria-label={locale === "en" ? "Navigation menu" : "導覽選單"}><Menu size={22} /></summary>
    <nav aria-label={locale === "en" ? "Mobile navigation" : "手機導覽"} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) event.currentTarget.closest("details")?.removeAttribute("open"); }}>
      <Link href={`/${locale}/places`}>{locale === "en" ? "Venue directory" : "場地目錄"}</Link>
      <Link href={`/${locale}#discover`}>{labels.discover}</Link>
      <Link href={`/${locale}#areas`}>{labels.areas}</Link>
      <Link href={`/${locale}/editorial`}>{labels.guide}</Link>
    </nav>
  </details>;
}
