"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { ProductDTO } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";
import { WhatsAppOrderModal } from "@/components/whatsapp/WhatsAppOrderModal";

type Props = {
  product: ProductDTO;
  index?: number;
  large?: boolean;
};

export function EditorialProductCard({ product, index = 0, large }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const reduced = usePrefersReducedMotion();
  const desktop = useIsDesktop();
  const image = product.images[0];
  const inStock = product.stock > 0;

  return (
    <>
      <motion.article
        initial={reduced ? false : { opacity: 0, y: 28 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className={`group min-w-0 ${large ? "md:col-span-2" : ""}`}
      >
        <Link href={`/products/${product.slug}`} className="block">
          <div
            className={`cinematic-frame relative overflow-hidden ${
              large ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[4/5]"
            }`}
          >
            {image ? (
              <PremiumImage
                src={image}
                alt={product.name}
                sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 50vw"}
                wrapperClassName="absolute inset-0 h-full w-full"
                className={`cinematic-img transition duration-700 ${desktop ? "group-hover:scale-[1.03]" : ""}`}
              />
            ) : (
              <div className="flex h-full min-h-[240px] items-center justify-center bg-white/5 text-white/30">
                No image
              </div>
            )}
            <div className="cinematic-overlay" />
            <div className="cinematic-vignette" />
          </div>
        </Link>
        <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-display text-xl text-white transition hover:text-accent sm:text-2xl md:text-3xl">
                {product.name}
              </h3>
            </Link>
            <p className="body-luxury mt-2 line-clamp-2 text-sm">{product.description}</p>
          </div>
          <p className="price-luxury shrink-0 text-lg sm:text-xl">
            {formatPrice(product.price)} MAD
          </p>
        </div>
        <button
          type="button"
          disabled={!inStock}
          onClick={() => setModalOpen(true)}
          className="btn-primary mt-5 w-full disabled:opacity-40 sm:mt-6"
        >
          {inStock ? "Buy on WhatsApp" : "Out of stock"}
        </button>
      </motion.article>

      <WhatsAppOrderModal
        productName={product.name}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
