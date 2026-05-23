"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Magnetic } from "@/components/motion/Magnetic";

const links = [
  { href: "/", label: "Home" },
  { href: "/#story", label: "Story" },
  { href: "/#collection", label: "Bags" },
];

export function CinematicHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ["rgba(5,5,5,0)", "rgba(5,5,5,0.9)"]);

  return (
    <motion.header
      style={{ backgroundColor: bg }}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-md transition-colors data-[scrolled]:border-white/5"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 md:px-12 md:py-6">
        <Magnetic>
          <Link href="/" className="shrink-0 text-base font-semibold tracking-wide text-white sm:text-lg">
            {siteConfig.brand}
          </Link>
        </Magnetic>
        <nav className="flex shrink-0 items-center gap-4 sm:gap-6 md:gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-xs transition sm:text-sm ${
                pathname === link.href ? "text-accent" : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
