import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { getActiveProducts, getProductBySlug } from "@/lib/products";
import { getSiteSettings } from "@/lib/site-settings";

export const getCachedActiveProducts = unstable_cache(
  async () => getActiveProducts(),
  ["storefront-active-products"],
  { revalidate: 60, tags: [CACHE_TAGS.products] }
);

export const getCachedSiteSettings = unstable_cache(
  async () => getSiteSettings(),
  ["storefront-site-settings"],
  { revalidate: 60, tags: [CACHE_TAGS.siteSettings] }
);

export const getCachedProductBySlug = (slug: string) =>
  unstable_cache(
    async () => getProductBySlug(slug),
    ["storefront-product", slug],
    { revalidate: 60, tags: [CACHE_TAGS.products] }
  )();

/** Parallel storefront fetch — single round-trip per page load */
export async function getStorefrontData() {
  const [products, settings] = await Promise.all([
    getCachedActiveProducts(),
    getCachedSiteSettings(),
  ]);
  return { products, heroImages: settings.heroImages };
}
