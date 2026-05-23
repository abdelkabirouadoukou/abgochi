export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
};

export type GalleryItem = {
  id: string;
  url: string;
  alt: string;
  category: string;
  span?: "tall" | "wide" | "normal";
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location?: string;
};

export const siteConfig = {
  brand: "Atelier Mohammed",
  tagline: "AbGochi",
  headline: "Handcrafted Moroccan Knives & Leather Goods",
  subheadline: "Traditional craftsmanship forged by hand.",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "contact@ateliermohammed.ma",
};

export const products: Product[] = [
  {
    id: "1",
    name: "Atlas Damascus Chef",
    slug: "atlas-damascus-chef",
    description:
      "Hand-forged carbon steel with a walnut handle. Balanced for precision cuts.",
    price: 4200,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Souk Santoku",
    slug: "souk-santoku",
    description:
      "Compact Japanese-inspired profile finished in a traditional Moroccan forge.",
    price: 3100,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0af29acff0af?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Marrakech Leather Roll",
    slug: "marrakech-leather-roll",
    description:
      "Vegetable-tanned leather tool roll, hand-stitched with waxed linen thread.",
    price: 1850,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Rif Field Knife",
    slug: "rif-field-knife",
    description:
      "Outdoor utility blade with brass bolster and hand-shaped olive wood grip.",
    price: 2800,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Fez Artisan Sheath",
    slug: "fez-artisan-sheath",
    description:
      "Custom-fit leather sheath with hand-burnished edges and solid brass hardware.",
    price: 950,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Medina Carry Folio",
    slug: "medina-carry-folio",
    description:
      "Minimal document folio in full-grain leather with saddle-stitched seams.",
    price: 2200,
    currency: "MAD",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=80&auto=format&fit=crop",
    alt: "Forging a blade on the anvil",
    category: "Knife making",
    span: "tall",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1601925260368-ae2f83b8a468?w=900&q=80&auto=format&fit=crop",
    alt: "Leather stitching at the workbench",
    category: "Leather",
    span: "normal",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1504148455328-c376907d0c59?w=1200&q=80&auto=format&fit=crop",
    alt: "Workshop tools and atmosphere",
    category: "Workshop",
    span: "wide",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=900&q=80&auto=format&fit=crop",
    alt: "Finished chef knife detail",
    category: "Details",
    span: "normal",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop",
    alt: "Hammer and steel sparks",
    category: "Process",
    span: "tall",
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80&auto=format&fit=crop",
    alt: "Hand-stitched leather sheath",
    category: "Leather",
    span: "normal",
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80&auto=format&fit=crop",
    alt: "Artisan sharpening a blade",
    category: "Process",
    span: "normal",
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop",
    alt: "Leather goods display",
    category: "Details",
    span: "wide",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The balance and edge retention are extraordinary. You can feel decades of skill in every cut.",
    author: "Karim B.",
    location: "Casablanca",
  },
  {
    id: "t2",
    quote:
      "My custom leather roll arrived perfectly patinated. It feels like it was made only for me.",
    author: "Sophie L.",
    location: "Paris",
  },
  {
    id: "t3",
    quote:
      "Mohammed understood exactly what I wanted — a knife that is both a tool and a heirloom.",
    author: "James M.",
    location: "London",
  },
];

export function formatPrice(price: number, currency: string) {
  const formatted = new Intl.NumberFormat("fr-MA", {
    maximumFractionDigits: 0,
  }).format(price);
  return `${formatted} ${currency}`;
}
