"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-blush bg-ivory/95 backdrop-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/">
          <Logo variant={solid ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const activeColor = solid ? "text-coral" : "text-white";
            const inactiveColor = solid ? "text-ink/70 hover:text-coral" : "text-white/80 hover:text-white";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${pathname === link.href ? activeColor : inactiveColor}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Button href="/contact" size="md">
            Get a quote
          </Button>
        </nav>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`h-px w-6 transition-colors ${solid ? "bg-ink" : "bg-white"}`} />
          <span className={`h-px w-6 transition-colors ${solid ? "bg-ink" : "bg-white"}`} />
          <span className={`h-px w-6 transition-colors ${solid ? "bg-ink" : "bg-white"}`} />
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-blush bg-ivory px-6 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 text-sm text-ink/80"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/contact" size="md" className="mt-2 self-start">
            Get a quote
          </Button>
        </nav>
      ) : null}
    </header>
  );
}
