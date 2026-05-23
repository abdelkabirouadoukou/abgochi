import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isAdmin, requireAdmin } from "@/lib/admin-auth";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { createProduct, getActiveProducts, getAllProducts } from "@/lib/products";
import { productSchema } from "@/lib/validators";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin") === "true";

    if (admin) {
      const authed = await isAdmin();
      if (!authed) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const products = await getAllProducts();
      return NextResponse.json(products);
    }

    const products = await getActiveProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const product = await createProduct(parsed.data);
    revalidateTag(CACHE_TAGS.products, "max");
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
