"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function DeleteProductButton({
  id,
  productName,
}: {
  id: string;
  productName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const close = useCallback(() => {
    if (!loading) {
      setOpen(false);
      setError(null);
    }
  }, [loading]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Could not delete. Try again.");
        setLoading(false);
        return;
      }
      setOpen(false);
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-ghost border-red-500/30 px-4 py-3 text-red-400 hover:border-red-400"
      >
        Delete
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
          onClick={close}
        >
          <div
            className="admin-card w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p id="delete-title" className="text-lg text-white">
              Delete this product?
            </p>
            <p className="mt-2 text-white/70">{productName}</p>
            <p className="mt-1 text-sm text-white/40">This cannot be undone.</p>
            {error ? (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="btn-primary flex-1 border-red-500/50 bg-red-950/80 py-4 disabled:opacity-50"
              >
                {loading ? "Deleting…" : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={close}
                disabled={loading}
                className="btn-ghost flex-1 py-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
