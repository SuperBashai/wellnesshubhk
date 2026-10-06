import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === "wellnesshubhk.vercel.app") {
    const canonicalUrl = request.nextUrl.clone();
    canonicalUrl.protocol = "https:";
    canonicalUrl.hostname = "www.wellnesshubhk.com";
    canonicalUrl.port = "";
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.startsWith("/zh-hk") ? "zh-HK" : "en-HK";
  requestHeaders.set("x-wellness-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
