import Link from "next/link";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { collectGalleryImages } from "@/lib/gallery-images";
import { getStorefrontData } from "@/lib/data/storefront";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | ABGOCHI",
  description: "Workshop and handmade bag photos from ABGOCHI.",
};

export default async function GalleryPage() {
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

  const images = collectGalleryImages(heroImages, products);

  return (
    <div className="landing-page bg-[#050505] pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-12">
        <Link
          href="/#gallery"
          className="text-sm text-white/45 transition hover:text-[#c9b896]"
        >
          ← Back to home
        </Link>
        <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">
          Gallery
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#f4f1ea] md:text-5xl">
          All photos
        </h1>
        <p className="mt-4 max-w-lg text-white/45">
          {images.length} image{images.length !== 1 ? "s" : ""} from the workshop and
          collection.
        </p>

        <div className="mt-12 md:mt-16">
          <GalleryGrid images={images} />
        </div>
      </div>
    </div>
  );
}
