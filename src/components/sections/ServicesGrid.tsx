import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/types";
import { SERVICE_IMAGES } from "@/lib/stockImages";

export default function ServicesGrid() {
  return (
    <Section tone="ivory">
      <SectionHeading eyebrow="What we design" title="Every celebration, one cohesive vision." />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <Reveal key={service.title} delay={(index % 3) * 0.08}>
            <Link
              href={`/gallery?category=${service.category}`}
              className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-2xl"
            >
              <Image
                src={SERVICE_IMAGES[service.title]}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent transition-opacity group-hover:from-black/90" />

              <div className="relative z-10 flex flex-col gap-2 p-6">
                <h3 className="font-display text-xl text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {service.description}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-gold">
                  See examples
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
