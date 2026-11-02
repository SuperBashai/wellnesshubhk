import Link from "next/link";
import type { Locale } from "@/lib/data";
import { copy } from "@/lib/data";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><strong>Wellness Hub</strong><p>{t.footerNote}</p></div>
        <div className="footer-links"><Link href={`/${locale}#discover`}>{t.navDiscover}</Link><Link href={`/${locale}#areas`}>{t.navAreas}</Link><Link href={`/${locale}/events`}>{locale === "en" ? "Events" : "健康活動"}</Link><Link href={`/${locale}/editorial`}>{t.navGuide}</Link><Link href={`/${locale}/about`}>{locale === "en" ? "About" : "關於我哋"}</Link><Link href={`/${locale}/methodology`}>{locale === "en" ? "Methodology" : "資料準則"}</Link><Link href={`/${locale}/editorial-policy`}>{locale === "en" ? "Editorial policy" : "編輯方針"}</Link><Link href={`/${locale}/contact`}>{locale === "en" ? "Contact" : "聯絡我哋"}</Link></div>
        <p className="footer-disclaimer">{t.disclaimer}<br />© 2026 Wellness Hub</p>
      </div>
    </footer>
  );
}
