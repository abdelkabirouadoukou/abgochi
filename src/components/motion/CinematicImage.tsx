"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { usePrefersReducedMotion } from "@/lib/hooks";

type CinematicImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  parallax?: number;
  sizes?: string;
  fillParent?: boolean;
};

export function CinematicImage({
  src,
  alt,
  priority,
  className = "",
  aspect = "aspect-[4/5]",
  parallax = 50,
  sizes = "100vw",
  fillParent = false,
}: CinematicImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [0, 0] : [parallax * 0.35, -parallax * 0.35]
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.05, 1]);

  return (
    <div
      ref={ref}
      className={`cinematic-frame ${fillParent ? "absolute inset-0 h-full w-full" : aspect} ${className}`}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <PremiumImage
          src={src}
          alt={alt}
          priority={priority}
          sizes={sizes}
          wrapperClassName="absolute inset-0 h-full w-full"
          className="cinematic-img"
        />
      </motion.div>
      <div className="cinematic-overlay" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
      <div className="cinematic-grain" aria-hidden="true" />
    </div>
  );
}
