import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import FeaturedGallery from "@/components/sections/FeaturedGallery";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <FeaturedGallery />
      <Testimonials />
      <CTABanner />
    </>
  );
}
