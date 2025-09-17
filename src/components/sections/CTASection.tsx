import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

export const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/contact");
    setTimeout(() => {
      scroller.scrollTo("contact", {
        duration: 800,
        delay: 100,
        smooth: true,
        offset: -80
      });
    }, 100);
  };
  return (
    <BentoCard size="1x1" className="p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full flex flex-col justify-center text-center relative z-10"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-[#191970] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to Transform Your Business?
        </motion.h2>
        
        <motion.p 
          className="text-muted-foreground mb-4 text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Let's build something amazing together
        </motion.p>
        
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
       <Button onClick={handleGetStarted} 
       className="w-full group bg-orange-500  hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"> 
       Start Your Project 
       <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
       </Button>
        </motion.div>
      </motion.div>
      
      {/* Animated neon ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary/30"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Pulse glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0"
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </BentoCard>
  );
};