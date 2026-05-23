import dynamic from "next/dynamic";
import type { ProductDTO } from "@/lib/products";
import { collectGalleryImages } from "@/lib/gallery-images";
import { LandingContact } from "@/components/home/landing/LandingContact";
import { LandingStory } from "@/components/home/landing/LandingStory";

const LandingHero = dynamic(
  () =>
    import("@/components/home/landing/LandingHero").then((m) => ({
      default: m.LandingHero,
    })),
  { loading: () => <div className="min-h-[100svh] bg-[#050505]" aria-hidden /> }
);

const LandingCollection = dynamic(
  () =>
    import("@/components/home/landing/LandingCollection").then((m) => ({
      default: m.LandingCollection,
    }))
);

const LandingProcess = dynamic(
  () =>
    import("@/components/home/landing/LandingProcess").then((m) => ({
      default: m.LandingProcess,
    }))
);

type HomeExperienceProps = {
  products: ProductDTO[];
  heroImages: string[];
};

export function HomeExperience({ products, heroImages }: HomeExperienceProps) {
  const fallbackImage = products.find((p) => p.images[0])?.images[0] ?? null;
  const allGalleryImages = collectGalleryImages(heroImages, products);
  const stepImages =
    heroImages.length >= 3
      ? heroImages.slice(0, 3)
      : [...heroImages, ...allGalleryImages.slice(0, 3 - heroImages.length)].slice(
          0,
          3
        );

  return (
    <div className="landing-page bg-[#050505]">
      <LandingHero heroImages={heroImages} fallbackImage={fallbackImage} />
      <LandingStory />
      <LandingCollection
        products={products}
        galleryImages={allGalleryImages}
        totalGalleryCount={allGalleryImages.length}
      />
      <LandingProcess stepImages={stepImages} />
      <LandingContact />
    </div>
  );
}
