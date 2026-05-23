"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex min-w-[200px] items-center justify-center px-10 py-4 text-xs font-normal uppercase tracking-[0.2em] transition-all duration-500";
  const styles =
    variant === "primary"
      ? "border border-accent/80 bg-accent text-[#1a1814] hover:bg-transparent hover:text-accent"
      : "border border-white/20 bg-transparent text-white/90 hover:border-accent/50 hover:text-accent";

  const content = (
    <motion.span
      className={`${base} ${styles} ${className}`}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
