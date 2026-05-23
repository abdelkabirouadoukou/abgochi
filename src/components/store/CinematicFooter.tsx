"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { whatsappContactUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#collection", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function CinematicFooter() {
  const year = new Date().getFullYear();
  const instagram = siteConfig.instagram?.trim();

  return (
    <footer className="footer-cinematic relative overflow-hidden border-t border-white/[0.06]">
      <motion.div
        className="footer-cinematic-glow pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="landing-grain pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="font-serif text-5xl tracking-tight text-[#f4f1ea] md:text-7xl lg:text-8xl">
            {siteConfig.brand}
          </p>
          <p className="mt-6 font-serif text-xl leading-snug text-[#c9b896]/90 md:text-2xl">
            Made slowly. By human hands.
          </p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/45">
            {siteConfig.tagline} Each bag is sewn in Morocco by {siteConfig.artisanDisplayName}.
          </p>
        </motion.div>

        <div className="footer-divider my-14 md:my-16" />

        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-20">
          <div>
            <p className="footer-label mb-5">Navigate</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link uppercase tracking-[0.15em]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 sm:items-end">
            <div>
              <p className="footer-label mb-4 text-right sm:text-left lg:text-right">Contact</p>
              <a
                href={whatsappContactUrl("Hello ABGOCHI")}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-cta-primary inline-flex min-h-[52px] items-center justify-center px-10 text-sm font-medium"
              >
                WhatsApp
              </a>
            </div>
            <div className="sm:text-right lg:text-right">
              <p className="footer-label mb-3">Social</p>
              <ul className="flex flex-wrap gap-6 sm:justify-end">
                {instagram ? (
                  <li>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                    >
                      Instagram
                    </a>
                  </li>
                ) : (
                  <li>
                    <span className="footer-link cursor-default opacity-40">Instagram</span>
                  </li>
                )}
                <li>
                  <span className="footer-link cursor-default opacity-40">Facebook</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-divider mt-14 md:mt-16" />

        <div className="mt-10 flex flex-col gap-3 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brand} · {siteConfig.artisanDisplayName}
          </p>
          <p>Morocco · Handmade fabric bags</p>
        </div>
      </div>
    </footer>
  );
}
