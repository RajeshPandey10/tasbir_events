import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://tasbirevents.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tasbir Events — Wedding & Event Decoration in Kathmandu",
    template: "%s — Tasbir Events",
  },
  description:
    "Tasbir Events designs weddings, engagements, receptions, and celebrations across Kathmandu. Turning every event into a memory.",
  keywords: [
    "wedding decoration Kathmandu",
    "event management Nepal",
    "wedding planner Kathmandu",
    "engagement decoration Nepal",
    "stage decoration Kathmandu",
    "Tasbir Events",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tasbir Events — Wedding & Event Decoration in Kathmandu",
    description: "Turning every event into a memory.",
    url: SITE_URL,
    siteName: "Tasbir Events",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasbir Events — Wedding & Event Decoration in Kathmandu",
    description: "Turning every event into a memory.",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "EventPlanningService",
  name: "Tasbir Events",
  description:
    "Wedding, engagement, and corporate event decoration and management in Kathmandu, Nepal.",
  url: SITE_URL,
  telephone: "+977-9861941354",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    postalCode: "44600",
    addressCountry: "NP",
  },
  areaServed: "Kathmandu, Nepal",
  sameAs: [
    "https://www.instagram.com/tasbir.events",
    "https://www.facebook.com/profile.php?id=61590631374369",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full font-body antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
