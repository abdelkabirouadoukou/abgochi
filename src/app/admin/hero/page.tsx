import { HeroImagesEditor } from "@/components/admin/HeroImagesEditor";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function AdminHeroPage() {
  let heroImages: string[] = [];
  try {
    const settings = await getSiteSettings();
    heroImages = settings.heroImages;
  } catch {
    heroImages = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl text-white">Hero images</h1>
        <p className="mt-2 text-white/50">
          Photos that rotate on the homepage hero (3–10 recommended).
        </p>
      </div>
      <div className="admin-card">
        <HeroImagesEditor initialImages={heroImages} />
      </div>
    </div>
  );
}
