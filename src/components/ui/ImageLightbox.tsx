"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder";

export type LightboxState = {
  images: string[];
  index: number;
  alt?: string;
};

type ImageLightboxProps = {
  state: LightboxState | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function ImageLightbox({ state, onClose, onIndexChange }: ImageLightboxProps) {
  const open = state !== null && state.images.length > 0;
  const current = open ? state.images[state.index] : null;
  const hasMultiple = open && state.images.length > 1;

  const goPrev = useCallback(() => {
    if (!open) return;
    onIndexChange((state.index - 1 + state.images.length) % state.images.length);
  }, [open, state, onIndexChange]);

  const goNext = useCallback(() => {
    if (!open) return;
    onIndexChange((state.index + 1) % state.images.length);
  }, [open, state, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-4000 flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/92 backdrop-blur-sm" aria-hidden />

          <motion.button
            type="button"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-2xl text-white/70 transition hover:border-[#c9b896]/50 hover:text-white sm:right-8 sm:top-8"
            aria-label="Close"
          >
            ×
          </motion.button>

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:border-[#c9b896]/40 hover:text-white sm:left-6 sm:flex"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-2 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-sm border border-white/10 text-white/60 transition hover:border-[#c9b896]/40 hover:text-white sm:right-6 sm:flex"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          ) : null}

          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[min(85vh,900px)] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-4/5 w-full max-h-[min(85vh,900px)] sm:aspect-3/4">
              <Image
                src={current}
                alt={state.alt ?? "ABGOCHI"}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
                placeholder="blur"
                blurDataURL={IMAGE_BLUR_DATA_URL}
              />
            </div>
            {hasMultiple ? (
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/40">
                {state.index + 1} / {state.images.length}
              </p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
