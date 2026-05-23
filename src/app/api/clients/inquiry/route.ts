import { NextResponse } from "next/server";
import { createClient } from "@/lib/clients";
import { clientInquirySchema } from "@/lib/validators";

/** Public: auto-create client from WhatsApp order / contact flow */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = clientInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid inquiry" }, { status: 400 });
    }

    const client = await createClient({
      name: parsed.data.name,
      phone: parsed.data.phone,
      city: parsed.data.city,
      message: parsed.data.message,
      productInterest: parsed.data.productInterest,
      status: "pending",
    });

    return NextResponse.json({ id: client.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
