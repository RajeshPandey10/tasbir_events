import Flourish from "@/components/ui/Flourish";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  const eyebrowColor = tone === "dark" ? "text-coral-deep" : "text-white/80";
  const titleColor = tone === "dark" ? "text-ink" : "text-white";
  const descriptionColor = tone === "dark" ? "text-ink/70" : "text-white/80";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClass}`}>
      {eyebrow ? (
        <p className={`text-xs font-medium uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`font-display text-3xl leading-tight md:text-4xl ${titleColor}`}>{title}</h2>
      <Flourish align={align} />
      {description ? <p className={`text-base leading-relaxed ${descriptionColor}`}>{description}</p> : null}
    </div>
  );
}
