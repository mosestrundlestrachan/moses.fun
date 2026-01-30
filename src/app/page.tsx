import Hero from "@/components/ui/Hero";
import Projects from "@/components/ui/Projects";
import Photography from "@/components/ui/Photography";
import Contact from "@/components/ui/Contact";

import Resume from "@/components/ui/Resume";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Hero />
      <SectionWrapper id="projects" className="w-full">
        <Projects />
      </SectionWrapper>



      <SectionWrapper id="about" className="w-full">
        {/* Resume acts as the detailed 'About' section interaction */}
        <Resume />
      </SectionWrapper>



      <SectionWrapper id="photos" className="w-full">
        <Photography />
      </SectionWrapper>



      <SectionWrapper id="contact" className="w-full">
        <Contact />
      </SectionWrapper>
    </main>
  );
}
