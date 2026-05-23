import type { ClientStatus } from "@/generated/prisma/enums";

export const CLIENT_STATUS_OPTIONS: { value: ClientStatus; label: string }[] = [
  { value: "pending", label: "En attente" },
  { value: "in_progress", label: "En cours" },
  { value: "done", label: "Terminé" },
];

export function statusLabel(status: ClientStatus) {
  return CLIENT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function statusBadgeClass(status: ClientStatus) {
  switch (status) {
    case "pending":
      return "bg-amber-950/60 text-amber-200 border-amber-500/30";
    case "in_progress":
      return "bg-blue-950/60 text-blue-200 border-blue-500/30";
    case "done":
      return "bg-emerald-950/60 text-emerald-200 border-emerald-500/30";
    default:
      return "bg-white/10 text-white/70 border-white/20";
  }
}
