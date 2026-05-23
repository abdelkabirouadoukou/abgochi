"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "abgochi-visited";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visited =
      typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY);
    if (visited) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-2xl tracking-wide text-[#f4f1ea]">ABGOCHI</p>
          <div className="h-px w-16 animate-pulse bg-[#c9b896]/50" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
