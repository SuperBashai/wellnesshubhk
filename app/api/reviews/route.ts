import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 1_200_000;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type ReviewRow = {
  id: string;
  display_name: string;
  rating: number;
  body: string;
  created_at: string;
  image_paths: string[] | null;
};

function reviewJson(row: ReviewRow, publicUrl: (path: string) => string) {
  return {
    id: row.id,
    name: row.display_name,
    rating: row.rating,
    body: row.body,
    createdAt: row.created_at,
    images: (row.image_paths ?? []).map(publicUrl),
  };
}

function validVenueSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 120;
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return Boolean(forwardedHost && origin === `${forwardedProto}://${forwardedHost}`);
}

export async function GET(request: NextRequest) {
  const venue = request.nextUrl.searchParams.get("venue")?.trim() ?? "";
  if (!validVenueSlug(venue)) return NextResponse.json({ error: "Invalid venue." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });

  const { data, error } = await supabase
    .from("venue_reviews")
    .select("id, display_name, rating, body, created_at, image_paths")
    .eq("venue_slug", venue)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Unable to load venue reviews", error.message);
    return NextResponse.json({ error: "Reviews could not be loaded." }, { status: 500 });
  }

  const publicUrl = (path: string) => supabase.storage.from("review-images").getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ reviews: (data as ReviewRow[]).map((row) => reviewJson(row, publicUrl)) });
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Reviews are not configured yet." }, { status: 503 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid review submission." }, { status: 400 });
  }

  if (String(form.get("website") ?? "")) return NextResponse.json({ ok: true }, { status: 202 });

  const venueSlug = String(form.get("venueSlug") ?? "").trim();
  const displayName = String(form.get("name") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();
  const locale = String(form.get("locale") ?? "en");
  const rating = Number(form.get("rating"));
  const images = form.getAll("images").filter((value): value is File => value instanceof File && value.size > 0);

  if (!validVenueSlug(venueSlug) || displayName.length < 2 || displayName.length > 40 || body.length < 10 || body.length > 600 || !Number.isInteger(rating) || rating < 1 || rating > 5 || !["en", "zh-hk"].includes(locale)) {
    return NextResponse.json({ error: "Please check the review details." }, { status: 400 });
  }
  if (images.length > MAX_IMAGES || images.some((image) => image.size > MAX_IMAGE_BYTES || !ALLOWED_IMAGE_TYPES.has(image.type))) {
    return NextResponse.json({ error: "Please check the review images." }, { status: 400 });
  }

  const reviewId = crypto.randomUUID();
  const imagePaths: string[] = [];

  for (const [index, image] of images.entries()) {
    const extension = image.type === "image/png" ? "png" : image.type === "image/webp" ? "webp" : "jpg";
    const path = `${venueSlug}/${reviewId}/${index + 1}.${extension}`;
    const { error } = await supabase.storage.from("review-images").upload(path, image, { contentType: image.type, upsert: false });
    if (error) {
      if (imagePaths.length) await supabase.storage.from("review-images").remove(imagePaths);
      console.error("Unable to upload review image", error.message);
      return NextResponse.json({ error: "The review photos could not be uploaded." }, { status: 500 });
    }
    imagePaths.push(path);
  }

  const { data, error } = await supabase
    .from("venue_reviews")
    .insert({ id: reviewId, venue_slug: venueSlug, display_name: displayName, rating, body, locale, image_paths: imagePaths, status: "pending" })
    .select("id, display_name, rating, body, created_at, image_paths")
    .single();

  if (error) {
    if (imagePaths.length) await supabase.storage.from("review-images").remove(imagePaths);
    console.error("Unable to save venue review", error.message);
    return NextResponse.json({ error: "The review could not be saved." }, { status: 500 });
  }

  const publicUrl = (path: string) => supabase.storage.from("review-images").getPublicUrl(path).data.publicUrl;
  return NextResponse.json({ review: reviewJson(data as ReviewRow, publicUrl), pending: true }, { status: 201 });
}
