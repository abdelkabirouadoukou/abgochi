"use client";

import { useAuth } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "@/lib/config";

type StoreSideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function StoreSideMenu({ open, onClose }: StoreSideMenuProps) {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const onHome = pathname === "/";

  const items = [
    { href: "/", label: "Home" },
    { href: onHome ? "/#collection" : "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#process", label: "Process" },
    { href: "/#contact", label: "Contact" },
  ];

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[90] flex h-full w-[min(100%,320px)] flex-col border-l border-white/[0.08] bg-[#080808] px-8 py-10 sm:w-[360px]"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between">
              <p className="font-serif text-xl text-[#f4f1ea]">{siteConfig.brand}</p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center text-white/50 transition hover:text-white"
                aria-label="Close"
              >
                <span className="text-2xl leading-none">×</span>
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-1">
              {items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block border-b border-white/[0.06] py-5 font-serif text-2xl text-white/80 transition hover:text-[#c9b896] sm:text-3xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {isSignedIn ? (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                >
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="mt-4 block py-4 text-sm uppercase tracking-[0.2em] text-[#c9b896] transition hover:text-white"
                  >
                    Admin
                  </Link>
                </motion.div>
              ) : null}
            </nav>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
