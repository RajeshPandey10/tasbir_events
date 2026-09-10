interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const markClasses = variant === "light" ? "bg-white/15 text-white" : "bg-coral text-white";
  const wordmarkClass = variant === "light" ? "text-white" : "text-ink";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg font-display text-lg font-semibold ${markClasses}`}
      >
        T
      </span>
      <span className={`font-display text-lg tracking-wide ${wordmarkClass}`}>Tasbir Events</span>
    </span>
  );
}
