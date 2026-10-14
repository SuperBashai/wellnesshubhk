import socialByOrigin from "@/data/venue-socials.json";

export type VenueSocialPlatform = "instagram" | "facebook" | "youtube" | "linkedin";

export type VenueSocialLink = {
  platform: VenueSocialPlatform;
  url: string;
};

const socialBySlug: Record<string, VenueSocialLink[]> = {
  "kinship": [{ platform: "instagram", url: "https://www.instagram.com/kinship.hk/" }],
  "asap": [
    { platform: "instagram", url: "https://www.instagram.com/comeasaphk/" },
    { platform: "facebook", url: "https://www.facebook.com/comeasap" },
  ],
  "live-zero": [{ platform: "instagram", url: "https://www.instagram.com/livezero.hk/" }],
  "foodcraft": [{ platform: "instagram", url: "https://www.instagram.com/foodcraft_hk/" }],
  "hong-kong-football-club": [{ platform: "instagram", url: "https://www.instagram.com/hongkongfootballclub1886/" }],
  "ursus-fitness": [{ platform: "instagram", url: "https://www.instagram.com/ursusfitness/" }],
  "be-earth-central": [{ platform: "instagram", url: "https://www.instagram.com/beearthofficial/" }],
};

const socialBySlugPrefix: Array<[string, VenueSocialLink[]]> = [
  ["ikigai-", [{ platform: "instagram", url: "https://www.instagram.com/ikigai.hk/" }]],
  ["yoga-room", [{ platform: "instagram", url: "https://www.instagram.com/yogaroomhk/" }]],
  ["spicebox-organics-", [{ platform: "instagram", url: "https://www.instagram.com/spiceboxorganics/" }]],
  ["bay-pickle-", [{ platform: "instagram", url: "https://www.instagram.com/baypickle/" }]],
  ["slowood-", [{ platform: "instagram", url: "https://www.instagram.com/slowood.hk/" }]],
  ["fete-up-", [{ platform: "instagram", url: "https://www.instagram.com/feteuphk/" }]],
  ["hi-tee-golf-", [{ platform: "instagram", url: "https://www.instagram.com/hiteegolf/" }]],
  ["pure-yoga-", [
    { platform: "instagram", url: "https://www.instagram.com/pureyogaofficial/" },
    { platform: "facebook", url: "https://www.facebook.com/PUREYogaOfficial" },
    { platform: "youtube", url: "https://www.youtube.com/c/pureyoga" },
  ]],
  ["pure-fitness-", [
    { platform: "instagram", url: "https://www.instagram.com/purefitnessofficial/" },
    { platform: "facebook", url: "https://www.facebook.com/PureFitnessOfficial/" },
    { platform: "youtube", url: "https://www.youtube.com/c/purefitness" },
  ]],
];

export function venueSocialLinks(slug: string, officialUrl?: string) {
  const specificLinks = socialBySlug[slug] ?? socialBySlugPrefix.find(([prefix]) => slug.startsWith(prefix))?.[1] ?? [];
  if (!officialUrl) return specificLinks;

  try {
    const brandLinks = (socialByOrigin as Record<string, VenueSocialLink[]>)[new URL(officialUrl).origin] ?? [];
    const seenPlatforms = new Set<VenueSocialPlatform>();
    return [...specificLinks, ...brandLinks].filter((social) =>
      !seenPlatforms.has(social.platform) && seenPlatforms.add(social.platform)
    );
  } catch {
    return specificLinks;
  }
}
