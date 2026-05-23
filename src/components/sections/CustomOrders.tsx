"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { customOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function CustomOrders() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.5, 0.75], [1.08, 1]);

  return (
    <section id="custom" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="section-divider mx-auto mb-20 max-w-7xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.42em] text-muted">
            Bespoke Commissions
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight text-white sm:text-5xl">
            Custom pieces, shaped to your story
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Request a personalized knife profile, leather carry system, or
            heirloom set. Mohammed works directly with each client — from steel
            selection and handle wood to stitching pattern and hardware finish.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            <li>— Custom blade geometry & steel choice</li>
            <li>— Handle woods sourced and shaped by hand</li>
            <li>— Monogrammed leather sheaths & folios</li>
            <li>— Workshop updates throughout the build</li>
          </ul>
          <div className="mt-10">
            <Button
              href={whatsappUrl(customOrderMessage())}
              external
            >
              Request a Custom Piece
            </Button>
          </div>
        </FadeIn>

        <motion.div style={{ scale }} className="relative aspect-[5/4] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&auto=format&fit=crop"
            alt="Custom order craftsmanship"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
