import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { BentoCard } from "@/components/BentoCard";
import { Code, Smartphone, Cloud, Bot, BarChart, Palette } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const solutions = [
  {
    icon: Code,
    title: "Web Development",
    description: " Scalable, secure, and high-performance websites tailored to your business goals.",
    features: ["Responsive Design", "SEO Optimization", "Performance Focused", "Modern Frameworks"]
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: " Intuitive, feature-rich mobile applications for Android and iOS.",
    features: ["Cross-Platform", "Native Performance", "Offline Support", "Push Notifications"]
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Engaging, user-friendly designs that deliver seamless experiences.",
    features: ["User Research", "Prototyping", "Design Systems", "Accessibility"]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Flexible, reliable, and secure cloud infrastructure for modern businesses.",
    features: ["AWS/Azure/GCP", "Microservices", "Auto-scaling", "DevOps"]
  },
  {
    icon: Bot,
    title: "Automation",
    description: "Streamlined workflows that save time, cut costs, and boost efficiency.",
    features: ["Process Automation", "AI Integration", "Workflow Optimization", "Custom Bots"]
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    description: "Actionable insights to drive smarter decisions and measurable results.",
    features: ["Data Visualization", "Real-time Analytics", "Custom Dashboards", "ML/AI Insights"]
  }
];

const Solutions = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const solution = searchParams.get('solution');
    if (solution) {
      const element = document.getElementById(solution);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [searchParams]);

  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-fixed bg-cover bg-center bg-no-repeat relative mt-16"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661492233417-1a32cea3405a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
                Our Solutions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-white">
                Comprehensive technology solutions designed to transform your business 
                and drive growth in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Preview */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <SolutionsPreview />
            </BentoGrid>
          </div>
        </section>

        {/* Detailed Solutions */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                const slug = solution.title.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
                return (
                  <div key={solution.title} id={slug}>
                    <BentoCard size="1x1" className="p-6" delay={index * 0.1}>
                      <motion.div
                        className="h-full flex flex-col"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="p-3 rounded-xl glass w-fit mb-4"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Icon className="h-8 w-8 text-midnight" />
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-foreground mb-3 text-midnight">
                          {solution.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 flex-1 text-primary">
                          {solution.description}
                        </p>
                        <div className="space-y-2">
                          {solution.features.map((feature, idx) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 rounded-full bg-midnight" />
                              <span className="text-sm text-muted-foreground text-primary">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </BentoCard>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
         {/* Footer with background image */}
         <Footer />
      </div>
    </div>
  );
};

export default Solutions;