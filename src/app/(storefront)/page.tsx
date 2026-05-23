import { HomeExperience } from "@/components/home/HomeExperience";
import { getStorefrontData } from "@/lib/data/storefront";

export const revalidate = 60;

export default async function HomePage() {
  let products: Awaited<ReturnType<typeof getStorefrontData>>["products"] = [];
  let heroImages: string[] = [];

  try {
    const data = await getStorefrontData();
    products = data.products;
    heroImages = data.heroImages;
  } catch {
    products = [];
    heroImages = [];
  }

  return <HomeExperience products={products} heroImages={heroImages} />;
}
