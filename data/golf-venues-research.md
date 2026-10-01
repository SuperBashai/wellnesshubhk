# Hong Kong golf venue research

Checked 1 October 2026. The public directory contains 24 golf-tagged venues: 16 dedicated indoor golf venues, six dedicated outdoor golf venues, plus GO PARK Sai Sha and the Police Officers’ Club cross-listed from the existing directory.

## Indoor venues

- Smash Factor — official site: https://smashfactor.hk/
- Optimus Golf Performance — official simulator page: https://www.ogp.hk/service/indoorgolf-simulators
- Hi Tee Golf, San Po Kong and Quarry Bay — official contact page: https://hiteegolf.com/contact_us/
- GOLFZON, Causeway Bay, Admiralty, Lai Chi Kok, Tsim Sha Tsui East and Kowloon Bay — official locations: https://www.golfzonhk.com/
- Shots Factory, HKU and Wan Chai — official site: https://shots-factory.com/
- 7Iron HK — official site: https://www.7ironhk.com/
- Golf Partners — official site: https://www.golfpartners.com.hk/
- Tour Mechanics — official site: https://www.tourmechanicshk.com/
- GOLFTEC Hong Kong — official centre page: https://golftec.com.hk/golf-lessons/hong-kong
- The Golf Bay — official site: https://www.thegolfbay.hk/

## Outdoor venues

- Jockey Club Kau Sai Chau Public Golf Course — official site: https://www.kscgolf.org.hk/eng/
- Hong Kong Golf Club, Fanling and Deep Water Bay — public access and course pages: https://hkgolfclub.org/public-golfing-access and https://hkgolfclub.org/course
- The Clearwater Bay Golf & Country Club — official golf page: https://www.cwbgolf.org/golf-club/
- Discovery Bay Golf Club — official site: https://www.dbgc.hk/
- Hong Kong Golf & Tennis Academy — official site: https://www.hkgta.com/

## Image enrichment

The configured Decodo Web Scraping API was run against every dedicated golf source. It returned usable official-site images for 17 dedicated venue pages. Hi Tee, Kau Sai Chau and Discovery Bay returned no usable photographs; Clearwater Bay returned only brand graphics, so those pages deliberately retain the site’s visual fallback rather than publish an unrelated or low-quality image. Image source URLs and attribution are stored in `data/venue-images.json` and the raw scrape audit is stored in `data/decodo-venue-enrichment.json`.

Opening hours, phone numbers, access limitations and visitor rules can change. Venue pages therefore link back to the official operator and describe restricted or members-only access explicitly.
