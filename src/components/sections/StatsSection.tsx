import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { CheckCircle, Star, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { icon: CheckCircle, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: Star, value: 100, suffix: "%", label: "Client Satisfaction" },
  { icon: Clock, value: 24, suffix: "/7", label: "Support" }
];

export const StatsSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }

        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, duration / steps);

      return () => clearInterval(timer);
    });
  }, []);

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
          Achievements
        </motion.h2>

        <div className="space-y-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-center space-x-3"
              >
                {/* Icon with animation */}
                <motion.div
                  className="p-2 rounded-lg glass"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <Icon className="h-5 w-5 text-midnight" />
                </motion.div>

                {/* Values & Labels */}
                <div>
                  {/* Animated counter in Midnight Blue */}
                  <motion.div
                    className="text-xl font-bold"
                    style={{ color: "#191970" }}
                    key={counters[index]} // Re-trigger animation on value change
                    initial={{ scale: 1.2, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {counters[index]}
                    {stat.suffix}
                  </motion.div>

                  {/* Label in Deep Sky Blue */}
                  <div
                    className="text-sm text-primary"
                  
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </BentoCard>
  );
};
