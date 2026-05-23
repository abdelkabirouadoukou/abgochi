import { CinematicFooter } from "@/components/store/CinematicFooter";
import { LandingNavbar } from "@/components/store/LandingNavbar";
import { StorefrontMotion } from "@/components/store/StorefrontMotion";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StorefrontMotion />
      <LandingNavbar />
      <main className="page-enter">{children}</main>
      <CinematicFooter />
    </>
  );
}
