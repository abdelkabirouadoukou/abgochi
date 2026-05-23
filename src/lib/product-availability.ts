import type { ProductAvailability } from "@/generated/prisma/client";
import { siteConfig } from "@/lib/config";
import type { ProductDTO } from "@/lib/products";

export type ProductOrderMode = "in_stock" | "made_to_order" | "unavailable";

export const AVAILABILITY_OPTIONS: {
  value: ProductAvailability;
  label: string;
  description: string;
}[] = [
  {
    value: "in_stock",
    label: "In stock",
    description: "Ready or available now — normal WhatsApp order",
  },
  {
    value: "made_to_order",
    label: "Made to order",
    description: "Out of stock but materials exist — custom handmade request",
  },
  {
    value: "unavailable",
    label: "Unavailable",
    description: "Cannot be made right now — no orders",
  },
];

export function getProductOrderMode(
  product: Pick<ProductDTO, "availability" | "stock">
): ProductOrderMode {
  if (product.availability === "unavailable") return "unavailable";
  if (product.availability === "made_to_order") return "made_to_order";
  if (product.stock > 0) return "in_stock";
  return "made_to_order";
}

export function getAvailabilityLabel(mode: ProductOrderMode): string {
  switch (mode) {
    case "in_stock":
      return "In stock";
    case "made_to_order":
      return "Available to make by hand";
    case "unavailable":
      return "Currently unavailable";
  }
}

export function getOrderButtonLabel(mode: ProductOrderMode): string {
  switch (mode) {
    case "in_stock":
      return "Order via WhatsApp";
    case "made_to_order":
      return "Order as Handmade Piece";
    case "unavailable":
      return "Unavailable";
  }
}

export function canOrder(mode: ProductOrderMode): boolean {
  return mode === "in_stock" || mode === "made_to_order";
}

/** Absolute product page URL for WhatsApp messages */
export function getProductPageUrl(slug: string, origin?: string): string {
  const base = (origin ?? siteConfig.siteUrl).replace(/\/$/, "");
  return `${base}/products/${slug}`;
}
