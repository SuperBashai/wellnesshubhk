# Private facilities expansion — 7 September 2026

Added 20 non-public sports locations, including 16 pickleball locations, with bilingual descriptions and operator/host venue source links in `lib/private-sports.ts`. A second cross-category audit added 28 verified physical locations in `lib/private-wellness.ts`: 10 private sports/wellness facilities, 6 plant-based dining branches and 12 health-shop branches. This remains a growing inventory rather than a claim that every Hong Kong business has been captured.

## Verification approach

- Used operator, host shopping centre, hotel, and operator-posted booking information. Other directories were discovery leads, not copied wholesale.
- Published only supported activities. Did not infer badminton or tennis facilities merely because a description compares those sports to pickleball.
- Left unconfirmed street/unit addresses and prices out. Confirm arrival details with the venue before booking.
- Stackd's homepage advertises a new Hopewell Centre 8/F flagship while an older booking page lists 3/F. Kept one location and explicitly noted that the booking confirmation should determine the floor.
- PICKLE.READY's operator-posted 2026–27 registration information requires membership for court hire. YMCA and Club de Recreio have member/guest rules. Private operation does not imply unrestricted public access.
- No photos were invented or copied for the new venues.
- Members-only and restricted-access clubs are labelled on every listing. Inclusion does not imply public walk-in access.
- Each branch is a separate record when the operator publishes a physical address, so filters and venue pages resolve to a real locality.

## Cross-category source ledger

| Coverage | First-party source | Records added | Key limitation |
| --- | --- | ---: | --- |
| Contrast therapy | https://www.thrivebody.info/ | 1 | Booking is required; services can change |
| Private sports clubs | https://www.lrc.com.hk/ · https://www.dynastyclub.com.hk/en/sport-recreations/facilities · https://jcc.org.hk/pages/health-fitness · https://www.cchly.com/ · https://www.usrc.org.hk/our-facilities.html · https://www.hkfc.com/facilities/ · https://www.dbrc.hk/en/sport.html?club=1&id=1438407458&type=1 · https://poc-psrc.com.hk/Card/AboutUs | 9 | Mostly members-only or restricted access |
| Plant-based dining | https://www.yearshk.com/pages/menu | 6 | One operator family; broader restaurant audit continues |
| Health shops | https://online.healthshop.com.hk/default/place-order · https://www.healthygiant.hk/en/pages/store-locations | 12 | Chain branches are source-verified; product ranges vary |

Primary discovery frame for private clubs: https://www.cstb.gov.hk/en/other-information/prls.html and the government facility list at https://www.cstb.gov.hk/file_manager/en/documents/other-information/prl_facilities.pdf.

## Outstanding verification leads

The Apex, Pickle Master, The Pickleball Lab (Tuen Mun and Yuen Long), Ascend Sport branches, Pickle Vibes, PickleIsland, Pickle Go, PickOne, BuddyBall, Matchbox, AllDay Pickle, Sportsmile, HeyHey, Pick It Up and Pickleballholic remain candidates for further operator-level verification. Do not treat this list as confirmed active venues.

Dink Pod's linked website returned unrelated hydration-platform content during this check; not added. Private recreation clubs, commercial badminton facilities, swimming, tennis, climbing, gyms and studios need a wider locality-by-locality audit to achieve comprehensive coverage.

The next branch-level gaps are large chains whose official pages contain many changing locations (especially GNC, SaladStop and Heybo), plus independent healthy restaurants outside Hong Kong Island. These should be imported only after deduplication and current-address checks.
