"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import type { ProductDTO } from "@/lib/products";
import { formatPrice, getCategoryLabel } from "@/lib/utils";
import {
  ImageLightbox,
  type LightboxState,
} from "@/components/ui/ImageLightbox";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { Magnetic } from "@/components/motion/Magnetic";
import { TextReveal } from "@/components/motion/TextReveal";
import { ProductOrderActions } from "@/components/store/ProductOrderActions";
import { WhatsAppOrderModal } from "@/components/whatsapp/WhatsAppOrderModal";
import {
  getAvailabilityLabel,
  getProductOrderMode,
} from "@/lib/product-availability";

export function ProductDetailClient({
  product,
  openOrderOnMount = false,
}: Readonly<{ product: ProductDTO; openOrderOnMount?: boolean }>) {
  const searchParams = useSearchParams();
  const orderRequested = openOrderOnMount || searchParams.get("order") === "1";
  const [activeImage, setActiveImage] = useState(0);
  const [orderModalOpen, setOrderModalOpen] = useState(orderRequested);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const mode = getProductOrderMode(product);
  const images = product.images;

  const openLightbox = (index: number) => {
    if (!images[index]) return;
    setLightbox({ images, index, alt: product.name });
  };

  return (
    <>
      <div
        className={`grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-16 ${
          orderModalOpen ? "pointer-events-none select-none" : ""
        }`}
        aria-hidden={orderModalOpen}
      >
        <div className="min-w-0 lg:col-span-7">
          <button
            type="button"
            onClick={() => openLightbox(activeImage)}
            className="cinematic-frame relative block aspect-4/5 max-h-[75vh] w-full overflow-hidden text-left sm:max-h-none lg:aspect-3/4"
            aria-label={`Open ${product.name} image preview`}
          >
          {images[activeImage] ? (
            <PremiumImage
              src={images[activeImage]}
              alt={product.name}
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              wrapperClassName="absolute inset-0 h-full w-full"
              className="cinematic-img"
            />
          ) : (
            <div className="flex h-full min-h-70 items-center justify-center text-white/30">
              No image
            </div>
          )}
            <div className="cinematic-overlay" />
            <div className="cinematic-vignette" />
            <div className="cinematic-grain" />
          </button>
          {images.length > 1 ? (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">
              {images.map((url, i) => (
                <button
                  key={`${url}-${i}`}
                  type="button"
                  onClick={() => {
                    setActiveImage(i);
                    openLightbox(i);
                  }}
                  className={`cinematic-frame relative h-16 w-16 shrink-0 overflow-hidden border-2 sm:h-20 sm:w-20 ${
                    i === activeImage ? "border-accent" : "border-transparent opacity-60"
                  }`}
                  aria-label={`Open ${product.name} image ${i + 1}`}
                >
                  <PremiumImage
                    src={url}
                    alt=""
                    sizes="80px"
                    wrapperClassName="absolute inset-0 h-full w-full"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col justify-center lg:col-span-5">
          <p className="label-luxury">{getCategoryLabel(product.category)}</p>
          <TextReveal
            as="h1"
            className="headline-display mt-3 text-3xl text-white sm:text-4xl md:text-5xl"
          >
            {product.name}
          </TextReveal>
          <p className="price-luxury mt-5 text-2xl sm:text-3xl">
            {formatPrice(product.price)} MAD
          </p>
          <p className="caption-luxury mt-2">
            {mode === "in_stock" && product.stock > 0
              ? `${product.stock} available`
              : getAvailabilityLabel(mode)}
          </p>
          <p className="body-luxury mt-8 whitespace-pre-line text-base leading-relaxed sm:text-lg">
            {product.description}
          </p>
          <Magnetic className="mt-10 inline-block w-full sm:w-auto">
            <ProductOrderActions
              product={product}
              onModalStateChange={setOrderModalOpen}
              buttonClassName="btn-primary w-full min-w-0 py-4 text-sm sm:min-w-[260px] sm:py-5"
            />
          </Magnetic>
        </div>
      </div>
      <ImageLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={(index) => {
          setActiveImage(index);
          setLightbox((current) =>
            current ? { ...current, index } : current
          );
        }}
      />
      {orderModalOpen ? (
        <WhatsAppOrderModal
          product={product}
          open={orderModalOpen}
          onClose={() => setOrderModalOpen(false)}
        />
      ) : null}
    </>
  );
}
