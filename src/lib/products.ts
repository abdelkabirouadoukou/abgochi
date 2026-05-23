import type { ProductAvailability, ProductCategory } from "@/generated/prisma/client";
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
  availability: ProductAvailability;
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
  availability?: ProductAvailability | null;
  images: string[];
  active: boolean;
  createdAt: Date;
}): ProductDTO {
  const availability = p.availability ?? (p.stock > 0 ? "in_stock" : "made_to_order");

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: decimalToNumber(p.price),
    category: p.category,
    stock: p.stock,
    availability,
    images: p.images,
    active: p.active,
    createdAt: p.createdAt,
  };
}

const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  category: true,
  stock: true,
  availability: true,
  images: true,
  active: true,
  createdAt: true,
} as const;

const legacyProductSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  category: true,
  stock: true,
  images: true,
  active: true,
  createdAt: true,
} as const;

function isAvailabilitySelectError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes("Unknown field `availability`") &&
    error.message.includes("model `Product`")
  );
}

export async function getActiveProducts() {
  const query = {
    where: { active: true },
    orderBy: { createdAt: "desc" as const },
  };

  let products;
  try {
    products = await prisma.product.findMany({
      ...query,
      select: productSelect,
    });
  } catch (error) {
    if (!isAvailabilitySelectError(error)) throw error;
    products = await prisma.product.findMany({
      ...query,
      select: legacyProductSelect,
    });
  }

  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string) {
  const query = { where: { slug, active: true } };

  let product;
  try {
    product = await prisma.product.findFirst({
      ...query,
      select: productSelect,
    });
  } catch (error) {
    if (!isAvailabilitySelectError(error)) throw error;
    product = await prisma.product.findFirst({
      ...query,
      select: legacyProductSelect,
    });
  }

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
  availability: ProductAvailability;
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
      availability: input.availability,
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
      ...(input.availability && { availability: input.availability }),
      ...(input.images && { images: input.images }),
      ...(input.active !== undefined && { active: input.active }),
    },
  });
  return mapProduct(product);
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
}
