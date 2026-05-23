"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { StoreSideMenu } from "@/components/store/StoreSideMenu";

export function LandingNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(5,5,5,0)", "rgba(5,5,5,0.88)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backgroundColor: headerBg,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: borderColor,
        }}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-5 sm:px-6 md:px-12 md:py-6">
          <Link
            href="/"
            className="font-serif text-lg tracking-wide text-[#f4f1ea] transition hover:text-[#c9b896] sm:text-xl"
          >
            {siteConfig.brand}
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-sm border border-white/10 transition hover:border-[#c9b896]/40"
          >
            <span className="block h-px w-5 bg-white/80 transition group-hover:bg-[#c9b896]" />
            <span className="block h-px w-5 bg-white/80 transition group-hover:bg-[#c9b896]" />
            <span className="block h-px w-3 bg-white/50 transition group-hover:w-5 group-hover:bg-[#c9b896]" />
          </button>
        </div>
      </motion.header>

      <StoreSideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
