import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { EditorialProductCard } from "@/components/store/EditorialProductCard";
import { getActiveProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getActiveProducts>> = [];
  try {
    products = await getActiveProducts();
  } catch {
    products = [];
  }

  return (
    <section className="section-pad pt-32">
      <div className="mx-auto max-w-7xl">
        <p className="label-luxury mb-6">Collection</p>
        <TextReveal
          as="h1"
          className="headline-display max-w-4xl text-5xl text-white md:text-7xl"
        >
          Handmade bags for everyday carry.
        </TextReveal>
        <Reveal delay={0.3} className="body-luxury mt-6 max-w-xl text-lg">
          Handmade fabric bags and traditional craft carries — each piece sewn in the
          workshop with simple tools.
        </Reveal>

        {products.length > 0 ? (
          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {products.map((product, i) => (
              <EditorialProductCard
                key={product.id}
                product={product}
                index={i}
                large={i % 3 === 0}
              />
            ))}
          </div>
        ) : (
          <p className="body-luxury mt-20 text-center text-lg">
            Collection coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
