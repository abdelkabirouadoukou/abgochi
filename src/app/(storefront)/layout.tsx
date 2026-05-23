import { CinematicFooter } from "@/components/store/CinematicFooter";
import { LandingNavbar } from "@/components/store/LandingNavbar";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PageLoader } from "@/components/motion/PageLoader";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <PageLoader />
      <CustomCursor />
      <LandingNavbar />
      <main>{children}</main>
      <CinematicFooter />
    </MotionProvider>
  );
}
