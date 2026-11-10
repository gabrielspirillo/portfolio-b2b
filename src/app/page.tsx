import { Header } from "@/components/Header";
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
import { AmbientBackground } from "@/components/AmbientBackground";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function Home() {
  return (
    <div className="w-full max-w-full overflow-x-clip relative">
      <AmbientBackground />
      <Header />
      <main className="flex flex-col w-full">
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
      <RevealOnScroll />
    </div>
  );
}
