"use client";

import { useEffect } from "react";

/** Observes `.reveal-on-scroll` including nodes added by lazy-loaded sections */
export function RevealOnScrollInit() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showAll = () => {
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll").forEach((el) => {
        el.classList.add("is-visible");
      });
    };

    if (reduce) {
      showAll();
      return;
    }

    const seen = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-8% 0px", threshold: 0.05 }
    );

    const observeNew = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(".reveal-on-scroll").forEach((el) => {
        if (seen.has(el) || el.classList.contains("is-visible")) return;
        seen.add(el);
        observer.observe(el);
      });
    };

    observeNew();

    const mutation = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains("reveal-on-scroll")) {
              if (!seen.has(node) && !node.classList.contains("is-visible")) {
                seen.add(node);
                observer.observe(node);
              }
            }
            observeNew(node);
          }
        });
      }
    });

    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
