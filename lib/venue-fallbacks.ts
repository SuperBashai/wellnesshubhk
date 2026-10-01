import type { CategoryId } from "@/lib/data";

export const venueFallbacks: Record<CategoryId, string> = {
  movement: "/venue-fallbacks/movement.jpg",
  recovery: "/venue-fallbacks/recovery.jpg",
  sauna: "/venue-fallbacks/sauna.jpg",
  food: "/venue-fallbacks/food.jpg",
  shops: "/venue-fallbacks/shops.jpg",
};

export function venueFallbackPhoto(category: CategoryId) {
  return {
    url: venueFallbacks[category],
    source: "",
    credit: "Wellness Hub",
    kind: "category" as const,
    alt: {
      en: "Wellness Hub category artwork — not a photograph of this venue",
      "zh-hk": "Wellness Hub 分類圖片，並非此場地實景相片",
    },
  };
}
