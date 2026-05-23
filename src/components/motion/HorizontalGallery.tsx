"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Slide = { src: string; alt: string; caption?: string };

export function HorizontalGallery({ slides }: { slides: Slide[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? ["0%", "0%"] : ["4%", "-45%"]
  );

  return (
    <div ref={ref} className="relative w-full overflow-x-clip py-6 md:py-8">
      <motion.div
        style={{ x }}
        className="flex w-max gap-4 px-4 sm:gap-6 sm:px-6 md:gap-8 md:px-10"
      >
        {slides.map((slide, i) => (
          <figure
            key={`${slide.src}-${i}`}
            className="cinematic-frame relative h-[50vh] w-[min(85vw,320px)] shrink-0 sm:h-[55vh] sm:w-[70vw] md:h-[65vh] md:w-[38vw]"
          >
            <PremiumImage
              src={slide.src}
              alt={slide.alt}
              sizes="(max-width: 768px) 85vw, 38vw"
              wrapperClassName="absolute inset-0 h-full w-full"
              className="cinematic-img"
            />
            <div className="cinematic-overlay" />
            <div className="cinematic-vignette" />
            {slide.caption ? (
              <figcaption className="caption-luxury absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                {slide.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
