import PageHeader from "@/components/sections/PageHeader";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTABanner from "@/components/sections/CTABanner";
import { PAGE_IMAGES } from "@/lib/stockImages";
import { pageMetadata } from "@/lib/seo";
import { SERVICES } from "@/lib/types";

export const metadata = pageMetadata(
  "/services",
  "Services",
  "Wedding decoration, engagement events, reception setup, stage decoration, corporate events, and premium event management in Kathmandu."
);

const servicesSchema = SERVICES.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: service.title,
  description: service.description,
  areaServed: "Kathmandu, Nepal",
  provider: {
    "@type": "EventPlanningService",
    name: "Tasbir Events",
    url: "https://tasbirevents.com",
  },
}));

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
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
