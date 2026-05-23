"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { galleryItems, type GalleryItem } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function spanClass(span?: GalleryItem["span"]) {
  if (span === "tall") return "md:row-span-2";
  if (span === "wide") return "md:col-span-2";
  return "";
}

export function Gallery() {
  return (
    <section id="gallery" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          label="Atelier Journal"
          title="The making, in still frames"
          description="Knife making, leather stitching, and the quiet intensity of the workshop."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[220px]">
          {galleryItems.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative min-h-[260px] overflow-hidden ${spanClass(item.span)}`}
            >
              <Image
                src={item.url}
                alt={item.alt}
                fill
                className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/35 transition duration-500 group-hover:bg-black/15" />
              <figcaption className="absolute bottom-4 left-4">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/80">
                  {item.category}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
