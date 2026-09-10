"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryItem } from "@/lib/types";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!item) return;

    const count = item.images.length;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % count);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + count) % count);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const hasMultiple = item.images.length > 1;
  const goPrev = () => setIndex((current) => (current - 1 + item.images.length) % item.images.length);
  const goNext = () => setIndex((current) => (current + 1) % item.images.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
      >
        <X className="h-7 w-7" />
      </button>

      {hasMultiple ? (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:left-6"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
      ) : null}

      <div onClick={(event) => event.stopPropagation()} className="relative h-[75vh] w-full max-w-4xl">
        <Image
          src={item.images[index].url}
          alt={item.title}
          fill
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {hasMultiple ? (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:right-6"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      ) : null}

      <p className="absolute bottom-6 text-sm text-white/70">
        {item.title}
        {hasMultiple ? ` — ${index + 1}/${item.images.length}` : ""}
      </p>
    </div>
  );
}
