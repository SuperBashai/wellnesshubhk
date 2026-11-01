"use client";

import Link from "next/link";
import type { Locale } from "@/lib/data";

export function LanguageLink({ locale, href, label }: { locale: Locale; href: string; label: string }) {
  return <Link className="language-link" href={href} hrefLang={locale === "zh-hk" ? "zh-HK" : "en-HK"} onClick={() => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `wellness-language-choice=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
  }}>{label}</Link>;
}
