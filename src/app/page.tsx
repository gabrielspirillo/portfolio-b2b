import { Header } from "@/components/Header";
import { SocialSidebar } from "@/components/SocialSidebar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { CaseStudies } from "@/components/CaseStudies";
import { CollaborationSection } from "@/components/CollaborationSection";
import { Testimonials } from "@/components/Testimonials";
import { TechStack } from "@/components/TechStack";
import { Education } from "@/components/Education";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <SocialSidebar />
      <main className="flex flex-col min-h-screen w-full">
        <HeroSection />
        <AboutSection />
        <ServicesGrid />
        <CaseStudies />
        <CollaborationSection />
        <Testimonials />
        <TechStack />
        <Education />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
