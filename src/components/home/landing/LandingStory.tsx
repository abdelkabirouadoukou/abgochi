"use client";

import { motion } from "framer-motion";
import { aboutMohammed, siteConfig } from "@/lib/config";

export function LandingStory() {
  return (
    <section id="story" className="scroll-mt-24 border-t border-white/[0.06] bg-[#080808]">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-6 py-24 md:grid-cols-12 md:gap-8 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 md:pt-12"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">The craft</p>
          <h2 className="mt-5 font-serif text-4xl text-[#f4f1ea] md:text-5xl">
            {aboutMohammed.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 md:col-start-6"
        >
          <blockquote className="border-l border-[#c9b896]/40 pl-8 font-serif text-2xl leading-snug text-white/80 md:text-3xl">
            {aboutMohammed.pullQuote}
          </blockquote>
          <p className="mt-10 max-w-2xl text-lg leading-[1.75] text-white/55">
            {aboutMohammed.text}
          </p>
          <p className="mt-8 text-sm text-white/35">
            {siteConfig.brand} — authenticity, human hands, honest materials.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
