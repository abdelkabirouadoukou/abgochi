import type { ProductCategory } from "@/generated/prisma/client";
import { prisma } from "./db";
import { decimalToNumber, slugify } from "./utils";

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  images: string[];
  active: boolean;
  createdAt: Date;
};

function mapProduct(p: {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: { toString(): string };
  category: ProductCategory;
  stock: number;
  images: string[];
  active: boolean;
  createdAt: Date;
}): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: decimalToNumber(p.price),
    category: p.category,
    stock: p.stock,
    images: p.images,
    active: p.active,
    createdAt: p.createdAt,
  };
}

export async function getActiveProducts() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug, active: true },
  });
  return product ? mapProduct(product) : null;
}

export async function getAllProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? mapProduct(product) : null;
}

export async function getProductStats() {
  const [total, active] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
  ]);
  return { total, active };
}

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  images: string[];
  active?: boolean;
  slug?: string;
};

export async function createProduct(input: ProductInput) {
  const baseSlug = slugify(input.slug ?? input.name);
  let slug = baseSlug;
  let counter = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`;
  }

  const product = await prisma.product.create({
    data: {
      name: input.name,
      slug,
      description: input.description,
      price: input.price,
      category: input.category,
      stock: input.stock,
      images: input.images,
      active: input.active ?? true,
    },
  });
  return mapProduct(product);
}

export async function updateProduct(id: string, input: Partial<ProductInput>) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(input.name && { name: input.name }),
      ...(input.description && { description: input.description }),
      ...(input.price !== undefined && { price: input.price }),
      ...(input.category && { category: input.category }),
      ...(input.stock !== undefined && { stock: input.stock }),
      ...(input.images && { images: input.images }),
      ...(input.active !== undefined && { active: input.active }),
    },
  });
  return mapProduct(product);
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}
