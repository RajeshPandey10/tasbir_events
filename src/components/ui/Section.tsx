import { ReactNode } from "react";
import Container from "./Container";

type Tone = "ivory" | "blush" | "coral" | "ink";

const toneClasses: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  blush: "bg-blush/50 text-ink",
  coral: "bg-coral text-white",
  ink: "bg-ink text-ivory",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  narrow?: boolean;
}

export default function Section({ children, tone = "ivory", className = "", narrow = false }: SectionProps) {
  return (
    <section className={`py-20 md:py-28 ${toneClasses[tone]} ${className}`}>
      <Container className={narrow ? "max-w-3xl" : ""}>{children}</Container>
    </section>
  );
}
