import type { ClientStatus } from "@/generated/prisma/enums";
import { statusBadgeClass, statusLabel } from "@/lib/client-status";

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return (
    <span
      className={`inline-block rounded-sm border px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${statusBadgeClass(status)}`}
    >
      {statusLabel(status)}
    </span>
  );
}
