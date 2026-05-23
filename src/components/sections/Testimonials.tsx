"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Testimonials"
          title="Voices from the workbench"
          align="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col justify-between border border-white/10 bg-[#0a0a0a] p-8"
            >
              <p className="font-display text-2xl font-light leading-snug text-white/90">
                “{item.quote}”
              </p>
              <footer className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-white">{item.author}</p>
                {item.location ? (
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-muted">
                    {item.location}
                  </p>
                ) : null}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
