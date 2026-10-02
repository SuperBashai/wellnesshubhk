import { NextResponse, type NextRequest } from "next/server";
import { getListingBySlug, listingName, type Locale } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type GoogleAuthorAttribution = {
  displayName?: string;
  uri?: string;
  photoUri?: string;
};

type GooglePhoto = {
  name?: string;
  googleMapsUri?: string;
  authorAttributions?: GoogleAuthorAttribution[];
};

type GooglePlace = {
  googleMapsUri?: string;
  photos?: GooglePhoto[];
};

const noStoreHeaders = { "Cache-Control": "private, no-store, max-age=0" };

function unavailable(message: string, status = 404) {
  return NextResponse.json({ error: message }, { status, headers: noStoreHeaders });
}

export async function GET(request: NextRequest) {
  const venue = request.nextUrl.searchParams.get("venue")?.trim() ?? "";
  const localeParam = request.nextUrl.searchParams.get("locale");
  const locale: Locale = localeParam === "zh-hk" ? "zh-hk" : "en";
  const listing = getListingBySlug(venue);
  if (!listing) return unavailable("Venue not found.", 400);

  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) return unavailable("Google Place Photos are not configured.", 503);

  const textQuery = [listingName(listing, "en"), listing.address?.en ?? listing.area.en, "Hong Kong"]
    .filter(Boolean)
    .join(", ");

  try {
    const searchResponse = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.googleMapsUri,places.photos",
      },
      body: JSON.stringify({
        textQuery,
        languageCode: locale === "zh-hk" ? "zh-HK" : "en",
        regionCode: "HK",
      }),
    });

    if (!searchResponse.ok) {
      console.error("Google Places text search failed", searchResponse.status);
      return unavailable("Google Maps could not find a venue photo.", 502);
    }

    const searchPayload = await searchResponse.json() as { places?: GooglePlace[] };
    const place = searchPayload.places?.[0];
    const photo = place?.photos?.[0];
    if (!photo?.name) return unavailable("No Google Maps photo is available for this venue.");

    const mediaUrl = new URL(`https://places.googleapis.com/v1/${photo.name}/media`);
    mediaUrl.searchParams.set("maxWidthPx", "1600");
    mediaUrl.searchParams.set("skipHttpRedirect", "true");
    mediaUrl.searchParams.set("key", apiKey);
    const mediaResponse = await fetch(mediaUrl, { cache: "no-store" });
    if (!mediaResponse.ok) {
      console.error("Google Place Photo media lookup failed", mediaResponse.status);
      return unavailable("Google Maps could not load this venue photo.", 502);
    }

    const mediaPayload = await mediaResponse.json() as { photoUri?: string };
    if (!mediaPayload.photoUri) return unavailable("Google Maps did not return a photo URL.", 502);

    const attribution = photo.authorAttributions?.[0];
    return NextResponse.json({
      photoUri: mediaPayload.photoUri,
      googleMapsUri: photo.googleMapsUri ?? place?.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(textQuery)}`,
      author: attribution?.displayName ?? "Google Maps contributor",
      authorUri: attribution?.uri,
      alt: locale === "en" ? `${listingName(listing, locale)} — photo from Google Maps` : `${listingName(listing, locale)} — Google 地圖相片`,
    }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Unable to load Google Place Photo", error instanceof Error ? error.message : error);
    return unavailable("Google Maps photos are temporarily unavailable.", 502);
  }
}
