import { NextRequest, NextResponse } from "next/server";

type SupportedLocale = "en" | "zh-hk";

function browserLocale(request: NextRequest): SupportedLocale {
  const savedLocale = request.cookies.get("wellness-language-choice")?.value ?? request.cookies.get("wellness-locale")?.value;
  if (savedLocale === "en" || savedLocale === "zh-hk") return savedLocale;

  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((entry, index) => {
      const [range, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number.parseFloat(qualityParameter.split("=")[1]) : 1;
      return { range: range.toLowerCase(), quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { range } of languages) {
    if (range === "yue" || range.startsWith("yue-") || range === "zh" || range.startsWith("zh-")) return "zh-hk";
    if (range === "en" || range.startsWith("en-")) return "en";
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const needsCanonicalHost = request.nextUrl.hostname === "wellnesshubhk.vercel.app";
  const needsLocale = request.nextUrl.pathname === "/";

  if (needsCanonicalHost || needsLocale) {
    const destination = request.nextUrl.clone();
    if (needsCanonicalHost) {
      destination.protocol = "https:";
      destination.hostname = "www.wellnesshubhk.com";
      destination.port = "";
    }

    if (needsLocale) {
      const locale = browserLocale(request);
      destination.pathname = `/${locale}`;
      const response = NextResponse.redirect(destination, 307);
      response.headers.set("Vary", "Accept-Language, Cookie");
      return response;
    }

    return NextResponse.redirect(destination, 308);
  }

  const locale: SupportedLocale = request.nextUrl.pathname === "/zh-hk" || request.nextUrl.pathname.startsWith("/zh-hk/") ? "zh-hk" : "en";
  const languageTag = locale === "zh-hk" ? "zh-HK" : "en-HK";
  const response = NextResponse.next();
  response.headers.set("Content-Language", languageTag);
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
