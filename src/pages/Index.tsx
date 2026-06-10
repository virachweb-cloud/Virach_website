import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Sections
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { AboutSection } from "@/components/sections/AboutSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Set initial theme
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      
      {/* Custom cursor effect */}
      <div className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"></div>
      
      <main className="relative">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <HeroSection />
            </BentoGrid>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <WhyChooseSection />
              <AboutSection />
              <StatsSection />
              <SolutionsPreview />
              <CoreValuesSection />
              <CTASection />
            </BentoGrid>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-7xl mx-auto"
            >
              <ContactSection />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
