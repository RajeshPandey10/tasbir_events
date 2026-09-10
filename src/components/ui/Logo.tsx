import Image from "next/image";

const ASPECT_RATIO = 900 / 170;

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  height?: number;
}

export default function Logo({ variant = "dark", className = "", height = 36 }: LogoProps) {
  const src = variant === "light" ? "/brand/logo-horizontal-white.png" : "/brand/logo-horizontal-coral.png";
  const width = Math.round(height * ASPECT_RATIO);

  return (
    <Image
      src={src}
      alt="Tasbir Events"
      width={width}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
