"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type Product, formatPrice } from "@/lib/data";
import {
  productInquiryMessage,
  whatsappUrl,
} from "@/lib/whatsapp";

type ProductCardProps = {
  product: Product;
  index: number;
};

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.85,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="card-shine group border border-white/10 bg-[#0b0b0b]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.35em] text-white/70">
          Limited artisan batch
        </p>
      </div>

      <div className="space-y-4 p-6 md:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-light text-white">
            {product.name}
          </h3>
          <p className="shrink-0 text-sm tracking-wide text-white/80">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        <a
          href={whatsappUrl(productInquiryMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex text-[10px] uppercase tracking-[0.32em] text-white/70 transition-colors hover:text-white"
        >
          Inquire on WhatsApp →
        </a>
      </div>
    </motion.article>
  );
}
