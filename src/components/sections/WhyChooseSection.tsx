import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { Brain, Settings, Users } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "Cutting-edge solutions that push boundaries",
    color: "text-midnight"
  },
  {
    icon: Settings,
    title: "Scalable Solutions",
    description: "Built to grow with your business",
    color: "text-midnight"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Passionate professionals dedicated to excellence",
    color: "text-midnight"
  }
];

export const WhyChooseSection = () => {
  return (
    <BentoCard size="2x1" className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-8">
          Why Choose Us?
        </h2>
        
        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-200"
              >
                <motion.div
                  className={`p-3 rounded-xl glass ${feature.color} group-hover:animate-pulse`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-1"style={{ color: "#191970" }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-primary">                  
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </BentoCard>
  );
};