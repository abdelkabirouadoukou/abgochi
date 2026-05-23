"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { categories } from "@/lib/config";
import type { ProductDTO } from "@/lib/products";
import { normalizeCategory } from "@/lib/utils";
import { productSchema } from "@/lib/validators";

type ProductFormProps = {
  product?: ProductDTO;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState(normalizeCategory(product?.category));
  const [stock, setStock] = useState(product?.stock?.toString() ?? "1");
  const [active, setActive] = useState(product?.active ?? true);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      stock: parseInt(stock, 10),
      images,
      active,
    };

    const parsed = productSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const first =
        flat.name?.[0] ??
        flat.description?.[0] ??
        flat.price?.[0] ??
        flat.images?.[0] ??
        "Please check the form";
      setError(first);
      return;
    }

    setSaving(true);

    const url = product ? `/api/products/${product.id}` : "/api/products";
    const method = product ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(typeof data.error === "string" ? data.error : "Could not save");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-8"
    >
      <div className="admin-card space-y-5">
        <h2 className="text-xl text-white">
          {product ? "Edit product" : "Add new product"}
        </h2>

        <Field label="Product name">
          <input
            className="input-luxury text-xl py-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field label="Description">
          <textarea
            className="input-luxury min-h-[140px] text-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Price (MAD)">
            <input
              type="number"
              min="1"
              step="1"
              className="input-luxury text-xl py-4"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Field>
          <Field label="Stock">
            <input
              type="number"
              min="0"
              className="input-luxury text-xl py-4"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </Field>
        </div>

        <Field label="Category">
          <select
            className="input-luxury text-lg py-4"
            value={category}
            onChange={(e) => setCategory(normalizeCategory(e.target.value))}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>

        <label className="flex items-center gap-4 text-lg text-white">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-6 w-6 accent-[#c9b896]"
          />
          Show on website
        </label>
      </div>

      <div className="admin-card">
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {error ? <p className="text-lg text-red-400" role="alert">{error}</p> : null}

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="submit"
          disabled={saving || images.length === 0}
          className="btn-primary flex-1 py-5 text-base disabled:opacity-40"
        >
          {saving ? "Saving…" : product ? "Save changes" : "Add product"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-ghost flex-1 py-5 text-base">
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-base font-medium text-accent">{label}</label>
      {children}
    </div>
  );
}
