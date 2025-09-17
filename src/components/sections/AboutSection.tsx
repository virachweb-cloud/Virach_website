import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";

export const AboutSection = () => {
  return (
    <BentoCard size="1x1" className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full flex flex-col justify-center"
      >
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-midnight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          About 
        </motion.h2>
        
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground leading-relaxed text-primary" >
            We are a team of passionate innovators dedicated to transforming 
            the digital landscape through cutting-edge technology solutions.
          </p>
          
          <motion.div
            className="p-4 glass rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-midnight mb-2">Our Mission</h3>
            <p className="text-sm text-muted-foreground text-primary">
              To build and transform businesses with world-class digital solutions that drive 
              measurable growth, operational excellence, and long-term success.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Floating SVG background */}
        <motion.div
          className="absolute bottom-4 right-4 opacity-10"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="currentColor" />
          </svg>
        </motion.div>
      </motion.div>
    </BentoCard>
  );
};