export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 w-48 rounded bg-white/10" />
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="admin-card h-28" />
        ))}
      </div>
    </div>
  );
}
