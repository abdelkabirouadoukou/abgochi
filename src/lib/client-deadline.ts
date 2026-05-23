export function isDeadlineOverdue(deadline: string | null, status: string): boolean {
  if (!deadline || status === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline + "T12:00:00");
  return due < today;
}

export function formatDeadlineLabel(deadline: string | null) {
  if (!deadline) return null;
  return new Date(deadline + "T12:00:00").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
