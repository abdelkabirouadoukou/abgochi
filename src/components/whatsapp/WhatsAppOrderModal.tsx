"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, type SyntheticEvent } from "react";
import {
  ORDER_AGREEMENT_CHECKBOX,
  ORDER_AGREEMENT_SHORT,
} from "@/lib/order-rules";
import {
  getProductOrderMode,
  getProductPageUrl,
} from "@/lib/product-availability";
import type { ProductDTO } from "@/lib/products";
import { orderFormSchema } from "@/lib/validators";
import { whatsappOrderUrl } from "@/lib/whatsapp";

type WhatsAppOrderModalProps = {
  product: ProductDTO;
  open: boolean;
  onClose: () => void;
};

export function WhatsAppOrderModal({
  product,
  open,
  onClose,
}: Readonly<WhatsAppOrderModalProps>) {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mode = getProductOrderMode(product);
  const orderMode = mode === "made_to_order" ? "made_to_order" : "in_stock";

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    globalThis.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      globalThis.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setAgreed(false);
      setError(null);
    }
  }, [open]);

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!agreed) {
      setError("Please accept the order terms to continue.");
      return;
    }

    const parsed = orderFormSchema.safeParse({
      fullName: fullName.trim(),
      city: city.trim(),
      quantity,
      message: message.trim() || undefined,
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.issues.reduce<Partial<Record<string, string>>>((acc, issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && !acc[key]) acc[key] = issue.message;
        return acc;
      }, {});
      setError(fieldErrors.fullName ?? fieldErrors.city ?? fieldErrors.quantity ?? "Check the form");
      return;
    }

    setError(null);

    const productUrl = getProductPageUrl(product.slug, globalThis.location.origin);

    fetch("/api/clients/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.fullName,
        city: parsed.data.city,
        message: [
          `Quantité: ${parsed.data.quantity}`,
          `Lien: ${productUrl}`,
          parsed.data.message?.trim(),
        ]
          .filter(Boolean)
          .join("\n"),
        productInterest: product.name.trim(),
      }),
    }).catch(() => {});

    const url = whatsappOrderUrl({
      productName: product.name.trim(),
      productUrl,
      data: parsed.data,
      mode: orderMode,
    });

    const opened = globalThis.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      globalThis.location.href = url;
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-6000 bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            className="fixed left-1/2 top-1/2 z-6100 mx-auto max-h-[90vh] w-[min(92vw,28rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-accent/15 bg-[#0a0a0a] p-6 shadow-2xl shadow-black/60 sm:w-[min(90vw,30rem)] sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="label-luxury">Order via WhatsApp</p>
            <h3 id="order-title" className="font-display mt-2 text-2xl text-white sm:text-3xl">
              {product.name}
            </h3>
            <p className="body-luxury mt-2 text-sm">{ORDER_AGREEMENT_SHORT}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              <Field label="Full name" id="fn">
                <input
                  id="fn"
                  className="input-luxury"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </Field>
              <Field label="City" id="city">
                <input
                  id="city"
                  className="input-luxury"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                  required
                />
              </Field>
              <Field label="Quantity" id="qty">
                <input
                  id="qty"
                  type="number"
                  min={1}
                  max={99}
                  className="input-luxury"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                />
              </Field>
              <Field label="Note (optional)" id="msg">
                <textarea
                  id="msg"
                  className="input-luxury min-h-18 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>

              <label className="flex cursor-pointer gap-3 border border-white/8 bg-white/2 p-4">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#c9b896]"
                />
                <span className="text-sm leading-relaxed text-white/55">
                  {ORDER_AGREEMENT_CHECKBOX}{" "}
                  <Link
                    href="/terms-of-use"
                    target="_blank"
                    className="text-[#c9b896] underline-offset-2 hover:underline"
                  >
                    Terms
                  </Link>
                </span>
              </label>

              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={!agreed}
                className="btn-primary w-full py-4 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue to WhatsApp
              </button>
              <button type="button" onClick={onClose} className="btn-ghost w-full">
                Cancel
              </button>
            </form>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  label,
  id,
  children,
}: Readonly<{ label: string; id: string; children: React.ReactNode }>) {
  return (
    <div>
      <label htmlFor={id} className="caption-luxury mb-2 block text-accent/80">
        {label}
      </label>
      {children}
    </div>
  );
}
