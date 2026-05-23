import { NextResponse } from "next/server";
import { isAdmin, requireAdmin } from "@/lib/admin-auth";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/products";
import { productSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success || Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: parsed.success ? "No fields to update" : parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const product = await updateProduct(id, parsed.data);
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();

    const { id } = await params;
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
