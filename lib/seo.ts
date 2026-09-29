export const siteName = "Wellness Hub";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3010");

export const siteUrl = new URL(configuredUrl);

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export const defaultSocialImage = absoluteUrl("/well-hk-hero.png");

export const seoKeywords = [
  "Hong Kong wellness directory", "Hong Kong fitness", "Hong Kong yoga", "Hong Kong Pilates",
  "Hong Kong sauna", "Hong Kong ice bath", "Hong Kong healthy restaurants",
  "香港健康生活", "香港瑜伽", "香港普拉提", "香港桑拿", "香港冰浴",
];
