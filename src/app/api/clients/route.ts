import { NextResponse } from "next/server";
import { createClient, getAllClients } from "@/lib/clients";
import { requireAdmin } from "@/lib/admin-auth";
import { clientCreateSchema, clientStatusSchema } from "@/lib/validators";

export async function GET(request: Request) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const statusParsed = statusParam
      ? clientStatusSchema.safeParse(statusParam)
      : null;
    const clients = await getAllClients(
      statusParsed?.success ? statusParsed.data : undefined
    );
    return NextResponse.json(clients);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = clientCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const client = await createClient(parsed.data);
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
