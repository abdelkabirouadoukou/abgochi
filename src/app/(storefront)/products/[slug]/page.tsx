import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";
import { getProductBySlug } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }
  if (!product) notFound();

  return (
    <section className="section-pad pt-28">
      <div className="mx-auto max-w-7xl">
        <Link href="/products" className="caption-luxury mb-12 inline-block hover:text-accent">
          ← Collection
        </Link>
        <ProductDetailClient product={product} />
      </div>
    </section>
  );
}
