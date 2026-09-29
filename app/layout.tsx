import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wellness Hub",
    template: "%s | Wellness Hub",
  },
  description:
    "Discover sports facilities, recovery spaces, healthy restaurants and wellness shops across Hong Kong.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = (await headers()).get("x-wellness-locale") ?? "en";
  return <html lang={locale}><body>{children}</body></html>;
}
