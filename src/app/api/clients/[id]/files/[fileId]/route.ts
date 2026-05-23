import { NextResponse } from "next/server";
import { deleteClientFile } from "@/lib/clients";
import { requireAdmin } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string; fileId: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id, fileId } = await params;
    await deleteClientFile(id, fileId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
