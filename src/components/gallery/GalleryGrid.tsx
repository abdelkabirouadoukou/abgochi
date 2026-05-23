"use client";

import { motion } from "framer-motion";
import { PremiumImage } from "@/components/ui/PremiumImage";

type GalleryGridProps = {
  images: string[];
};

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="gallery-page-grid">
      {images.map((src, index) => (
        <motion.figure
          key={`${src}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.2) }}
          className="gallery-page-item group min-w-0"
        >
          <div className="landing-gallery-frame relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
            <PremiumImage
              src={src}
              alt={`ABGOCHI gallery ${index + 1}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              wrapperClassName="absolute inset-0 h-full w-full"
              className="object-cover object-center transition duration-[1s] ease-out group-hover:scale-[1.02]"
            />
            <div className="landing-image-vignette pointer-events-none absolute inset-0" />
          </div>
        </motion.figure>
      ))}
    </div>
  );
}
