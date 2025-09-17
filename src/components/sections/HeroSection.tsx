import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { ThreeBackground } from "../ThreeBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Rocket, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll progress (0 to 1)
  const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.8), 1);

  // Easing function
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(scrollProgress);

  // Only scale and fade (no left/top translation)
  const scale = 1 - (0.2 * easedProgress); // Slight shrink
  const opacity = 1 - (0.3 * scrollProgress); // Slight fade

  return (
    <BentoCard size="2x2" className="relative overflow-hidden" hover={false}>
      <ThreeBackground />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          
          <motion.p 
            className="text-2xl md:text-3xl text-foreground/90 mb-8 max-w-3xl text-midnight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Empowering Innovation, Building the Future 
          </motion.p>
          
          <motion.p 
            className="text-lg mb-12 max-w-2xl " 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            We innovate, build, and transform businesses with cutting-edge technology, 
            scalable solutions, and unmatched expertise in the digital landscape. 
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Link to="/about">
              <Button className="primary group">
                <Lightbulb className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Innovate
              </Button>
            </Link>
            <Link to="/solutions">
              <Button className="primary group" >
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Build
              </Button>
            </Link>
            <Button className="primary group" >
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              Transform
            </Button>
            <Link to="/contact">
              <Button className="btn-neon group ">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </BentoCard>
  );
};
