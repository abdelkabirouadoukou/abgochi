"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { usePrefersReducedMotion } from "@/lib/hooks";

const INTERVAL_MS = 5500;

type HeroImageRotatorProps = {
  images: string[];
};

function HeroImageRotatorComponent({ images }: HeroImageRotatorProps) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (images.length <= 1 || reduced) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length, reduced]);

  if (images.length === 0) {
    return (
      <div className="flex h-full flex-col justify-end bg-gradient-to-t from-[#141210] via-[#0a0a0a] to-[#050505] p-8">
        <p className="font-serif text-3xl text-white/20">ABGOCHI</p>
        <p className="mt-2 text-sm text-white/30">Add hero images in admin</p>
      </div>
    );
  }

  const current = images[index] ?? images[0];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={reduced ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <PremiumImage
            src={current}
            alt=""
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 45vw"
            wrapperClassName="absolute inset-0 h-full w-full"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
      {images.length > 1 && !reduced ? (
        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 w-6 rounded-full transition-colors duration-500 ${
                i === index ? "bg-[#c9b896]" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export const HeroImageRotator = memo(HeroImageRotatorComponent);
