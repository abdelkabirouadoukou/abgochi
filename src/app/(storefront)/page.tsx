import { HomeExperience } from "@/components/home/HomeExperience";
import { getActiveProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getActiveProducts>> = [];
  let heroImages: string[] = [];
  try {
    products = await getActiveProducts();
  } catch {
    products = [];
  }
  try {
    const settings = await getSiteSettings();
    heroImages = settings.heroImages;
  } catch {
    heroImages = [];
  }

  return <HomeExperience products={products} heroImages={heroImages} />;
}
