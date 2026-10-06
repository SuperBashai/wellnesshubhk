import { NextRequest, NextResponse } from "next/server";

const localeCookie = "wellness-locale";
type SupportedLocale = "en" | "zh-hk";

function browserLocale(request: NextRequest): SupportedLocale {
  const savedLocale = request.cookies.get(localeCookie)?.value;
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

function rememberLocale(response: NextResponse, locale: SupportedLocale, request: NextRequest) {
  response.cookies.set(localeCookie, locale, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
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
      return rememberLocale(response, locale, request);
    }

    return NextResponse.redirect(destination, 308);
  }

  const requestHeaders = new Headers(request.headers);
  const locale: SupportedLocale = request.nextUrl.pathname === "/zh-hk" || request.nextUrl.pathname.startsWith("/zh-hk/") ? "zh-hk" : "en";
  const languageTag = locale === "zh-hk" ? "zh-HK" : "en-HK";
  requestHeaders.set("x-wellness-locale", languageTag);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Language", languageTag);
  return rememberLocale(response, locale, request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
