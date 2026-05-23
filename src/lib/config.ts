import { env } from "@/env";

export const siteConfig = {
  brand: "ABGOCHI",
  artisanDisplayName: "Baba Mohammed",
  artisanName: "Mohammed",
  tagline: "Handmade fabric bags from Morocco.",
  heroHeadline: "Handmade by a father.",
  heroSubline: "Built with quiet hands.",
  heroSupport:
    "Moroccan fabric bags, stitched slowly in a small workshop — no factory, no rush.",
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, ""),
  instagram: env.NEXT_PUBLIC_INSTAGRAM_URL,
  email: env.NEXT_PUBLIC_EMAIL,
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
};

export const aboutMohammed = {
  title: "Baba Mohammed",
  text: "Mohammed — Baba — sews every bag by hand with simple tools. His workshop is a room, not a factory. Each piece carries time, fabric, and care.",
  pullQuote: "Every stitch is a decision made slowly.",
};

export const craftSteps = [
  {
    step: "01",
    title: "Choose the material",
    text: "Fabric is chosen by hand — texture, weight, and color matter before the first cut is made.",
  },
  {
    step: "02",
    title: "Handmade production",
    text: "Each seam is sewn slowly. No factory — only needles, thread, and quiet attention in the workshop.",
  },
  {
    step: "03",
    title: "The final piece",
    text: "Straps checked, edges finished. The bag leaves only when it feels right in the maker's hands.",
  },
] as const;

export const categories = [
  { value: "bag", label: "Fabric bag" },
  { value: "traditional", label: "Traditional craft bag" },
  { value: "custom", label: "Custom order" },
] as const;

export type CategoryValue = (typeof categories)[number]["value"];
