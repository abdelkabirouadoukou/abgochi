import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const sampleProducts = [
  {
    name: "Medina Fabric Tote",
    slug: "medina-fabric-tote",
    description:
      "Hand-stitched fabric bag made in the workshop with simple tools. Strong weave, minimal hardware, built for daily use.",
    price: 450,
    category: "bag" as const,
    stock: 4,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  {
    name: "Souk Traditional Carry",
    slug: "souk-traditional-carry",
    description:
      "A simple traditional craft bag — cut, sewn, and finished by hand. No machines, just patience and skill.",
    price: 380,
    category: "traditional" as const,
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  {
    name: "Custom Workshop Bag",
    slug: "custom-workshop-bag",
    description:
      "Order a bag made to your size and fabric choice. Mohammed builds each one slowly in the family workshop.",
    price: 520,
    category: "custom" as const,
    stock: 2,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80&auto=format&fit=crop",
    ],
  },
];

async function main() {
  for (const p of sampleProducts) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: { ...p, active: true },
    });
  }
  console.log("Seeded products:", sampleProducts.length);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
