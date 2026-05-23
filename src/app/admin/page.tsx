import Link from "next/link";
import { getClientStats } from "@/lib/clients";
import { getProductStats } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let stats = { total: 0, active: 0 };
  let clientStats = { total: 0, pending: 0, inProgress: 0, done: 0 };
  try {
    stats = await getProductStats();
  } catch {
    /* db */
  }
  try {
    clientStats = await getClientStats();
  } catch {
    /* db */
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl text-white">Tableau de bord</h1>
        <p className="mt-2 text-lg text-white/50">Gestion simple — produits et clients</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total produits" value={stats.total} />
        <StatCard label="Total clients" value={clientStats.total} />
        <StatCard label="En attente" value={clientStats.pending} highlight />
        <StatCard label="En cours" value={clientStats.inProgress} />
        <StatCard label="Terminés" value={clientStats.done} />
        <StatCard label="Produits actifs" value={stats.active} />
      </div>

      <div>
        <h2 className="mb-4 text-sm uppercase tracking-widest text-accent">
          Actions rapides
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction href="/admin/products/new" label="+ Ajouter produit" accent />
          <QuickAction href="/admin/clients/new" label="+ Ajouter client" accent />
          <QuickAction href="/admin/clients" label="Voir tous les clients" />
          <QuickAction href="/admin/products" label="Gérer les produits" />
          <QuickAction href="/admin/hero" label="Images hero" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`admin-card ${highlight && value > 0 ? "border-amber-500/30" : ""}`}
    >
      <p className="text-xs uppercase tracking-widest text-accent">{label}</p>
      <p className="mt-3 font-display text-5xl text-white">{value}</p>
    </div>
  );
}

function QuickAction({
  href,
  label,
  accent,
}: {
  href: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`admin-card flex min-h-[100px] items-center justify-center px-4 text-center text-lg transition ${
        accent
          ? "text-accent hover:border-accent/40"
          : "text-white hover:border-white/25"
      }`}
    >
      {label}
    </Link>
  );
}
