import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wellness Hub", short_name: "Wellness Hub",
    description: "A bilingual directory for wellness, movement, recovery and healthy food across Hong Kong.",
    start_url: "/en", display: "standalone", background_color: "#f7f5ef", theme_color: "#173f36", lang: "en-HK",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
