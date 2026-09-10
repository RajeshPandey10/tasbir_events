import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/site/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { PAGE_IMAGES } from "@/lib/stockImages";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tasbir Events in Kathmandu for wedding, engagement, and event decoration inquiries — by form, WhatsApp, or social media.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's talk about your event."
        image={PAGE_IMAGES.contact}
        imageAlt="Tall rose and baby's breath centerpiece on a reception table"
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex flex-col gap-8">
            <p className="text-ink/70">
              Share a few details and we&apos;ll get back to you with next steps — availability,
              pricing, and ideas for your date.
            </p>

            <div className="flex flex-col gap-3 text-sm text-ink/70">
              <p>
                WhatsApp —{" "}
                <a href="https://wa.me/9779861941354" className="text-coral hover:text-coral-deep">
                  986-1941354
                </a>
              </p>
              <p>Kathmandu, Nepal 44600</p>
              <p>
                <a href="https://www.instagram.com/tasbir.events" className="text-coral hover:text-coral-deep">
                  Instagram
                </a>
                {" · "}
                <a
                  href="https://www.facebook.com/profile.php?id=61590631374369"
                  className="text-coral hover:text-coral-deep"
                >
                  Facebook
                </a>
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-blush">
              <iframe
                title="Tasbir Events location"
                src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
