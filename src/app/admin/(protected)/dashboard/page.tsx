"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Images, Inbox, MessageSquare } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { GalleryItem, Inquiry } from "@/lib/types";

export default function AdminDashboardPage() {
  const [galleryCount, setGalleryCount] = useState<number | null>(null);
  const [newInquiries, setNewInquiries] = useState<number | null>(null);
  const [totalInquiries, setTotalInquiries] = useState<number | null>(null);

  useEffect(() => {
    api.get<GalleryItem[]>("/gallery").then((items) => setGalleryCount(items.length));
    api.get<Inquiry[]>("/inquiries").then((items) => {
      setTotalInquiries(items.length);
      setNewInquiries(items.filter((item) => item.status === "new").length);
    });
  }, []);

  const stats = [
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries", icon: Inbox },
    { label: "Total inquiries", value: totalInquiries, href: "/admin/inquiries", icon: MessageSquare },
    { label: "Gallery items", value: galleryCount, href: "/admin/gallery", icon: Images },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Dashboard</h1>
      <p className="mt-2 text-sm text-ink/60">A quick look at what needs attention.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="flex items-center gap-4 rounded-2xl border border-blush bg-white px-6 py-8 transition-colors hover:border-coral"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral-deep">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                {stat.value === null ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p className="font-display text-3xl text-ink">{stat.value}</p>
                )}
                <p className="mt-1 text-sm text-ink/60">{stat.label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
