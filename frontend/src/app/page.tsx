import HeroSection from "@/components/home/HeroSection";
import OverviewSection from "@/components/home/OverviewSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CompanySection from "@/components/home/CompanySection";
import ContactSection from "@/components/home/ContactSection";
import WhatsAppBubble from "@/components/shared/WhatsAppBubble";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <OverviewSection />
      <FeaturedProjects />
      <CompanySection />
      <ContactSection />
      <WhatsAppBubble />
    </main>
  );
}