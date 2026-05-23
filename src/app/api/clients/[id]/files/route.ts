import { NextResponse } from "next/server";
import { addClientFile, getClientById } from "@/lib/clients";
import { requireAdmin } from "@/lib/admin-auth";
import { clientFileSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Params) {
  try {
    await requireAdmin();
    const { id } = await params;
    const existing = await getClientById(id);
    if (!existing) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const body = await request.json();
    const parsed = clientFileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
    }

    const file = await addClientFile(
      id,
      parsed.data.fileUrl,
      parsed.data.fileName
    );
    return NextResponse.json(file, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to add file" }, { status: 500 });
  }
}
