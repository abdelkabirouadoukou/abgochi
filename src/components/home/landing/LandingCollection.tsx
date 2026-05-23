"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  ImageLightbox,
  type LightboxState,
} from "@/components/ui/ImageLightbox";
import { PremiumImage } from "@/components/ui/PremiumImage";
import type { ProductDTO } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductOrderActions } from "@/components/store/ProductOrderActions";
import { getAvailabilityLabel, getProductOrderMode } from "@/lib/product-availability";

type CollectionView = "products" | "gallery";

type LandingCollectionProps = {
  products: ProductDTO[];
  galleryImages: string[];
  totalGalleryCount: number;
};

const GALLERY_VARIANTS = ["tall", "square", "wide", "square", "tall", "wide"] as const;

function gridPlacement(variant: (typeof GALLERY_VARIANTS)[number]) {
  switch (variant) {
    case "tall":
      return "landing-gallery-item landing-gallery-item--tall";
    case "wide":
      return "landing-gallery-item landing-gallery-item--wide";
    default:
      return "landing-gallery-item landing-gallery-item--square";
  }
}

const ProductCard = memo(function ProductCard({
  product,
  onImageClick,
}: {
  product: ProductDTO;
  onImageClick: (images: string[], index: number, alt: string) => void;
}) {
  const image = product.images[0];
  const images = product.images.filter(Boolean);
  const mode = getProductOrderMode(product);

  return (
    <>
      <article className="reveal-on-scroll group flex h-full flex-col">
        <button
          type="button"
          onClick={() => {
            if (images.length > 0) onImageClick(images, 0, product.name);
          }}
          disabled={!image}
          className="landing-image-frame relative block w-full overflow-hidden text-left disabled:cursor-default"
          aria-label={`View ${product.name}`}
        >
          <div className="relative aspect-[4/5] w-full bg-[#0c0c0c]">
            {image ? (
              <PremiumImage
                src={image}
                alt={product.name}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                wrapperClassName="absolute inset-0 h-full w-full"
                className="object-cover transition duration-[1s] ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/25">—</div>
            )}
            <div className="landing-image-vignette pointer-events-none absolute inset-0" />
            {image ? (
              <span className="absolute bottom-3 right-3 rounded-sm bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 opacity-0 transition group-hover:opacity-100">
                View
              </span>
            ) : null}
          </div>
        </button>

        <div className="mt-5 flex flex-1 flex-col border-t border-white/[0.06] pt-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-serif text-xl leading-tight text-[#f4f1ea] transition hover:text-[#c9b896] md:text-2xl">
                  {product.name}
                </h3>
              </Link>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">
                {product.description}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/35">
                {getAvailabilityLabel(mode)}
              </p>
            </div>
            <p className="shrink-0 font-serif text-lg text-[#c9b896]">
              {formatPrice(product.price)}
              <span className="ml-0.5 text-xs text-white/35">MAD</span>
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
            <Link
              href={`/products/${product.slug}`}
              className="landing-cta-secondary flex min-h-[44px] flex-1 items-center justify-center px-4 text-sm"
            >
              Details
            </Link>
            <ProductOrderActions
              product={product}
              buttonClassName="landing-cta-primary min-h-[44px] flex-1 py-3 text-sm"
            />
          </div>
        </div>
      </article>
    </>
  );
});

const GalleryCell = memo(function GalleryCell({
  src,
  alt,
  variant,
  index,
  onOpen,
}: {
  src: string;
  alt: string;
  variant: (typeof GALLERY_VARIANTS)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <li className={`${gridPlacement(variant)} reveal-on-scroll min-w-0 list-none`}>
      <button
        type="button"
        onClick={onOpen}
        className="landing-gallery-frame group relative block w-full overflow-hidden text-left"
        aria-label={`View photo ${index + 1}`}
      >
        <div className="landing-gallery-aspect relative w-full">
          <PremiumImage
            src={src}
            alt={alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            wrapperClassName="absolute inset-0 h-full w-full"
            className="object-cover object-center transition duration-[1s] ease-out group-hover:scale-[1.02]"
          />
          <div className="landing-image-vignette pointer-events-none absolute inset-0" />
        </div>
      </button>
    </li>
  );
});

function CollectionToggle({
  view,
  onChange,
}: {
  view: CollectionView;
  onChange: (v: CollectionView) => void;
}) {
  return (
    <div
      className="collection-toggle inline-flex w-full max-w-xs rounded-sm border border-white/[0.1] bg-white/[0.03] p-1 sm:w-auto"
      role="tablist"
      aria-label="Collection view"
    >
      {(
        [
          { id: "products" as const, label: "Products" },
          { id: "gallery" as const, label: "Gallery" },
        ] as const
      ).map((tab) => {
        const active = view === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 px-5 py-3 text-sm font-medium tracking-wide transition sm:flex-none sm:px-8 ${
              active ? "text-[#1a1814]" : "text-white/50 hover:text-white/80"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="collection-toggle-pill"
                className="absolute inset-0 rounded-[1px] bg-[#c9b896]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span className="relative z-[1]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function LandingCollection({
  products,
  galleryImages,
  totalGalleryCount,
}: LandingCollectionProps) {
  const [view, setView] = useState<CollectionView>("products");
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const displayGallery = useMemo(
    () => galleryImages.slice(0, 12),
    [galleryImages]
  );

  const openLightbox = useCallback(
    (images: string[], index: number, alt?: string) => {
      const list = images.filter(Boolean);
      if (list.length === 0) return;
      setLightbox({ images: list, index: Math.min(index, list.length - 1), alt });
    },
    []
  );

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (hash === "#gallery") setView("gallery");
      else if (hash === "#collection") setView("products");
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const hasProducts = products.length > 0;

  return (
    <section
      id="collection"
      className="scroll-mt-24 border-t border-white/[0.06] bg-[#050505]"
    >
      <span id="gallery" className="pointer-events-none absolute -mt-28 block h-0 w-0 scroll-mt-28" />

      <div className="mx-auto max-w-[90rem] px-6 py-20 md:px-12 md:py-28">
        <div className="reveal-on-scroll flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Collection</p>
            <h2 className="mt-4 font-serif text-4xl text-[#f4f1ea] md:text-5xl">
              {view === "products" ? "Handmade bags" : "Workshop & craft"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/45">
              {view === "products"
                ? "Each piece is sewn slowly — choose a bag or browse the workshop."
                : "Real light, real hands. Tap any photo to view larger."}
            </p>
          </div>

          <CollectionToggle view={view} onChange={setView} />
        </div>

        <div className="mt-12 md:mt-14">
          <AnimatePresence mode="wait">
            {view === "products" ? (
              <motion.div
                key="products-panel"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {hasProducts ? (
                  <>
                    <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/[0.06] pb-6">
                      <p className="text-sm text-white/40">
                        {products.length} piece{products.length !== 1 ? "s" : ""} available
                      </p>
                      <Link
                        href="/products"
                        className="text-sm text-white/45 underline-offset-4 hover:text-[#c9b896] hover:underline"
                      >
                        Full collection →
                      </Link>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          onImageClick={openLightbox}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="landing-empty-state relative overflow-hidden px-8 py-20 text-center md:py-24">
                    <div className="landing-grain pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden />
                    <p className="text-[11px] uppercase tracking-[0.5em] text-white/30">
                      Bags coming soon
                    </p>
                    <h3 className="mt-6 font-serif text-3xl text-[#f4f1ea] md:text-4xl">
                      New pieces are being crafted.
                    </h3>
                    <p className="mx-auto mt-4 max-w-md text-white/45">
                      Switch to Gallery to see the workshop, or check back soon.
                    </p>
                    <button
                      type="button"
                      onClick={() => setView("gallery")}
                      className="landing-cta-primary mt-8 inline-flex min-h-[48px] items-center justify-center px-8 text-sm"
                    >
                      View gallery
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="gallery-panel"
                role="tabpanel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ul className="landing-gallery-grid">
                  {displayGallery.map((src, i) => (
                    <GalleryCell
                      key={`${src}-${i}`}
                      src={src}
                      alt="ABGOCHI workshop"
                      variant={GALLERY_VARIANTS[i % GALLERY_VARIANTS.length]}
                      index={i}
                      onOpen={() => openLightbox(galleryImages, i, "ABGOCHI gallery")}
                    />
                  ))}
                </ul>
                <div className="mt-12 flex justify-center">
                  <Link
                    href="/gallery"
                    className="landing-cta-primary inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-10 text-[15px] font-medium"
                  >
                    View all photos
                    {totalGalleryCount > 0 ? (
                      <span className="ml-2 text-sm opacity-80">({totalGalleryCount})</span>
                    ) : null}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ImageLightbox
        state={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={(index) =>
          setLightbox((prev) => (prev ? { ...prev, index } : null))
        }
      />
    </section>
  );
}
