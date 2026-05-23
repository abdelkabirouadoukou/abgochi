import Link from "next/link";
import { NewClientForm } from "@/components/admin/NewClientForm";

export default function NewClientPage() {
  return (
    <div className="space-y-8">
      <Link href="/admin/clients" className="text-sm text-white/50 hover:text-accent">
        ← Retour aux clients
      </Link>
      <NewClientForm />
    </div>
  );
}
