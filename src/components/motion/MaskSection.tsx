"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type MaskSectionProps = {
  children: ReactNode;
  className?: string;
};

export function MaskSection({ children, className = "" }: MaskSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );

  return (
    <motion.section
      ref={ref}
      style={{ clipPath: clip }}
      className={`mask-section ${className}`}
    >
      {children}
    </motion.section>
  );
}
