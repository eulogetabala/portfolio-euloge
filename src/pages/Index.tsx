import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BlueprintSection from "@/components/BlueprintSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientsSection from "@/components/ClientsSection";
import MoonshotSection from "@/components/MoonshotSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionSeparator from "@/components/SectionSeparator";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <SectionSeparator />
      <BlueprintSection />
      <SectionSeparator />
      <SkillsSection />
      <SectionSeparator />
      <ProjectsSection />
      <SectionSeparator />
      <TestimonialsSection />
      <SectionSeparator />
      <ClientsSection />
      <SectionSeparator />
      <MoonshotSection />
      <SectionSeparator />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
