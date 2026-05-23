"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { orderFormSchema } from "@/lib/validators";
import { whatsappOrderUrl } from "@/lib/whatsapp";

type WhatsAppOrderModalProps = {
  productName: string;
  open: boolean;
  onClose: () => void;
};

export function WhatsAppOrderModal({
  productName,
  open,
  onClose,
}: WhatsAppOrderModalProps) {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = orderFormSchema.safeParse({
      fullName: fullName.trim(),
      city: city.trim(),
      quantity,
      message: message.trim() || undefined,
    });

    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setError(f.fullName?.[0] ?? f.city?.[0] ?? f.quantity?.[0] ?? "Check the form");
      return;
    }

    setError(null);

    fetch("/api/clients/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.fullName,
        city: parsed.data.city,
        message: [
          `Quantité: ${parsed.data.quantity}`,
          parsed.data.message?.trim(),
        ]
          .filter(Boolean)
          .join("\n"),
        productInterest: productName.trim(),
      }),
    }).catch(() => {});

    const url = whatsappOrderUrl(productName.trim(), parsed.data);
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            className="fixed inset-x-4 top-1/2 z-[130] mx-auto max-h-[90vh] max-w-md -translate-y-1/2 overflow-y-auto border border-accent/15 bg-[#0a0a0a] p-6 sm:p-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="label-luxury">Order via WhatsApp</p>
            <h3 id="order-title" className="font-display mt-2 text-2xl text-white sm:text-3xl">
              {productName}
            </h3>
            <p className="body-luxury mt-2 text-sm">Your order message will be ready to send.</p>

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
                  className="input-luxury min-h-[72px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Field>
              {error ? (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn-primary w-full py-4">
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

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="caption-luxury mb-2 block text-accent/80">
        {label}
      </label>
      {children}
    </div>
  );
}
