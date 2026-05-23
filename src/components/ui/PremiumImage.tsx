"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type PremiumImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
};

/**
 * Consistent crop + shimmer placeholder + fade-in for phone photos.
 */
export function PremiumImage({
  src,
  alt,
  fill = true,
  priority,
  sizes = "100vw",
  className = "",
  wrapperClassName = "",
}: PremiumImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex min-h-[120px] items-center justify-center bg-white/[0.04] text-sm text-white/30 ${wrapperClassName}`}
      >
        No image
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#121210] ${wrapperClassName}`}>
      <div
        className={`image-shimmer absolute inset-0 transition-opacity duration-700 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`object-cover object-center ${className}`}
        />
      </motion.div>
    </div>
  );
}
