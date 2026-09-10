"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GalleryItem } from "@/lib/types";

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

function LightboxContent({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = item.images.length;
  const hasMultiple = count > 1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % count);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + count) % count);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count, onClose]);

  const goPrev = () => setIndex((current) => (current - 1 + count) % count);
  const goNext = () => setIndex((current) => (current + 1) % count);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink/90 p-4 sm:p-10"
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
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:left-6"
        >
          <ChevronLeft className="h-9 w-9" />
        </button>
      ) : null}

      <div
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-[70vh] w-full max-w-4xl overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image src={item.images[index].url} alt={item.title} fill sizes="100vw" className="object-contain" />
          </motion.div>
        </AnimatePresence>
      </div>

      {hasMultiple ? (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 text-white/80 transition-colors hover:text-white sm:right-6"
        >
          <ChevronRight className="h-9 w-9" />
        </button>
      ) : null}

      <div onClick={(event) => event.stopPropagation()} className="mt-4 flex flex-col items-center gap-3">
        {hasMultiple ? (
          <div className="flex gap-2">
            {item.images.map((image, thumbIndex) => (
              <button
                key={image.cloudinaryId + thumbIndex}
                onClick={() => setIndex(thumbIndex)}
                aria-label={`View photo ${thumbIndex + 1}`}
                className={`relative h-12 w-12 overflow-hidden rounded-md transition-opacity ${
                  thumbIndex === index ? "opacity-100 ring-2 ring-white" : "opacity-50 hover:opacity-80"
                }`}
              >
                <Image src={image.url} alt="" fill className="object-cover" sizes="48px" />
              </button>
            ))}
          </div>
        ) : null}
        <p className="text-sm text-white/70">
          {item.title}
          {hasMultiple ? ` — ${index + 1}/${count}` : ""}
        </p>
      </div>
    </motion.div>
  );
}

export default function GalleryLightbox({ item, onClose }: GalleryLightboxProps) {
  return (
    <AnimatePresence>
      {item ? <LightboxContent key={item._id} item={item} onClose={onClose} /> : null}
    </AnimatePresence>
  );
}
