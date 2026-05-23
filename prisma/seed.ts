import { PrismaClient } from "../src/generated/prisma/client";
import { galleryItems, products, testimonials } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.testimonial.deleteMany();

  await prisma.product.createMany({
    data: products.map((p, i) => ({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      currency: p.currency,
      imageUrl: p.imageUrl,
      featured: true,
      sortOrder: i,
    })),
  });

  await prisma.galleryImage.createMany({
    data: galleryItems.map((g, i) => ({
      url: g.url,
      alt: g.alt,
      category: g.category,
      sortOrder: i,
    })),
  });

  await prisma.testimonial.createMany({
    data: testimonials.map((t, i) => ({
      quote: t.quote,
      author: t.author,
      location: t.location,
      sortOrder: i,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
