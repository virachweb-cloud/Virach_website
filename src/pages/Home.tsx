// Home.tsx
import { BentoGrid } from "@/components/BentoGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";
import { JusticeLineBox } from "@/components/JusticeLineBox";
import { Footer } from "@/components/Footer";

const Home = () => {
  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-fixed bg-cover bg-center bg-no-repeat relative mt-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

             {/* Page content */}
       <div className="relative z-10">
         {/* Hero */}
         <section id="home" className="min-h-[80vh] flex items-start justify-center pt-6 md:pt-8">
           <div className="container mx-auto px-4">
             <BentoGrid className="max-w-7xl mx-auto mt-6 md:mt-6">
               <HeroSection />
             </BentoGrid>
           </div>
         </section>

         {/* Other sections */}
         <section className="py-16">
           <div className="container mx-auto px-4">
             <BentoGrid className="max-w-7xl mx-auto">
               <WhyChooseSection />
               <StatsSection />
               <SolutionsPreview />
               <CTASection />
               <JusticeLineBox />
             </BentoGrid>
           </div>
         </section>

         {/* Footer with background image */}
         <Footer />
       </div>
    </div>
  );
};

export default Home;
