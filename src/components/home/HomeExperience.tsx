"use client";

import type { ProductDTO } from "@/lib/products";
import { collectGalleryImages } from "@/lib/gallery-images";
import { LandingContact } from "@/components/home/landing/LandingContact";
import { LandingFeatured } from "@/components/home/landing/LandingFeatured";
import { LandingGallery } from "@/components/home/landing/LandingGallery";
import { LandingHero } from "@/components/home/landing/LandingHero";
import { LandingProcess } from "@/components/home/landing/LandingProcess";
import { LandingStory } from "@/components/home/landing/LandingStory";

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
      : [
          ...heroImages,
          ...allGalleryImages.slice(0, 3 - heroImages.length),
        ].slice(0, 3);

  return (
    <div className="landing-page bg-[#050505]">
      <LandingHero heroImages={heroImages} fallbackImage={fallbackImage} />
      <LandingStory />
      <LandingFeatured products={products} />
      <LandingProcess stepImages={stepImages} />
      <LandingGallery
        previewImages={allGalleryImages}
        totalCount={allGalleryImages.length}
      />
      <LandingContact />
    </div>
  );
}
