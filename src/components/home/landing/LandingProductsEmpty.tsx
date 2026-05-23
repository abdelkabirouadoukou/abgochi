"use client";

import { motion } from "framer-motion";
import { whatsappContactUrl } from "@/lib/whatsapp";

export function LandingProductsEmpty() {
  return (
    <section
      id="collection"
      className="scroll-mt-24 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-12 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Collection</p>
        <h2 className="mt-4 font-serif text-4xl text-[#f4f1ea] md:text-5xl">Bags</h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="landing-empty-state relative mt-14 overflow-hidden px-8 py-20 md:px-16 md:py-28"
        >
          <div className="landing-grain pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c9b896]/[0.06] via-transparent to-transparent"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <motion.p
              className="text-[11px] uppercase tracking-[0.5em] text-white/30"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              BAGS COMING SOON
            </motion.p>
            <h3 className="mt-8 font-serif text-3xl leading-snug text-[#f4f1ea] md:text-5xl">
              Handmade pieces are being crafted.
            </h3>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/45">
              The workshop is quiet for now — new bags will appear here when they are ready.
            </p>
            <a
              href={whatsappContactUrl("Hello ABGOCHI, I am interested in your bags.")}
              target="_blank"
              rel="noopener noreferrer"
              className="landing-cta-primary mt-10 inline-flex min-h-[52px] items-center justify-center px-10"
            >
              Ask on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
