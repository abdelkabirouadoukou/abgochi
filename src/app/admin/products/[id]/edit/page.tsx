import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  let product;
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }
  if (!product) notFound();

  return <ProductForm product={product} />;
}
