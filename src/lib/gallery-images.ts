import type { ProductDTO } from "@/lib/products";

const FALLBACK_GALLERY = [
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412720507-eac38a683ce7?w=1200&q=80&auto=format&fit=crop",
];

/** Unique gallery URLs: hero slides first, then product photos */
export function collectGalleryImages(
  heroImages: string[],
  products: ProductDTO[]
): string[] {
  const productImages = products.flatMap((p) => p.images).filter(Boolean);
  const combined = [...heroImages, ...productImages];
  const unique = [...new Set(combined)];
  return unique.length > 0 ? unique : FALLBACK_GALLERY;
}
