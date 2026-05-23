"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@/lib/hooks";
import { ClientStatusBadge } from "@/components/admin/ClientStatusBadge";
import type { ClientListItem } from "@/lib/clients";
import { CLIENT_STATUS_OPTIONS } from "@/lib/client-status";
import {
  formatDeadlineLabel,
  isDeadlineOverdue,
} from "@/lib/client-deadline";
import type { ClientStatus } from "@/generated/prisma/enums";

type ClientsAdminListProps = {
  clients: ClientListItem[];
};

const FILTERS: { value: "all" | ClientStatus; label: string }[] = [
  { value: "all", label: "Tous" },
  ...CLIENT_STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label })),
];

export function ClientsAdminList({ clients }: ClientsAdminListProps) {
  const [filter, setFilter] = useState<"all" | ClientStatus>("all");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 280);

  const filtered = useMemo(() => {
    let list = filter === "all" ? clients : clients.filter((c) => c.status === filter);
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.phone?.toLowerCase().includes(q) ?? false) ||
        (c.city?.toLowerCase().includes(q) ?? false) ||
        (c.productInterest?.toLowerCase().includes(q) ?? false)
    );
  }, [clients, filter, debouncedQuery]);

  return (
    <div className="space-y-6">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher par nom, ville, téléphone…"
        className="input-luxury max-w-xl"
        aria-label="Rechercher des clients"
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-sm border px-4 py-3 text-sm font-medium transition ${
              filter === f.value
                ? "border-accent bg-accent/15 text-accent"
                : "border-white/15 text-white/55 hover:border-white/30 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card py-10 text-center text-white/50">
          Aucun client dans cette catégorie.
        </div>
      ) : (
        <div className="grid gap-5">
          {filtered.map((client) => {
            const deadlineLabel = formatDeadlineLabel(client.deadline);
            const overdue = isDeadlineOverdue(client.deadline, client.status);

            return (
              <div
                key={client.id}
                className={`admin-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
                  overdue ? "border-red-500/35" : ""
                }`}
              >
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xl font-medium text-white">{client.name}</p>
                    <ClientStatusBadge status={client.status} />
                    {overdue ? (
                      <span className="rounded-sm bg-red-950/80 px-2 py-0.5 text-xs text-red-300">
                        En retard
                      </span>
                    ) : null}
                  </div>
                  <p className="text-white/60">
                    {client.phone || "Pas de téléphone"}
                    {client.city ? ` · ${client.city}` : ""}
                  </p>
                  {client.productInterest ? (
                    <p className="truncate text-sm text-accent/90">
                      {client.productInterest}
                    </p>
                  ) : null}
                  <div className="flex flex-wrap gap-4 text-sm text-white/40">
                    {deadlineLabel ? (
                      <span className={overdue ? "text-red-300" : ""}>
                        Livraison : {deadlineLabel}
                      </span>
                    ) : (
                      <span>Pas de date</span>
                    )}
                    <span>
                      {client.fileCount} fichier{client.fileCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/clients/${client.id}`}
                  className="btn-primary shrink-0 py-4 text-center text-base sm:min-w-[140px]"
                >
                  Ouvrir
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
