import Image from "next/image";

interface FullBleedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function FullBleedImage({ src, alt, className = "", priority = false }: FullBleedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="100vw"
      className={`object-cover ${className}`}
    />
  );
}
