"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { HeroImageRotator } from "@/components/home/landing/HeroImageRotator";
import { siteConfig } from "@/lib/config";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { whatsappContactUrl } from "@/lib/whatsapp";

type LandingHeroProps = {
  heroImages: string[];
  fallbackImage?: string | null;
};

export function LandingHero({ heroImages, fallbackImage }: LandingHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.06]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, reduced ? 1 : 0.35]);

  const slides =
    heroImages.length > 0
      ? heroImages
      : fallbackImage
        ? [fallbackImage]
        : [];

  return (
    <section
      ref={sectionRef}
      className="landing-hero landing-hero--scroll relative min-h-[100svh] md:min-h-[115vh]"
    >
      <div className="landing-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden />

      <div className="relative mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-6 pb-20 pt-28 md:grid-cols-12 md:gap-8 md:px-12 md:pb-24 md:pt-32">
        {/* Sticky text */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="md:col-span-6 lg:col-span-5"
        >
          <div className="hero-sticky-text flex min-h-[min(92svh,780px)] flex-col justify-center md:sticky md:top-28 md:min-h-[calc(100svh-7rem)]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[11px] font-medium uppercase tracking-[0.45em] text-white/35"
            >
              {siteConfig.brand} · Morocco
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[#f4f1ea] sm:text-6xl lg:text-[4.25rem]"
            >
              {siteConfig.heroHeadline}
              <span className="mt-2 block text-[#c9b896]">{siteConfig.heroSubline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 max-w-md text-base leading-relaxed text-white/50 md:text-lg"
            >
              {siteConfig.heroSupport}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <Link
                href="/#collection"
                className="landing-cta-primary inline-flex min-h-[52px] items-center justify-center px-8 text-[15px] font-medium"
              >
                View Bags
              </Link>
              <a
                href={whatsappContactUrl("Hello ABGOCHI, I would like to get in touch.")}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-cta-secondary inline-flex min-h-[52px] items-center justify-center px-2 text-[15px]"
              >
                Contact on WhatsApp
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrolling image column */}
        <div className="relative md:col-span-6 md:col-start-7 lg:col-span-7">
          <div className="md:sticky md:top-28 md:py-8">
            <motion.div
              style={{
                y: imageY,
                scale: imageScale,
              }}
              className="will-change-transform"
            >
              <div className="landing-hero-frame relative mx-auto aspect-[3/4] w-full max-w-md md:max-w-none">
                <div className="landing-stitch landing-stitch--tl" aria-hidden />
                <div className="landing-stitch landing-stitch--br" aria-hidden />
                <div className="absolute inset-4 overflow-hidden border border-white/[0.07] bg-[#0c0c0c]">
                  <HeroImageRotator images={slides} />
                </div>
                <p className="absolute -bottom-8 right-0 max-w-[12rem] text-right text-[10px] uppercase tracking-[0.25em] text-white/25">
                  {siteConfig.artisanDisplayName}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/30 md:left-12"
      >
        <span className="h-px w-8 bg-white/20" />
        Story
      </motion.a>
    </section>
  );
}
