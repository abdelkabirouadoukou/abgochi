"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";

const INITIAL_COUNT = 16;
const BATCH_SIZE = 12;

type GalleryGridProps = {
  images: string[];
};

const GalleryCell = memo(function GalleryCell({
  src,
  index,
}: {
  src: string;
  index: number;
}) {
  return (
    <figure className="gallery-page-item group min-w-0 reveal-on-scroll">
      <div className="landing-gallery-frame relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
        <PremiumImage
          src={src}
          alt={`ABGOCHI gallery ${index + 1}`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          wrapperClassName="absolute inset-0 h-full w-full"
          className="object-cover object-center transition duration-[1s] ease-out group-hover:scale-[1.02]"
        />
        <div className="landing-image-vignette pointer-events-none absolute inset-0" />
      </div>
    </figure>
  );
});

export function GalleryGrid({ images }: GalleryGridProps) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_COUNT, images.length)
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((n) => Math.min(n + BATCH_SIZE, images.length));
  }, [images.length]);

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_COUNT, images.length));
  }, [images]);

  useEffect(() => {
    if (visibleCount >= images.length) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: "200px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visibleCount, images.length, loadMore]);

  const visible = images.slice(0, visibleCount);

  return (
    <>
      <div className="gallery-page-grid">
        {visible.map((src, index) => (
          <GalleryCell key={`${src}-${index}`} src={src} index={index} />
        ))}
      </div>
      {visibleCount < images.length ? (
        <div ref={sentinelRef} className="mt-10 flex justify-center py-4" aria-hidden>
          <span className="text-sm text-white/30">Loading more…</span>
        </div>
      ) : null}
    </>
  );
}
