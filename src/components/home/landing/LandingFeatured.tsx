"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { WhatsAppOrderModal } from "@/components/whatsapp/WhatsAppOrderModal";
import type { ProductDTO } from "@/lib/products";
import { LandingProductsEmpty } from "@/components/home/landing/LandingProductsEmpty";
import { formatPrice } from "@/lib/utils";

type LandingFeaturedProps = {
  products: ProductDTO[];
};

function FeaturedPiece({
  product,
  layout,
  index,
}: {
  product: ProductDTO;
  layout: "hero" | "tall" | "wide" | "compact";
  index: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const image = product.images[0];
  const aspect =
    layout === "hero"
      ? "aspect-[4/5] md:aspect-auto md:min-h-[520px]"
      : layout === "tall"
        ? "aspect-[3/4]"
        : layout === "wide"
          ? "aspect-[16/9] md:aspect-[2/1]"
          : "aspect-[4/5]";

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={`group flex flex-col ${layout === "hero" ? "h-full" : ""}`}
      >
        <Link href={`/products/${product.slug}`} className="block flex-1">
          <div className={`landing-image-frame relative overflow-hidden ${aspect}`}>
            {image ? (
              <PremiumImage
                src={image}
                alt={product.name}
                sizes="(max-width: 768px) 100vw, 40vw"
                wrapperClassName="absolute inset-0 h-full w-full"
                className="object-cover transition duration-[1.1s] ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full min-h-[200px] items-center justify-center bg-white/[0.03] text-white/25">
                —
              </div>
            )}
            <div className="landing-image-vignette pointer-events-none absolute inset-0" />
          </div>
        </Link>
        <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/[0.06] pt-5">
          <div className="min-w-0">
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-serif text-xl text-[#f4f1ea] transition hover:text-[#c9b896] md:text-2xl">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-white/45">{product.description}</p>
          </div>
          <p className="shrink-0 font-serif text-lg text-[#c9b896]">
            {formatPrice(product.price)} MAD
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={product.stock <= 0}
          className="landing-cta-primary mt-4 w-full py-4 text-sm disabled:opacity-35"
        >
          {product.stock > 0 ? "Order on WhatsApp" : "Out of stock"}
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

export function LandingFeatured({ products }: LandingFeaturedProps) {
  const featured = products.slice(0, 6);

  if (featured.length === 0) {
    return <LandingProductsEmpty />;
  }

  const [a, b, c, d, e, f] = featured;

  return (
    <section id="collection" className="scroll-mt-24 border-t border-white/[0.06]">
      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Collection</p>
            <h2 className="mt-4 font-serif text-4xl text-[#f4f1ea] md:text-5xl">Bags in the workshop</h2>
          </div>
          <Link
            href="/products"
            className="text-sm text-white/45 underline-offset-4 hover:text-[#c9b896] hover:underline"
          >
            View all bags →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12 md:gap-5">
          {a ? (
            <div className="md:col-span-7 md:row-span-2">
              <FeaturedPiece product={a} layout="hero" index={0} />
            </div>
          ) : null}
          {b ? (
            <div className="md:col-span-5">
              <FeaturedPiece product={b} layout="tall" index={1} />
            </div>
          ) : null}
          {c ? (
            <div className="md:col-span-5">
              <FeaturedPiece product={c} layout="compact" index={2} />
            </div>
          ) : null}
          {d ? (
            <div className="md:col-span-4">
              <FeaturedPiece product={d} layout="compact" index={3} />
            </div>
          ) : null}
          {e ? (
            <div className="md:col-span-8">
              <FeaturedPiece product={e} layout="wide" index={4} />
            </div>
          ) : null}
          {f ? (
            <div className="md:col-span-12 md:max-w-md">
              <FeaturedPiece product={f} layout="tall" index={5} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
