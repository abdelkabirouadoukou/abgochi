"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function DeleteClientButton({
  id,
  clientName,
}: {
  id: string;
  clientName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmName, setConfirmName] = useState("");

  const close = useCallback(() => {
    if (!loading) {
      setOpen(false);
      setError(null);
      setConfirmName("");
    }
  }, [loading]);

  const canDelete =
    confirmName.trim().toLowerCase() === clientName.trim().toLowerCase();

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
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Suppression impossible.");
        setLoading(false);
        return;
      }
      setOpen(false);
      router.push("/admin/clients");
      router.refresh();
    } catch {
      setError("Erreur réseau.");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-ghost w-full border-red-500/30 py-4 text-red-400"
      >
        Supprimer ce client
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <div
            className="admin-card w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg text-white">Supprimer ce client ?</p>
            <p className="mt-2 text-white/70">{clientName}</p>
            <p className="mt-1 text-sm text-white/40">Action irréversible.</p>
            <label className="mt-5 block text-sm text-white/60">
              Tapez le nom du client pour confirmer :
              <input
                type="text"
                value={confirmName}
                onChange={(e) => setConfirmName(e.target.value)}
                className="input-luxury mt-2"
                placeholder={clientName}
                autoComplete="off"
              />
            </label>
            {error ? (
              <p className="mt-3 text-sm text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading || !canDelete}
                className="btn-primary flex-1 border-red-500/50 bg-red-950/80 py-4 disabled:opacity-50"
              >
                {loading ? "Suppression…" : "Oui, supprimer"}
              </button>
              <button
                type="button"
                onClick={close}
                disabled={loading}
                className="btn-ghost flex-1 py-4"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
