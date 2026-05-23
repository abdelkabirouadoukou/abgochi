"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";

const stats = [
  { value: "18+", label: "Years forging" },
  { value: "100%", label: "Handmade" },
  { value: "1", label: "Artisan atelier" },
];

export function About() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0.15, 0.45], [60, -40]);

  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="section-divider mx-auto mb-20 max-w-7xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <motion.div style={{ y: imageY }} className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1504148455328-c376907d0c59?w=1200&q=80&auto=format&fit=crop"
            alt="Mohammed in his workshop"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>

        <div>
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.42em] text-muted">
              The Artisan
            </p>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
              Mohammed — keeper of the forge
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
            <p>
              In a quiet atelier outside the Medina, Mohammed shapes steel and
              leather the way his mentors taught him: slowly, deliberately, and
              without compromise.
            </p>
            <p>
              Every blade begins as raw stock, heated, hammered, and refined
              across dozens of manual steps. Leather pieces are cut, beveled,
              and saddle-stitched with waxed thread that ages alongside the
              owner.
            </p>
            <p>
              His work is not driven by volume but by devotion — each piece
              carries the rhythm of the workshop: the anvil, the stitch, the
              final edge drawn across stone.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
