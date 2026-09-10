import { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({ className = "", style }: SkeletonProps) {
  return <div style={style} className={`animate-pulse rounded-md bg-blush/70 ${className}`} />;
}

export function SkeletonGalleryGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-10 columns-1 gap-4 sm:columns-2 md:columns-3">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="mb-4 w-full break-inside-avoid" style={{ aspectRatio: "4 / 5" }} />
      ))}
    </div>
  );
}

export function SkeletonRows({ count = 4, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
}
