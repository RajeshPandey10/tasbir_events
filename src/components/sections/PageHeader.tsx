import Container from "@/components/ui/Container";
import FullBleedImage from "@/components/ui/FullBleedImage";
import PhotoScrim from "@/components/ui/PhotoScrim";
import Reveal from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}

export default function PageHeader({ eyebrow, title, description, image, imageAlt }: PageHeaderProps) {
  return (
    <section className="relative flex h-[52vh] min-h-95 items-end overflow-hidden">
      <FullBleedImage src={image} alt={imageAlt} priority className="absolute inset-0" />
      <PhotoScrim />

      <Container className="relative z-10 pb-16 pt-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/90 drop-shadow-md">{eyebrow}</p>
          <h1 className="mt-4 max-w-2xl font-display text-3xl leading-tight text-white drop-shadow-lg md:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-xl text-white/90 drop-shadow-md">{description}</p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
