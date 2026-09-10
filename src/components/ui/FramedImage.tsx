import Image from "next/image";
import { FrameType, GalleryImage } from "@/lib/types";

interface FramedImageProps {
  images: GalleryImage[];
  alt: string;
  frameType?: FrameType;
  frameImageUrl?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M2 2c8 0 14 2 18 6s6 10 6 18M2 2v10M2 2h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FramedImage({
  images,
  alt,
  frameType = "none",
  frameImageUrl,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: FramedImageProps) {
  const cover = images[0]?.url;
  if (!cover) return null;

  if (frameType === "polaroid") {
    return (
      <div className={`relative h-full w-full bg-white p-3 pb-9 shadow-md ${className}`}>
        <div className="relative h-full w-full overflow-hidden">
          <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
    );
  }

  if (frameType === "gold-hairline") {
    return (
      <div className={`relative h-full w-full border border-gold/60 p-1.5 ${className}`}>
        <div className="relative h-full w-full overflow-hidden">
          <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
    );
  }

  if (frameType === "ornate") {
    return (
      <div className={`relative h-full w-full overflow-hidden border border-gold/40 ${className}`}>
        <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <CornerFlourish className="absolute left-1.5 top-1.5 h-6 w-6 text-gold" />
        <CornerFlourish className="absolute right-1.5 top-1.5 h-6 w-6 rotate-90 text-gold" />
        <CornerFlourish className="absolute right-1.5 bottom-1.5 h-6 w-6 rotate-180 text-gold" />
        <CornerFlourish className="absolute left-1.5 bottom-1.5 h-6 w-6 -rotate-90 text-gold" />
      </div>
    );
  }

  if (frameType === "custom" && frameImageUrl) {
    return (
      <div className={`relative h-full w-full overflow-hidden ${className}`}>
        <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Image
          src={frameImageUrl}
          alt=""
          fill
          sizes={sizes}
          aria-hidden
          className="pointer-events-none object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image src={cover} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-105" />
    </div>
  );
}
