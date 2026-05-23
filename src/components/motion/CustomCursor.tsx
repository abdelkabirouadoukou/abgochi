"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setMounted(true);
    const coarse = globalThis.matchMedia("(pointer: coarse)").matches;
    const reduced = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) {
      document.body.classList.remove("cursor-none");
      return;
    }

    setVisible(true);
    document.body.classList.add("cursor-none");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic]")) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic]")) setHovering(false);
    };

    globalThis.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("cursor-none");
      globalThis.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [x, y, pathname]);

  if (!mounted || !visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 hidden mix-blend-difference md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 5000,
      }}
    >
      <motion.div
        animate={{
          width: hovering ? 48 : 10,
          height: hovering ? 48 : 10,
          opacity: hovering ? 0.85 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="rounded-full border border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
      />
    </motion.div>
  );
}
