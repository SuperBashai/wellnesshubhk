export const siteName = "Wellness Hub";
export const siteTitleName = "Wellness Hub Hong Kong";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3010");

export const siteUrl = new URL(configuredUrl);

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function languageTag(locale: "en" | "zh-hk") {
  return locale === "en" ? "en-HK" : "zh-HK";
}

export function localizedLanguageAlternates(path = "") {
  return {
    "en-HK": `/en${path}`,
    "zh-HK": `/zh-hk${path}`,
    "x-default": `/en${path}`,
  };
}

export function conciseDescription(value: string, maxLength = 160) {
  if (value.length <= maxLength) return value;
  const shortened = value.slice(0, maxLength - 1).replace(/\s+\S*$/, "").trimEnd();
  return `${shortened}…`;
}

export const defaultSocialImage = absoluteUrl("/well-hk-hero.png");
