import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeaderDropdown } from "@/components/header-dropdown";
import { MobileNav } from "@/components/mobile-nav";
import type { Locale } from "@/lib/data";
import { categories, copy, territories } from "@/lib/data";

export function SiteHeader({ locale, page = "home", alternatePath }: { locale: Locale; page?: "home" | "guide" | "venue"; alternatePath?: string }) {
  const t = copy[locale];
  const otherLocale = locale === "en" ? "zh-hk" : "en";
  const suffix = alternatePath ?? (page === "guide" ? "/editorial" : "");
  const categoryItems = [
    { href: `/${locale}/places`, label: locale === "en" ? "All activities" : "全部活動", description: locale === "en" ? "Browse the complete directory" : "瀏覽完整場地目錄" },
    ...categories.map((item) => ({ href: `/${locale}/places?category=${item.id}`, label: item.label[locale], description: item.detail[locale] })),
  ];
  const areaItems = [
    { href: `/${locale}/places`, label: locale === "en" ? "All of Hong Kong" : "全香港", description: locale === "en" ? "See every neighbourhood" : "瀏覽各區健康生活場地" },
    ...territories.map((item) => ({ href: `/${locale}/places?territory=${item.id}`, label: item.label[locale], description: item.areas[locale] })),
  ];

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={`/${locale}`} aria-label="Wellness Hub home">
          <span className="brand-mark" aria-hidden="true"><i /><i /></span>
          <span><strong>Wellness Hub</strong></span>
        </Link>
        <nav className="primary-nav" aria-label={locale === "en" ? "Primary navigation" : "主要導覽"}>
          <Link href={`/${locale}#discover`}>{t.navDiscover}</Link>
          <HeaderDropdown label={locale === "en" ? "Activities" : "活動"} ariaLabel={locale === "en" ? "Browse by activity" : "按活動瀏覽"} items={categoryItems} />
          <HeaderDropdown label={locale === "en" ? "Areas" : "地區"} ariaLabel={locale === "en" ? "Browse by area" : "按地區瀏覽"} items={areaItems} />
          <Link href={`/${locale}/editorial`}>{t.navGuide}</Link>
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={`/${otherLocale}${suffix}`} hrefLang={otherLocale === "zh-hk" ? "zh-HK" : "en-HK"}>{locale === "en" ? "中文" : "EN"}</Link>
          <Link className="header-cta" href={`/${locale}/places`}>{locale === "en" ? "Find a place" : "搵好去處"}<ArrowUpRight size={15} /></Link>
          <MobileNav locale={locale} labels={{ discover: t.navDiscover, areas: t.navAreas, guide: t.navGuide }} />
        </div>
      </div>
    </header>
  );
}
