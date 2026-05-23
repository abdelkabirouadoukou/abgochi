import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { whatsappContactUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  {
    href: whatsappContactUrl("Hello ABGOCHI, I would like to get in touch."),
    label: "Contact WhatsApp",
    external: true,
  },
];

const socialLinks = [
  {
    href: siteConfig.instagram,
    label: "Instagram",
    external: true,
  },
  {
    href: whatsappContactUrl(),
    label: "WhatsApp",
    external: true,
  },
];

export function StoreFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-premium border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
          <div>
            <p className="font-serif text-3xl tracking-wide text-white md:text-4xl">
              {siteConfig.brand}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              Handmade by a father. Crafted with care.
            </p>
          </div>

          <div>
            <p className="footer-label">Navigate</p>
            <ul className="mt-6 space-y-4">
              {navLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="footer-label">Social</p>
            <ul className="mt-6 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-divider mt-16" />

        <div className="mt-8 flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.brand}. All rights reserved.</p>
          <p>{siteConfig.artisanDisplayName} · Morocco</p>
        </div>
      </div>
    </footer>
  );
}
