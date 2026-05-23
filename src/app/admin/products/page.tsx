import Image from "next/image";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { getAllProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof getAllProducts>> = [];
  try {
    products = await getAllProducts();
  } catch {
    products = [];
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl text-white">Products</h1>
        <Link href="/admin/products/new" className="btn-primary text-center">
          Add new product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-white/50">No products yet. Add your first one.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="admin-card space-y-4">
              <div className="relative aspect-square overflow-hidden bg-white/5">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-lg text-white">{product.name}</p>
                <p className="text-accent">{formatPrice(product.price)} MAD</p>
                <p className="text-sm text-white/40">
                  Stock: {product.stock} · {product.active ? "Active" : "Hidden"}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="btn-primary flex-1 text-center py-3"
                >
                  Edit
                </Link>
                <DeleteProductButton id={product.id} productName={product.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
