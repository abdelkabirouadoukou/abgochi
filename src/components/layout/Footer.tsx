import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";

const footerLinks = [
  { href: "#collection", label: "Collection" },
  { href: "#about", label: "Artisan" },
  { href: "#gallery", label: "Gallery" },
  { href: "#custom", label: "Custom Orders" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-light tracking-[0.1em] text-white">
            {siteConfig.brand}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.42em] text-muted">
            Handcrafted in Morocco · {siteConfig.tagline}
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
            Traditional knives and leather goods forged by hand for collectors,
            chefs, and artisans who value permanence over mass production.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-muted">
            Navigate
          </p>
          <ul className="space-y-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-muted">
            Contact
          </p>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a
                href={whatsappUrl("Hello Atelier Mohammed")}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition-colors hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="section-divider mx-auto mt-14 max-w-7xl" />

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 text-[11px] uppercase tracking-[0.28em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {siteConfig.brand}</p>
        <p>Crafted with intention</p>
      </div>
    </footer>
  );
}
