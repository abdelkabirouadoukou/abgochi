"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/data";

const links = [
  { href: "#collection", label: "Collection" },
  { href: "#about", label: "Artisan" },
  { href: "#gallery", label: "Gallery" },
  { href: "#custom", label: "Custom" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(
    scrollY,
    [0, 120],
    ["rgba(5,5,5,0)", "rgba(5,5,5,0.92)"]
  );
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );

  return (
    <motion.header
      style={{ backgroundColor: background, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group">
          <p className="font-display text-xl font-light tracking-[0.12em] text-white transition-opacity group-hover:opacity-70">
            {siteConfig.brand}
          </p>
          <p className="text-[9px] uppercase tracking-[0.45em] text-muted">
            {siteConfig.tagline}
          </p>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.32em] text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-4 bg-white/70" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-black md:hidden"
          >
            <nav className="flex flex-col gap-6 px-6 py-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.3em] text-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
