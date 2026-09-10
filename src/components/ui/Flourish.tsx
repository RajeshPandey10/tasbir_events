interface FlourishProps {
  align?: "left" | "center";
  className?: string;
}

export default function Flourish({ align = "left", className = "" }: FlourishProps) {
  const justify = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex items-center gap-3 ${justify} ${className}`}>
      <span className="h-px w-8 bg-gold/70" />
      <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold" fill="currentColor" aria-hidden>
        <path d="M12 0c0 4.4 3.1 8 7 8-3.9 0-7 3.6-7 8 0-4.4-3.1-8-7-8 3.9 0 7-3.6 7-8Z" />
      </svg>
      <span className="h-px w-8 bg-gold/70" />
    </div>
  );
}
