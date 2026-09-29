create table if not exists public.venue_reviews (
  id uuid primary key default gen_random_uuid(),
  venue_slug text not null check (venue_slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' and char_length(venue_slug) <= 120),
  display_name text not null check (char_length(display_name) between 2 and 40),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 10 and 600),
  locale text not null default 'en' check (locale in ('en', 'zh-hk')),
  image_paths text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  constraint venue_reviews_max_three_images check (cardinality(image_paths) <= 3)
);

create index if not exists venue_reviews_public_listing_idx
  on public.venue_reviews (venue_slug, created_at desc)
  where status = 'approved';

alter table public.venue_reviews enable row level security;

revoke all on table public.venue_reviews from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'review-images',
  'review-images',
  true,
  1200000,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Reviews and uploads are written only by the server using a Supabase secret key.
-- The public bucket makes approved review photos renderable without signed URLs;
-- randomized UUID paths keep pending uploads undiscoverable.
