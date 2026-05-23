import Link from "next/link";
import { ClientsAdminList } from "@/components/admin/ClientsAdminList";
import { getAllClients } from "@/lib/clients";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  let clients: Awaited<ReturnType<typeof getAllClients>> = [];
  try {
    clients = await getAllClients();
  } catch {
    clients = [];
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-white md:text-4xl">Clients</h1>
          <p className="mt-2 text-white/50">Suivi des commandes — simple et rapide</p>
        </div>
        <Link href="/admin/clients/new" className="btn-primary py-4 text-center text-base">
          + Nouveau client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="admin-card py-12 text-center">
          <p className="text-lg text-white/50">Aucun client pour l&apos;instant.</p>
          <p className="mt-2 text-sm text-white/35">
            Les demandes WhatsApp sont ajoutées automatiquement.
          </p>
          <Link href="/admin/clients/new" className="btn-primary mt-6 inline-block py-4">
            Ajouter manuellement
          </Link>
        </div>
      ) : (
        <ClientsAdminList clients={clients} />
      )}
    </div>
  );
}
