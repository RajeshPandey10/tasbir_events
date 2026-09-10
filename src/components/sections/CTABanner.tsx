import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CTABanner() {
  return (
    <Section tone="coral">
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-3xl text-white md:text-4xl">Let&apos;s start planning your event.</h2>
        <p className="max-w-xl text-white/80">
          Tell us your date, your venue, and your vision — we&apos;ll take it from there.
        </p>
        <Button href="/contact" variant="white" size="lg">
          Send an inquiry
        </Button>
      </Reveal>
    </Section>
  );
}
