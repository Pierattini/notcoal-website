import HeroSection from "@/components/home/HeroSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CompanySection from "@/components/home/CompanySection";
import ContactSection from "@/components/home/ContactSection";
import WhatsAppBubble from "@/components/shared/WhatsAppBubble";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <CompanySection />
      <ContactSection />
      <WhatsAppBubble />
    </main>
  );
}