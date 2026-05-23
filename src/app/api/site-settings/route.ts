import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { MAX_HERO_IMAGES } from "@/lib/site-settings-constants";
import { getSiteSettings, updateHeroImages } from "@/lib/site-settings";
import { z } from "zod";

const patchSchema = z.object({
  heroImages: z.array(z.string().url()).max(MAX_HERO_IMAGES),
});

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load settings" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid hero images" }, { status: 400 });
    }

    const settings = await updateHeroImages(parsed.data.heroImages);
    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error(error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
