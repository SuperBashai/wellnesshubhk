import { Dumbbell, Flame, Leaf, ShoppingBasket, Snowflake } from "lucide-react";
import type { CategoryId } from "@/lib/data";

const categoryIcons = { movement: Dumbbell, recovery: Snowflake, sauna: Flame, food: Leaf, shops: ShoppingBasket };

export function VenueFallback({ category }: { category: CategoryId }) {
  const Icon = categoryIcons[category];
  return <div className={`venue-symbol icon-${category}`}><Icon size={78} strokeWidth={1.1} /><small>WELL / HK</small></div>;
}
