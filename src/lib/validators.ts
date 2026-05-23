import { z } from "zod";

export const productAvailabilitySchema = z.enum([
  "in_stock",
  "made_to_order",
  "unavailable",
]);

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.enum(["bag", "traditional", "custom"]),
  stock: z.coerce.number().int().min(0),
  availability: productAvailabilitySchema,
  images: z.array(z.string().url()).min(1, "Add at least one image"),
  active: z.boolean().optional().default(true),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const orderFormSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  city: z.string().min(2, "Enter your city"),
  quantity: z.coerce.number().int().min(1).max(99),
  message: z.string().optional(),
});

export const clientStatusSchema = z.enum(["pending", "in_progress", "done"]);

export const clientInquirySchema = z.object({
  name: z.string().min(2),
  phone: z.string().optional().default(""),
  city: z.string().optional().default(""),
  message: z.string().optional().default(""),
  productInterest: z.string().optional().default(""),
});

export const clientCreateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().optional().default(""),
  city: z.string().optional().default(""),
  message: z.string().optional().default(""),
  productInterest: z.string().optional().default(""),
  status: clientStatusSchema.optional(),
  deadline: z.string().nullable().optional(),
});

export const clientUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
  productInterest: z.string().optional(),
  status: clientStatusSchema.optional(),
  deadline: z.string().nullable().optional(),
  notes: z.string().optional(),
});

export const clientFileSchema = z.object({
  fileUrl: z.string().url(),
  fileName: z.string().min(1),
});
