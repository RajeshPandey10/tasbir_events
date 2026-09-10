import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tasbir Events",
    short_name: "Tasbir Events",
    description: "Wedding, engagement, and corporate event decoration in Kathmandu, Nepal.",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6F0",
    theme_color: "#D26056",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
