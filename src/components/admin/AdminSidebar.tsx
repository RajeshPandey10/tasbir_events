"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Images, Frame as FrameIcon, MessageSquare, LogOut, Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    router.push("/admin/login");
  };

  const navLinks = (onNavigate?: () => void) => (
    <nav className="mt-10 flex flex-col gap-1">
      {LINKS.map((link) => {
        const Icon = link.icon;
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
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
  );

  const accountBlock = (
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
  );

  return (
    <>
      <header className="flex items-center justify-between border-b border-blush bg-white px-4 py-3 md:hidden">
        <Logo height={30} />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-ink/70 hover:bg-blush/60"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="relative flex h-full w-72 max-w-[80vw] flex-col justify-between bg-white px-6 py-8">
            <div>
              <div className="flex items-center justify-between">
                <Logo height={30} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-md text-ink/70 hover:bg-blush/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-xs text-ink/50">Admin panel</p>
              {navLinks(() => setOpen(false))}
            </div>
            {accountBlock}
          </aside>
        </div>
      ) : null}

      <aside className="hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-blush bg-white px-6 py-8 md:flex">
        <div>
          <Logo />
          <p className="mt-1 text-xs text-ink/50">Admin panel</p>
          {navLinks()}
        </div>
        {accountBlock}
      </aside>
    </>
  );
}
