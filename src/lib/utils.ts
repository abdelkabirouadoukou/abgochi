import type { ProductCategory } from "@/generated/prisma/client";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(price: number | string) {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
  }).format(num);
}

export function decimalToNumber(value: { toString(): string } | number) {
  return typeof value === "number" ? value : parseFloat(value.toString());
}

/** Maps DB category + legacy values to display labels */
export function getCategoryLabel(category: ProductCategory | string) {
  const labels: Record<string, string> = {
    bag: "Fabric bag",
    traditional: "Traditional craft",
    custom: "Custom order",
    knife: "Fabric bag",
    leather: "Traditional craft",
  };
  return labels[category] ?? String(category);
}

/** Normalize legacy categories from older DB rows */
export function normalizeCategory(
  category: string | undefined
): "bag" | "traditional" | "custom" {
  if (category === "knife") return "bag";
  if (category === "leather") return "traditional";
  if (category === "traditional" || category === "custom" || category === "bag") {
    return category;
  }
  return "bag";
}
