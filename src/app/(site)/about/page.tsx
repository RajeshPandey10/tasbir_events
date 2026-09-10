import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTABanner from "@/components/sections/CTABanner";
import { PAGE_IMAGES } from "@/lib/stockImages";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tasbir Events is a Kathmandu-based wedding and event design studio turning every celebration into a memory, from concept through the final flower.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Turning every event into a memory."
        image={PAGE_IMAGES.about}
        imageAlt="Floral garland arch over a wedding sweetheart table"
      />

      <Section narrow>
        <Reveal className="flex flex-col gap-5 text-ink/70">
          <p>
            Tasbir Events began with a simple belief: the setting of a celebration should feel as
            considered as the celebration itself. Based in Kathmandu, we work with couples,
            families, and companies to design spaces that hold a moment the way it deserves to be
            held.
          </p>
          <p>
            From a small engagement gathering to a full wedding reception, our approach stays the
            same — understand what the day means to you, then build every stage, table, and light
            around that.
          </p>
          <p>
            We handle décor, staging, and on-the-day coordination, so you can be present for the
            parts that matter and let us take care of the rest.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-2 border-t border-blush pt-8 text-sm text-ink/70">
          <p>Kathmandu, Nepal 44600</p>
          <p>WhatsApp — 986-1941354</p>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
