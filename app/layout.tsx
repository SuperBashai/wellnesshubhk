import type { Metadata } from "next";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { defaultSocialImage, siteName, siteTitleName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitleName,
    template: `%s | ${siteName}`,
  },
  description:
    "Your Hong Kong wellness guide to gyms, sports facilities, recovery spaces, healthy restaurants and wellness shops across the city.",
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "health and wellness",
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website", siteName, title: siteTitleName,
    description: "A bilingual Hong Kong wellness guide to movement, recovery and healthy eating across the city.",
    images: [{ url: defaultSocialImage, width: 1536, height: 1024, alt: "Wellness Hub Hong Kong" }],
    locale: "en_HK", alternateLocale: "zh_HK",
  },
  twitter: { card: "summary_large_image", title: siteTitleName, description: "A bilingual Hong Kong wellness guide to movement, recovery and healthy eating across the city.", images: [defaultSocialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { "geo.region": "HK", "geo.placename": "Hong Kong" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-wellness-locale") ?? "en-HK";
  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-TX04QNJ87F" />
    </html>
  );
}
