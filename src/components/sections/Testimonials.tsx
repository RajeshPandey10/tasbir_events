import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const TESTIMONIALS = [
  {
    quote: "Every detail matched exactly what we pictured for our reception, down to the color of the drapes.",
    name: "A recent bride, Kathmandu",
  },
  {
    quote: "They managed the whole stage and lighting setup for our company's anniversary without a single hitch.",
    name: "Corporate client",
  },
  {
    quote: "Our engagement felt effortless because the decoration was already exactly what we wanted.",
    name: "A recent couple",
  },
];

export default function Testimonials() {
  return (
    <Section tone="blush">
      <SectionHeading eyebrow="Kind words" title="What clients say" align="center" />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal
            key={testimonial.name}
            delay={index * 0.1}
            className="relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm"
          >
            <svg viewBox="0 0 32 24" className="h-8 w-10 text-gold/50" fill="currentColor" aria-hidden>
              <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.2C9.6 4.8 6.4 8 6.4 12h6.4v12H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4L32 3.2c-4.8 1.6-8 4.8-8 8.8h6.4v12H17.6Z" />
            </svg>
            <p className="font-display text-lg leading-relaxed text-ink">{testimonial.quote}</p>
            <p className="mt-auto text-sm text-ink/50">{testimonial.name}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
