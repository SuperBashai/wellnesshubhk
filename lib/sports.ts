import type { Listing, LocalText } from "./data";
import { listingCategories } from "./listing-categories";

export const sports = [
  { id: "hyrox", label: { en: "HYROX", "zh-hk": "HYROX 混合體能賽" }, tags: ["hyrox", "hyrox training"] },
  { id: "pickleball", label: { en: "Pickleball", "zh-hk": "匹克球" }, tags: ["pickleball"] },
  { id: "badminton", label: { en: "Badminton", "zh-hk": "羽毛球" }, tags: ["badminton"] },
  { id: "tennis", label: { en: "Tennis", "zh-hk": "網球" }, tags: ["tennis"] },
  { id: "table-tennis", label: { en: "Table tennis", "zh-hk": "乒乓球" }, tags: ["table tennis"] },
  { id: "basketball", label: { en: "Basketball", "zh-hk": "籃球" }, tags: ["basketball"] },
  { id: "volleyball", label: { en: "Volleyball", "zh-hk": "排球" }, tags: ["volleyball"] },
  { id: "squash", label: { en: "Squash", "zh-hk": "壁球" }, tags: ["squash"] },
  { id: "climbing", label: { en: "Climbing", "zh-hk": "攀石" }, tags: ["climbing", "bouldering"] },
  { id: "yoga", label: { en: "Yoga", "zh-hk": "瑜伽" }, tags: ["yoga", "yoga & fitness"] },
  { id: "pilates", label: { en: "Pilates", "zh-hk": "普拉提" }, tags: ["pilates", "reformer pilates", "mat pilates", "yoga & pilates"] },
  { id: "gym", label: { en: "Gym & training", "zh-hk": "健身訓練" }, tags: ["fitness", "fitness room", "gym", "yoga & fitness"] },
  { id: "dance", label: { en: "Dance", "zh-hk": "舞蹈" }, tags: ["dance"] },
  { id: "swimming", label: { en: "Swimming", "zh-hk": "游泳" }, tags: ["swimming", "pool"] },
  { id: "football", label: { en: "Football", "zh-hk": "足球" }, tags: ["football", "soccer"] },
  { id: "padel", label: { en: "Padel", "zh-hk": "板式網球" }, tags: ["padel"] },
] as const satisfies ReadonlyArray<{ id: string; label: LocalText; tags: readonly string[] }>;
export type SportId = typeof sports[number]["id"];

export function listingSports(listing: Listing): SportId[] {
  if (!listingCategories(listing).includes("movement")) return [];
  if (listing.sports) return listing.sports;
  const tags = listing.tags.en.map((tag) => tag.toLowerCase());
  return sports.filter((sport) => sport.tags.some((tag) => tags.includes(tag))).map((sport) => sport.id);
}
