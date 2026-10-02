"use client";

import { useEffect, useState } from "react";
import { Dumbbell, Flame, Images, Leaf, ShoppingBasket, Snowflake } from "lucide-react";
import type { CategoryId, Locale } from "@/lib/data";

type PlacePhoto = {
  photoUri: string;
  googleMapsUri: string;
  author: string;
  authorUri?: string;
  alt: string;
};

const categoryIcons = { movement: Dumbbell, recovery: Snowflake, sauna: Flame, food: Leaf, shops: ShoppingBasket };

function VenueSymbol({ category }: { category: CategoryId }) {
  const Icon = categoryIcons[category];
  return <div className={`venue-symbol icon-${category}`}><Icon size={78} strokeWidth={1.1} /><small>WELL / HK</small></div>;
}

export function GooglePlacePhoto({ slug, locale, category }: { slug: string; locale: Locale; category: CategoryId }) {
  const [photo, setPhoto] = useState<PlacePhoto | null>(null);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setPhoto(null);
    setFinished(false);
    setFailed(false);
    fetch(`/api/place-photo?venue=${encodeURIComponent(slug)}&locale=${locale}`, {
      cache: "no-store",
      signal: controller.signal,
    }).then(async (response) => {
      if (!response.ok) return null;
      return response.json() as Promise<PlacePhoto>;
    }).then((result) => {
      if (result?.photoUri) setPhoto(result);
    }).catch((error) => {
      if (error instanceof Error && error.name !== "AbortError") console.error("Unable to load Google Maps photo", error.message);
    }).finally(() => {
      if (!controller.signal.aborted) setFinished(true);
    });
    return () => controller.abort();
  }, [locale, slug]);

  if (!finished || !photo || failed) return <VenueSymbol category={category} />;

  return <figure className="venue-gallery google-place-photo">
    <div className="venue-gallery-image">
      {/* Google photo URIs are short-lived and must be loaded directly without caching. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.photoUri} alt={photo.alt} referrerPolicy="no-referrer" onError={() => setFailed(true)} />
      <div className="venue-gallery-count"><Images size={15} aria-hidden="true" /> 1 / 1</div>
    </div>
    <figcaption>
      <span><a href={photo.googleMapsUri} target="_blank" rel="noreferrer">{locale === "en" ? "Photo from Google Maps" : "Google 地圖相片"}</a>{" · "}<a href={photo.authorUri ?? photo.googleMapsUri} target="_blank" rel="noreferrer">{photo.author}</a></span>
      <span>{locale === "en" ? "Maps venue photo" : "地圖場地相片"}</span>
    </figcaption>
  </figure>;
}
