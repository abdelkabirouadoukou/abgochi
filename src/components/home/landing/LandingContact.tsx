"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { whatsappContactUrl } from "@/lib/whatsapp";

export function LandingContact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[90rem] px-6 py-24 md:px-12 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="landing-contact-band relative overflow-hidden px-8 py-16 md:px-16 md:py-20"
        >
          <div className="landing-grain pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
          <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Contact</p>
              <h2 className="mt-5 font-serif text-3xl text-[#f4f1ea] md:text-4xl">
                A message is enough to start.
              </h2>
              <p className="mt-4 max-w-md text-white/50">
                Orders and questions go through WhatsApp — direct, simple, human.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:items-end">
              <a
                href={whatsappContactUrl("Hello ABGOCHI, I would like to order a bag.")}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-cta-primary inline-flex min-h-[56px] w-full items-center justify-center px-8 text-base font-medium sm:w-auto"
              >
                Contact on WhatsApp
              </a>
              <p className="text-sm text-white/35 sm:text-right">
                {siteConfig.artisanDisplayName} · {siteConfig.brand}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
