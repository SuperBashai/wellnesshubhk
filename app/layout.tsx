import type { Metadata } from "next";
import { headers } from "next/headers";
import { defaultSocialImage, seoKeywords, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Discover sports facilities, recovery spaces, healthy restaurants and wellness shops across Hong Kong.",
  applicationName: siteName,
  keywords: seoKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "health and wellness",
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website", siteName, title: siteName,
    description: "A bilingual guide to movement, recovery and healthy eating across Hong Kong.",
    images: [{ url: defaultSocialImage, width: 1536, height: 1024, alt: "Wellness Hub Hong Kong" }],
    locale: "en_HK", alternateLocale: "zh_HK",
  },
  twitter: { card: "summary_large_image", title: siteName, description: "A bilingual guide to movement, recovery and healthy eating across Hong Kong.", images: [defaultSocialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "geo.region": "HK", "geo.placename": "Hong Kong" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-wellness-locale") ?? "en";
  return <html lang={locale} data-scroll-behavior="smooth"><body>{children}</body></html>;
}
