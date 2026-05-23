"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { ProductDTO } from "@/lib/products";
import {
  canOrder,
  getAvailabilityLabel,
  getOrderButtonLabel,
  getProductOrderMode,
} from "@/lib/product-availability";

const WhatsAppOrderModal = dynamic(
  () =>
    import("@/components/whatsapp/WhatsAppOrderModal").then((m) => ({
      default: m.WhatsAppOrderModal,
    })),
  { ssr: false }
);

type ProductOrderActionsProps = {
  product: ProductDTO;
  buttonClassName?: string;
  showAvailability?: boolean;
};

export function ProductOrderActions({
  product,
  buttonClassName = "landing-cta-primary w-full py-4 text-sm",
  showAvailability = false,
}: ProductOrderActionsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const mode = getProductOrderMode(product);
  const orderable = canOrder(mode);

  return (
    <>
      {showAvailability ? (
        <p className="caption-luxury mt-2 text-white/45">
          {mode === "in_stock" && product.stock > 0
            ? `${product.stock} available`
            : getAvailabilityLabel(mode)}
        </p>
      ) : null}

      <button
        type="button"
        disabled={!orderable}
        onClick={() => setModalOpen(true)}
        className={`${buttonClassName} disabled:cursor-not-allowed disabled:opacity-35`}
      >
        {getOrderButtonLabel(mode)}
      </button>

      {modalOpen ? (
        <WhatsAppOrderModal
          product={product}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </>
  );
}
