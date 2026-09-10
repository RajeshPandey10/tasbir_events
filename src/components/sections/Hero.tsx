import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FullBleedImage from "@/components/ui/FullBleedImage";
import Flourish from "@/components/ui/Flourish";
import Reveal from "@/components/ui/Reveal";
import { PAGE_IMAGES } from "@/lib/stockImages";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <FullBleedImage
        src={PAGE_IMAGES.hero}
        alt="Crystal chandelier and white floral wedding décor"
        priority
        className="absolute inset-0 animate-ken-burns"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <Container className="relative z-10 pb-24 pt-40">
        <Reveal>
          <Flourish className="mb-5 opacity-90" />
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
            Kathmandu · Wedding &amp; Event Design
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-white md:text-6xl">
            Turning every event into a memory.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Tasbir Events designs weddings, engagements, receptions, and celebrations from concept
            through the final flower — one team, one vision, from your first conversation to the
            last dance.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/contact" size="lg">
              Plan your event
            </Button>
            <Button href="/gallery" variant="outline" size="lg" className="text-white">
              View our work
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
