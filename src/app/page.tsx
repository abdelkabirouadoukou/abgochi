import { About } from "@/components/sections/About";
import { CustomOrders } from "@/components/sections/CustomOrders";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <About />
      <Gallery />
      <CustomOrders />
      <Testimonials />
    </>
  );
}
