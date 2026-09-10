"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Pill from "@/components/ui/Pill";
import FramedImage from "@/components/ui/FramedImage";
import { SkeletonGalleryGrid } from "@/components/ui/Skeleton";
import GalleryLightbox from "@/components/site/GalleryLightbox";
import { GALLERY_CATEGORIES, GalleryCategory, GalleryItem } from "@/lib/types";
import { api } from "@/lib/api";
import { CATEGORY_IMAGES, CATEGORY_IMAGE_LIST } from "@/lib/stockImages";

function isGalleryCategory(value: string | null): value is GalleryCategory {
  return GALLERY_CATEGORIES.some((c) => c.value === value);
}

export default function GalleryMasonry() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const [category, setCategory] = useState<GalleryCategory | "all">(
    isGalleryCategory(requestedCategory) ? requestedCategory : "all"
  );
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const path = category === "all" ? "/gallery" : `/gallery?category=${category}`;
    api
      .get<GalleryItem[]>(path)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [category]);

  const selectCategory = (value: GalleryCategory | "all") => {
    setCategory(value);
    router.replace(value === "all" ? "/gallery" : `/gallery?category=${value}`, { scroll: false });
  };

  const fallbackImages = category === "all" ? CATEGORY_IMAGE_LIST : [CATEGORY_IMAGES[category]];

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Pill active={category === "all"} onClick={() => selectCategory("all")}>
          All
        </Pill>
        {GALLERY_CATEGORIES.map((c) => (
          <Pill key={c.value} active={category === c.value} onClick={() => selectCategory(c.value)}>
            {c.label}
          </Pill>
        ))}
      </div>

      {loading ? (
        <SkeletonGalleryGrid />
      ) : items.length === 0 ? (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 md:columns-3">
          {fallbackImages.map((src, index) => (
            <div key={src} className="mb-4 break-inside-avoid overflow-hidden rounded-xl bg-blush">
              <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
                <Image
                  src={src}
                  alt="Event decoration by Tasbir Events"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 columns-1 gap-4 sm:columns-2 md:columns-3">
          {items.map((item) => (
            <button
              key={item._id}
              onClick={() => setActiveItem(item)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl text-left"
              type="button"
            >
              <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}>
                <FramedImage
                  images={item.images}
                  alt={item.title}
                  frameType={item.frameType}
                  frameImageUrl={item.frameImageUrl}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {item.images.length > 1 ? (
                  <span className="absolute bottom-2 right-2 rounded-full bg-ink/60 px-2.5 py-1 text-xs text-white">
                    +{item.images.length - 1}
                  </span>
                ) : null}
              </div>
            </button>
          ))}
        </div>
      )}

      <GalleryLightbox key={activeItem?._id ?? "closed"} item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
