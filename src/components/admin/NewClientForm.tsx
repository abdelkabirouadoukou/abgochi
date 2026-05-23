"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewClientForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [productInterest, setProductInterest] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          productInterest: productInterest.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        setError("Impossible d'ajouter le client.");
        return;
      }

      const client = await res.json();
      router.push(`/admin/clients/${client.id}`);
      router.refresh();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-card mx-auto max-w-xl space-y-5">
      <h2 className="text-xl text-white">Nouveau client</h2>

      <Field label="Nom *">
        <input
          className="input-luxury text-lg py-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Field>
      <Field label="Téléphone">
        <input
          className="input-luxury text-lg py-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="2126..."
        />
      </Field>
      <Field label="Ville">
        <input
          className="input-luxury text-lg py-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Field>
      <Field label="Produit / demande">
        <input
          className="input-luxury text-lg py-4"
          value={productInterest}
          onChange={(e) => setProductInterest(e.target.value)}
        />
      </Field>
      <Field label="Message">
        <textarea
          className="input-luxury min-h-[100px] text-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Field>

      {error ? (
        <p className="text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving || !name.trim()}
        className="btn-primary w-full py-5 text-base disabled:opacity-40"
      >
        {saving ? "Création…" : "Créer le client"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-accent">{label}</label>
      {children}
    </div>
  );
}
