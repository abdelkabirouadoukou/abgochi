"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type TextRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={`flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
