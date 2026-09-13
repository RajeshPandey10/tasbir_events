import { Metadata } from "next";

const SITE_URL = "https://tasbirevents.com";
const OG_IMAGE = "/opengraph-image.png";

export function pageMetadata(path: string, title: string, description: string): Metadata {
  const fullTitle = `${title} — Tasbir Events`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Tasbir Events",
      locale: "en_US",
      type: "website",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Tasbir Events" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
