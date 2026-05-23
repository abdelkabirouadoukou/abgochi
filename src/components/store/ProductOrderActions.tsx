"use client";

import Link from "next/link";
import type { ProductDTO } from "@/lib/products";
import {
  canOrder,
  getAvailabilityLabel,
  getOrderButtonLabel,
  getProductOrderMode,
} from "@/lib/product-availability";

type ProductOrderActionsProps = {
  product: ProductDTO;
  buttonClassName?: string;
  showAvailability?: boolean;
  href?: string;
  onModalStateChange?: (open: boolean) => void;
};

export function ProductOrderActions({
  product,
  buttonClassName = "landing-cta-primary w-full py-4 text-sm",
  showAvailability = false,
  href,
  onModalStateChange,
}: Readonly<ProductOrderActionsProps>) {
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

      {href && orderable ? (
        <Link href={href} className={buttonClassName}>
          {getOrderButtonLabel(mode)}
        </Link>
      ) : (
        <button
          type="button"
          disabled={!orderable}
          onClick={() => onModalStateChange?.(true)}
          className={`${buttonClassName} disabled:cursor-not-allowed disabled:opacity-35`}
        >
          {getOrderButtonLabel(mode)}
        </button>
      )}
    </>
  );
}
