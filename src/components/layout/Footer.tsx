import Link from "next/link";
import Logo from "@/components/ui/Logo";

const EXPLORE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-blush bg-blush/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:px-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink/70">
            Turning every event into a memory. Wedding, engagement, and celebration design across Kathmandu.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink/70">
            {EXPLORE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-coral">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-ink">Reach us</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-ink/70">
            <a href="https://wa.me/9779861941354" className="hover:text-coral">
              WhatsApp — 986-1941354
            </a>
            <a href="https://www.instagram.com/tasbir.events" className="hover:text-coral">
              Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590631374369" className="hover:text-coral">
              Facebook
            </a>
            <p>Kathmandu, Nepal 44600</p>
          </div>
        </div>
      </div>

      <div className="border-t border-blush px-6 py-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Tasbir Events. All rights reserved.
      </div>
    </footer>
  );
}
