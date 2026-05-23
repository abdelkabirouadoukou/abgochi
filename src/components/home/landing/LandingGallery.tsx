"use client";

import Link from "next/link";
import { memo } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";

type GalleryItem = {
  src: string;
  alt: string;
  variant: "tall" | "square" | "wide";
};

const FALLBACK: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80&auto=format&fit=crop",
    alt: "Workshop texture",
    variant: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80&auto=format&fit=crop",
    alt: "Fabric detail",
    variant: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1487412720507-eac38a683ce7?w=1100&q=80&auto=format&fit=crop",
    alt: "Handmade bag",
    variant: "wide",
  },
  {
    src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80&auto=format&fit=crop",
    alt: "Craft detail",
    variant: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
    alt: "Fabric",
    variant: "tall",
  },
];

const VARIANTS: GalleryItem["variant"][] = ["tall", "square", "wide", "square", "tall"];

function buildGalleryPreview(images: string[]): GalleryItem[] {
  return images.slice(0, 6).map((src, i) => ({
    src,
    alt: "ABGOCHI handmade bag",
    variant: VARIANTS[i % VARIANTS.length],
  }));
}

function gridPlacement(variant: GalleryItem["variant"]) {
  switch (variant) {
    case "tall":
      return "landing-gallery-item landing-gallery-item--tall";
    case "wide":
      return "landing-gallery-item landing-gallery-item--wide";
    default:
      return "landing-gallery-item landing-gallery-item--square";
  }
}

const GalleryCell = memo(function GalleryCell({ item }: { item: GalleryItem }) {
  return (
    <li className={`${gridPlacement(item.variant)} reveal-on-scroll min-w-0 list-none`}>
      <div className="landing-gallery-frame group relative w-full overflow-hidden">
        <div className="landing-gallery-aspect relative w-full">
          <PremiumImage
            src={item.src}
            alt={item.alt}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            wrapperClassName="absolute inset-0 h-full w-full"
            className="object-cover object-center transition duration-[1s] ease-out group-hover:scale-[1.02]"
          />
          <div className="landing-image-vignette pointer-events-none absolute inset-0" />
        </div>
      </div>
    </li>
  );
});

type LandingGalleryProps = {
  previewImages: string[];
  totalCount: number;
};

export function LandingGallery({ previewImages, totalCount }: LandingGalleryProps) {
  const items =
    previewImages.length >= 3
      ? buildGalleryPreview(previewImages)
      : FALLBACK;

  return (
    <section
      id="gallery"
      className="scroll-mt-24 overflow-x-clip border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-28">
        <div className="reveal-on-scroll">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Gallery</p>
          <h2 className="mt-4 max-w-lg font-serif text-3xl text-[#f4f1ea] sm:text-4xl md:text-5xl">
            Phone photos, treated with care
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40">
            Real workshop light. Cropped and framed — never stretched.
          </p>
        </div>

        <ul className="landing-gallery-grid mt-10 sm:mt-12">
          {items.map((item, i) => (
            <GalleryCell key={`${item.src}-${i}`} item={item} />
          ))}
        </ul>

        <div className="mt-12 flex justify-center sm:mt-14">
          <Link
            href="/gallery"
            className="landing-cta-primary inline-flex min-h-[52px] min-w-[240px] items-center justify-center px-10 text-[15px] font-medium"
          >
            View all photos
            {totalCount > 0 ? (
              <span className="ml-2 text-sm opacity-80">({totalCount})</span>
            ) : null}
          </Link>
        </div>
      </div>
    </section>
  );
}
