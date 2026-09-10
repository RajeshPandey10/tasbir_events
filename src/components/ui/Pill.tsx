import { ButtonHTMLAttributes } from "react";

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function Pill({ active = false, className = "", ...rest }: PillProps) {
  const stateClasses = active
    ? "border-coral bg-coral text-white"
    : "border-blush text-ink/70 hover:border-coral hover:text-coral";

  return <button className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${stateClasses} ${className}`} {...rest} />;
}
