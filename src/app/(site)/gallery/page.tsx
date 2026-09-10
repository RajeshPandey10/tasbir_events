import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import GalleryMasonry from "@/components/site/GalleryMasonry";
import { SkeletonGalleryGrid } from "@/components/ui/Skeleton";
import { PAGE_IMAGES } from "@/lib/stockImages";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Tasbir Events' portfolio of weddings, engagements, receptions, and celebrations designed across Kathmandu, filterable by event type.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Our work, event by event."
        description="A running record of the weddings, engagements, and celebrations we've designed across Kathmandu."
        image={PAGE_IMAGES.gallery}
        imageAlt="String-lit wedding reception table with champagne glasses"
      />
      <Section>
        <Suspense fallback={<SkeletonGalleryGrid />}>
          <GalleryMasonry />
        </Suspense>
      </Section>
    </>
  );
}
