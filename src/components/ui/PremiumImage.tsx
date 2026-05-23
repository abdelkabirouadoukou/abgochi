"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

type PremiumImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  wrapperClassName?: string;
};

function PremiumImageComponent({
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
        className={`image-shimmer absolute inset-0 transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        sizes={sizes}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`object-cover object-center transition-opacity duration-500 ease-out ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}

export const PremiumImage = memo(PremiumImageComponent);
