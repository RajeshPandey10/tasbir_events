"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FramedImage from "@/components/ui/FramedImage";
import Skeleton from "@/components/ui/Skeleton";
import Reveal from "@/components/ui/Reveal";
import { api } from "@/lib/api";
import { GalleryItem } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/stockImages";

const FALLBACK_ENTRIES = Object.entries(CATEGORY_IMAGES).slice(0, 6);

export default function FeaturedGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<GalleryItem[]>("/gallery")
      .then((data) => setItems(data.filter((item) => item.isFeatured).slice(0, 6)))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section tone="blush">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Recent work" title="Recent celebrations" />
        <Button href="/gallery" variant="ghost">
          View full gallery →
        </Button>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <Skeleton key={index} className="aspect-square w-full" />
            ))
          : items.length > 0
            ? items.map((item, index) => (
                <Reveal
                  key={item._id}
                  delay={(index % 3) * 0.08}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Link href={`/gallery?category=${item.category}`} className="block h-full w-full">
                    <FramedImage
                      images={item.images}
                      alt={item.title}
                      frameType={item.frameType}
                      frameImageUrl={item.frameImageUrl}
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </Link>
                </Reveal>
              ))
            : FALLBACK_ENTRIES.map(([category, src], index) => (
                <Reveal
                  key={category}
                  delay={(index % 3) * 0.08}
                  className="relative aspect-square overflow-hidden rounded-xl"
                >
                  <Link href={`/gallery?category=${category}`} className="group block h-full w-full">
                    <Image
                      src={src}
                      alt="Event decoration by Tasbir Events"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </Reveal>
              ))}
      </div>
    </Section>
  );
}
