import Link from "next/link";
import type { Locale } from "@/lib/data";
import { copy } from "@/lib/data";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><strong>Wellness Hub</strong><p>{t.footerNote}</p></div>
        <div className="footer-links"><Link href={`/${locale}#discover`}>{t.navDiscover}</Link><Link href={`/${locale}#areas`}>{t.navAreas}</Link><Link href={`/${locale}/editorial`}>{t.navGuide}</Link></div>
        <p className="footer-disclaimer">{t.disclaimer}<br />© 2026 Wellness Hub</p>
      </div>
    </footer>
  );
}
