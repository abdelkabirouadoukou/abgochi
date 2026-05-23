export default function ClientsLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex justify-between gap-4">
        <div className="h-10 w-40 rounded bg-white/10" />
        <div className="h-12 w-36 rounded bg-white/10" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-11 w-24 rounded bg-white/10" />
        ))}
      </div>
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="admin-card h-32" />
        ))}
      </div>
    </div>
  );
}
