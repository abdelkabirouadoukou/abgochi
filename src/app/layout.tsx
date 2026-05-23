import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageLoader } from "@/components/layout/PageLoader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: `${siteConfig.brand} | Handcrafted Moroccan Knives & Leather`,
  description:
    "Premium handcrafted Moroccan knives and leather goods by artisan Mohammed. Traditional craftsmanship forged by hand.",
  keywords: [
    "Moroccan knives",
    "handcrafted leather",
    "artisan atelier",
    "AbGochi",
    "custom knives",
  ],
  openGraph: {
    title: siteConfig.brand,
    description: siteConfig.subheadline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="grain min-h-screen bg-background text-foreground antialiased">
        <PageLoader />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
