import type { CategoryId, Listing } from "./data";

// Keep the primary category for visual styling; membership includes all curated categories.
export function listingCategories(listing: Listing): CategoryId[] {
  return [...new Set([listing.category, ...(listing.additionalCategories ?? [])])];
}
