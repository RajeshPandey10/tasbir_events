import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTABanner from "@/components/sections/CTABanner";
import { PAGE_IMAGES } from "@/lib/stockImages";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding decoration, engagement events, reception setup, stage decoration, corporate events, and premium event management in Kathmandu.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything your event needs, in one place."
        description="From the first sketch of a stage to the last flower on a table, we design and manage every visual detail of your celebration."
        image={PAGE_IMAGES.services}
        imageAlt="Floral staircase installation with lanterns and candles"
      />
      <ServicesGrid />
      <CTABanner />
    </>
  );
}
