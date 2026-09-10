"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Images, Frame as FrameIcon, MessageSquare, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { api } from "@/lib/api";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/frames", label: "Frames", icon: FrameIcon },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    router.push("/admin/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col justify-between border-r border-blush bg-white px-6 py-8">
      <div>
        <Logo />
        <p className="mt-1 text-xs text-ink/50">Admin panel</p>

        <nav className="mt-10 flex flex-col gap-1">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-blush text-coral-deep" : "text-ink/70 hover:bg-blush/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-blush pt-6">
        <p className="text-xs text-ink/50">Signed in as</p>
        <p className="text-sm text-ink">{adminName}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 self-start text-sm text-coral hover:text-coral-deep"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
