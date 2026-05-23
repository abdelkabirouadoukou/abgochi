"use client";

import dynamic from "next/dynamic";

const MotionProvider = dynamic(
  () =>
    import("@/components/motion/MotionProvider").then((m) => ({
      default: m.MotionProvider,
    })),
  { ssr: false }
);

const PageLoader = dynamic(
  () =>
    import("@/components/motion/PageLoader").then((m) => ({
      default: m.PageLoader,
    })),
  { ssr: false }
);

const CustomCursor = dynamic(
  () =>
    import("@/components/motion/CustomCursor").then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false }
);

const RevealOnScrollInit = dynamic(
  () =>
    import("@/components/motion/RevealOnScrollInit").then((m) => ({
      default: m.RevealOnScrollInit,
    })),
  { ssr: false }
);

/** Lenis, loader, and cursor — loaded after hydration (not on mobile cursor path) */
export function StorefrontMotion() {
  return (
    <MotionProvider>
      <PageLoader />
      <CustomCursor />
      <RevealOnScrollInit />
    </MotionProvider>
  );
}
