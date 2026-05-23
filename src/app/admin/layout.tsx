import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 px-4 py-4 sm:px-6 md:px-10 md:py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/admin" className="font-display text-xl text-accent sm:text-2xl">
            ABGOCHI Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-white/70 sm:gap-5">
            <Link href="/admin" className="hover:text-accent">
              Accueil
            </Link>
            <Link href="/admin/clients" className="font-medium text-accent hover:text-white">
              Clients
            </Link>
            <Link href="/admin/products" className="hover:text-accent">
              Produits
            </Link>
            <Link href="/admin/hero" className="hover:text-accent">
              Hero
            </Link>
            <Link href="/" className="hover:text-white">
              Boutique
            </Link>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">{children}</main>
    </div>
  );
}
