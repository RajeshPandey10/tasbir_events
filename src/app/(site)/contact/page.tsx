import type { Metadata } from "next";
import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/site/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { PAGE_IMAGES } from "@/lib/stockImages";
import { SOCIAL_LINKS } from "@/lib/social";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tasbir Events in Kathmandu for wedding, engagement, and event decoration inquiries — by form, WhatsApp, or social media.",
  alternates: { canonical: "/contact" },
};

const SOCIAL_ICON_LINKS = [
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL_LINKS.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL_LINKS.tiktok, label: "TikTok", Icon: TikTokIcon },
];

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
              <a href={SOCIAL_LINKS.whatsapp} className="flex items-center gap-2 text-coral hover:text-coral-deep">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp — {SOCIAL_LINKS.whatsappLabel}
              </a>
              <p>Kathmandu, Nepal 44600</p>
            </div>

            <div className="flex items-center gap-3">
              {SOCIAL_ICON_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blush text-ink/60 transition-colors hover:border-coral hover:text-coral"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
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
