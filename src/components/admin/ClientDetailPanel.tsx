"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClientFileUploader } from "@/components/admin/ClientFileUploader";
import { ClientStatusBadge } from "@/components/admin/ClientStatusBadge";
import { DeleteClientButton } from "@/components/admin/DeleteClientButton";
import type { ClientDTO } from "@/lib/clients";
import { CLIENT_STATUS_OPTIONS } from "@/lib/client-status";
import { isDeadlineOverdue } from "@/lib/client-deadline";
import { whatsappContactUrl } from "@/lib/whatsapp";
import type { ClientStatus } from "@/generated/prisma/enums";

type ClientDetailPanelProps = {
  client: ClientDTO;
};

export function ClientDetailPanel({ client: initial }: ClientDetailPanelProps) {
  const router = useRouter();
  const [client, setClient] = useState(initial);
  const [deadline, setDeadline] = useState(initial.deadline ?? "");
  const [status, setStatus] = useState<ClientStatus>(initial.status);
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deadlineTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipDeadlineSave = useRef(true);
  const skipNotesSave = useRef(true);
  const skipPhoneSave = useRef(true);
  const phoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const overdue = isDeadlineOverdue(client.deadline, client.status);

  const patch = useCallback(
    async (data: Record<string, unknown>) => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch(`/api/clients/${client.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          setError("Enregistrement impossible.");
          return;
        }
        const updated = await res.json();
        setClient(updated);
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 2000);
        router.refresh();
      } catch {
        setError("Erreur réseau.");
      } finally {
        setSaving(false);
      }
    },
    [client.id, router]
  );

  async function onStatusChange(next: ClientStatus) {
    setStatus(next);
    await patch({ status: next });
  }

  useEffect(() => {
    if (skipDeadlineSave.current) {
      skipDeadlineSave.current = false;
      return;
    }
    if (deadlineTimer.current) clearTimeout(deadlineTimer.current);
    deadlineTimer.current = setTimeout(() => {
      patch({ deadline: deadline || null });
    }, 600);
    return () => {
      if (deadlineTimer.current) clearTimeout(deadlineTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce deadline only
  }, [deadline]);

  useEffect(() => {
    if (skipNotesSave.current) {
      skipNotesSave.current = false;
      return;
    }
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => {
      patch({ notes });
    }, 700);
    return () => {
      if (notesTimer.current) clearTimeout(notesTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce notes
  }, [notes]);

  useEffect(() => {
    if (skipPhoneSave.current) {
      skipPhoneSave.current = false;
      return;
    }
    if (phoneTimer.current) clearTimeout(phoneTimer.current);
    phoneTimer.current = setTimeout(() => {
      patch({ phone: phone.trim() });
    }, 600);
    return () => {
      if (phoneTimer.current) clearTimeout(phoneTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce phone
  }, [phone]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/clients"
            className="text-sm text-white/50 hover:text-accent"
          >
            ← Retour aux clients
          </Link>
          <h1 className="mt-4 font-display text-3xl text-white md:text-4xl">
            {client.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ClientStatusBadge status={client.status} />
            {overdue ? (
              <span className="rounded-sm bg-red-950/80 px-2 py-1 text-xs text-red-300">
                Date dépassée
              </span>
            ) : null}
            {saving ? (
              <span className="text-xs text-white/40">Enregistrement…</span>
            ) : savedFlash ? (
              <span className="text-xs text-emerald-400/90">Enregistré</span>
            ) : null}
          </div>
        </div>
        <a
          href={
            client.phone.trim()
              ? `https://wa.me/${client.phone.replace(/\D/g, "")}`
              : whatsappContactUrl(`Salam ${client.name}`)
          }
          className="btn-primary py-4 text-center text-base"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>

      <section className="admin-card space-y-4">
        <h2 className="text-xl text-accent">Informations</h2>
        <InfoRow label="Nom" value={client.name} />
        <div>
          <label className="mb-2 block text-sm text-white/50">Téléphone</label>
          <input
            className="input-luxury w-full text-lg py-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="2126..."
            inputMode="tel"
          />
        </div>
        <InfoRow label="Ville" value={client.city || "—"} />
        <InfoRow label="Produit / demande" value={client.productInterest || "—"} />
        <InfoRow label="Message client" value={client.message || "—"} multiline />
        <p className="text-xs text-white/35">
          Reçu le{" "}
          {new Date(client.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </section>

      <section className="admin-card space-y-5">
        <h2 className="text-xl text-accent">Statut</h2>
        <select
          className="input-luxury w-full text-lg py-4"
          value={status}
          disabled={saving}
          onChange={(e) => onStatusChange(e.target.value as ClientStatus)}
        >
          {CLIENT_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-white/40">Le statut s&apos;enregistre tout seul.</p>
      </section>

      <section
        className={`admin-card space-y-5 ${overdue ? "border-red-500/35" : ""}`}
      >
        <h2 className="text-xl text-accent">Date de livraison</h2>
        <input
          type="date"
          className="input-luxury w-full text-lg py-4"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        {deadline ? (
          <button
            type="button"
            className="text-sm text-white/50 hover:text-accent"
            onClick={() => setDeadline("")}
          >
            Effacer la date
          </button>
        ) : null}
        {overdue ? (
          <p className="text-sm text-red-300">Cette date est dépassée.</p>
        ) : null}
      </section>

      <section className="admin-card space-y-4">
        <h2 className="text-xl text-accent">Notes internes</h2>
        <p className="text-sm text-white/40">Pour vous seulement — enregistrement automatique.</p>
        <textarea
          className="input-luxury min-h-[140px] w-full text-lg leading-relaxed"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ex : tissu rouge, livraison Casablanca…"
        />
      </section>

      <section className="admin-card">
        <ClientFileUploader
          clientId={client.id}
          files={client.files}
          onFilesChange={(files) => setClient((c) => ({ ...c, files }))}
        />
      </section>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <DeleteClientButton id={client.id} clientName={client.name} />
    </div>
  );
}

function InfoRow({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <p className="text-sm text-white/50">{label}</p>
      <p
        className={`mt-1 text-lg text-white ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
