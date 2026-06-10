import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { AboutSection } from "@/components/sections/AboutSection";
import { CoreValuesSection } from "@/components/sections/CoreValuesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { Footer } from "@/components/Footer";

const About = () => {
  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-fixed bg-cover bg-center bg-no-repeat relative mt-16"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1663047091392-425566f3ea56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 min-h-screen pt-20">
        {/* Page Header */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-darkorange mb-6">
                About
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-white" >
                We are a team of passionate innovators dedicated to 
                transforming the digital landscape through cutting-edge technology solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <AboutSection />
              <CoreValuesSection />
              <StatsSection />
            </BentoGrid>
          </div>
        </section>
         {/* Footer with background image */}
         <Footer />
      </div>
    </div>
  );
};

export default About;