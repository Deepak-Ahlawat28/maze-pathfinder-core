import { HeroSection } from "@/components/HeroSection";
import { AbstractSection } from "@/components/AbstractSection";
import { MethodologySection } from "@/components/MethodologySection";
import { SimulationSection } from "@/components/SimulationSection";
import { PerformanceSection } from "@/components/PerformanceSection";
import { ConclusionSection } from "@/components/ConclusionSection";
import { Footer } from "@/components/Footer";
import { CodeSection } from "@/components/CodeSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AbstractSection />
      <MethodologySection />
      <SimulationSection />
      <PerformanceSection />
      <CodeSection />
      <ConclusionSection />
      <Footer />
    </div>
  );
};

export default Index;
