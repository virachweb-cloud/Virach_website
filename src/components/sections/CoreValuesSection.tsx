import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { Lightbulb, Users, Trophy, Gem } from "lucide-react";
import { useState } from "react";

const values = [
  { 
    icon: Lightbulb, 
    title: "Innovation", 
    description: "Breaking boundaries with visionary, results-driven ideas",
    color: "text-midnight",
    iconColor: "text-midnight",
    bg: "bg-primary/10"
  },
  { 
    icon: Users, 
    title:"Collaboration", 
    description: "Partnering closely with clients to achieve shared objectives",
    color: "text-midnight",
    iconColor: "text-midnight",
    bg: "bg-midnight/10"
  },
  { 
    icon: Trophy, 
    title: "Excellence", 
    description: "Delivering exceptional value through precision and expertise",
    color: "text-midnight",
    iconColor: "text-midnight",
    bg: "bg-accent/10"
  },
  { 
    icon: Gem, 
    title: "Quality", 
    description: "Upholding the highest standards in every project we deliver",
    color: "text-midnight",
    iconColor: "text-midnight",
    bg: "bg-accent/10"
  }
];

export const CoreValuesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((value, index) => {
        const Icon = value.icon;
        const isHovered = hoveredIndex === index;
        
        return (
          <BentoCard key={value.title} size="1x1" className="p-4" delay={index * 0.1}>
            <motion.div
              className="h-full flex flex-col relative group"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <motion.div
                className={`p-3 rounded-xl glass w-fit mb-4 ${value.bg} relative z-10`}
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  scale: 1.15
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon className={`h-8 w-8 ${value.iconColor}`} />
              </motion.div>
              
              <div className="relative z-10 flex-1">
                <motion.h3 
                  className={`text-2xl font-bold mb-3 ${value.color}`}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-primary"
                  animate={{ opacity: isHovered ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {value.description}
                </motion.p>
              </div>
            </motion.div>
          </BentoCard>
        );
      })}
    </div>
  );
};