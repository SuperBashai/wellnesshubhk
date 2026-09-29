import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/lib/data";
import { copy } from "@/lib/data";

export function SiteHeader({ locale, page = "home", alternatePath }: { locale: Locale; page?: "home" | "guide" | "venue"; alternatePath?: string }) {
  const t = copy[locale];
  const otherLocale = locale === "en" ? "zh-hk" : "en";
  const suffix = alternatePath ?? (page === "guide" ? "/editorial" : "");

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Wellness Hub home">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span><strong>Wellness Hub</strong></span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href={`/${locale}#discover`}>{t.navDiscover}</Link>
          <Link href={`/${locale}#areas`}>{t.navAreas}</Link>
          <Link href={`/${locale}/editorial`}>{t.navGuide}</Link>
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={`/${otherLocale}${suffix}`} hrefLang={otherLocale === "zh-hk" ? "zh-HK" : "en"}>{locale === "en" ? "中文" : "EN"}</Link>
          <Link className="header-cta" href={`/${locale}/places`}>{locale === "en" ? "Find a place" : "搵好去處"}<ArrowUpRight size={15} /></Link>
          <MobileNav locale={locale} labels={{ discover: t.navDiscover, areas: t.navAreas, guide: t.navGuide }} />
        </div>
      </div>
    </header>
  );
}
