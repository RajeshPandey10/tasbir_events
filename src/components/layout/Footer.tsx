import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/social";

const EXPLORE_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_ICON_LINKS = [
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SOCIAL_LINKS.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SOCIAL_LINKS.tiktok, label: "TikTok", Icon: TikTokIcon },
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
            <a href={SOCIAL_LINKS.whatsapp} className="flex items-center gap-2 hover:text-coral">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp — {SOCIAL_LINKS.whatsappLabel}
            </a>
            <p>Kathmandu, Nepal 44600</p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_ICON_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-blush text-ink/60 transition-colors hover:border-coral hover:text-coral"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-blush px-6 py-6 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} Tasbir Events. All rights reserved.
      </div>
    </footer>
  );
}
