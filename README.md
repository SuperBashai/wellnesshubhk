# WELL HK

A bilingual English / Traditional Chinese prototype for a Hong Kong wellness directory.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/zh-hk`. To match the current local preview, run `npm run dev -- --port 3010`.

## Current scope

- Responsive bilingual homepage
- Search, category and territory filters
- A comprehensive source-linked directory across sport, recovery, sauna, healthy dining and health shops
- A dedicated English and Cantonese page for every venue
- All 116 LCSD sports centres, covering every Hong Kong district in the official open dataset
- Searchable bilingual venue names, addresses, descriptions and tags
- Progressive result loading to keep large category pages manageable
- Venue overview, address, amenities, official-source link and related-place discovery on every venue page
- Short bilingual venue introductions, opening hours and phone details where officially published
- Source-attributed photo galleries: 317 images matched to 130 listings; 39 listings still need confirmed venue photos
- Sports filters including HYROX, pickleball, badminton, tennis, table tennis, basketball, volleyball, squash, climbing, yoga, gym and dance
- Full LCSD facility classifications are stored separately from short display tags; table tennis does not imply tennis
- Responsive mobile navigation, photo previews in search results, adjacent search/region filters, and address-based map links
- A clickable, responsive Hong Kong territory map with proper source attribution
- Magazine-style opinion, feature and review editorials
- Browser-local venue reviews with ratings and up to three resized image attachments per review

## Reviews

The current review experience is a front-end prototype. Reviews and attached images are stored in the visitor's browser. A production launch should connect shared database storage, image hosting and moderation before accepting public submissions.

## Venue photography

`data/venue-images.json` maps venue slugs to official-source photo URLs, bilingual alt text and credits. The gallery keeps original remote hosting, supports keyboard-accessible photo selection, and skips images that fail to load. `data/image-coverage.json` lists the venues still needing confirmed photography. Finding an image on an official website does not establish reuse permission; permission status is recorded as unconfirmed.

Research utilities: `scripts/find-venue-images.mjs` extracts LCSD galleries and collects private-source candidates; `scripts/review-venue-images.mjs` makes a temporary visual review sheet; `scripts/select-venue-images.mjs` applies reviewed private selections and branch-specific PURE photos. Run `scripts/check-venue-images.mjs` to check cover-image URLs and `scripts/image-coverage.mjs` to refresh the coverage report. Candidate files are research records and are not imported into the public site.
- English and Cantonese wellness guide
- Localised metadata and language alternatives

Public sports-centre data is generated from the LCSD open dataset with `node scripts/import-lcsd-sports-centres.mjs`. Private venues are a hand-checked launch catalogue linked to their first-party location pages. Private businesses change frequently, so launch operations should include a regular editorial verification workflow and a venue-submission process.
