import { prisma } from "@/lib/db";
import { MAX_HERO_IMAGES } from "@/lib/site-settings-constants";

const SETTINGS_ID = "default";
export { MAX_HERO_IMAGES } from "@/lib/site-settings-constants";

export type SiteSettingsDTO = {
  heroImages: string[];
  updatedAt: string;
};

export async function getSiteSettings(): Promise<SiteSettingsDTO> {
  let row = await prisma.siteSettings.findUnique({
    where: { id: SETTINGS_ID },
  });

  if (!row) {
    row = await prisma.siteSettings.create({
      data: { id: SETTINGS_ID, heroImages: [] },
    });
  }

  return {
    heroImages: row.heroImages.slice(0, MAX_HERO_IMAGES),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function updateHeroImages(heroImages: string[]): Promise<SiteSettingsDTO> {
  const trimmed = heroImages.filter(Boolean).slice(0, MAX_HERO_IMAGES);

  const row = await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, heroImages: trimmed },
    update: { heroImages: trimmed },
  });

  return {
    heroImages: row.heroImages,
    updatedAt: row.updatedAt.toISOString(),
  };
}
