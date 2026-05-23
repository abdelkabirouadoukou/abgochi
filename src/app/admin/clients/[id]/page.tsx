import { notFound } from "next/navigation";
import { ClientDetailPanel } from "@/components/admin/ClientDetailPanel";
import { getClientById } from "@/lib/clients";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminClientDetailPage({ params }: Props) {
  const { id } = await params;
  let client = null;
  try {
    client = await getClientById(id);
  } catch {
    client = null;
  }

  if (!client) notFound();

  return <ClientDetailPanel client={client} />;
}
