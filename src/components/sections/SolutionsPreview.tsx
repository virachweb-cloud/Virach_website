import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { useNavigate } from "react-router-dom";
import { Globe, Smartphone, Palette, Cloud, Bot, BarChart3 } from "lucide-react";

const solutions = [
  { icon: Globe, title: "Web Develop", color: "text-midnight" },
  { icon: Smartphone, title: "Mobile Applications", color: "text-midnight" },
  { icon: Palette, title: "UI/UX Design", color: "text-midnight" },
  { icon: Cloud, title: "Cloud Solutions", color: "text-midnight" },
  { icon: Bot, title: "Automation", color: "text-midnight" },
  { icon: BarChart3, title: "Data Analytics", color: "text-midnight" }
];

export const SolutionsPreview = () => {
  const navigate = useNavigate();

  const handleSolutionClick = (title: string) => {
    const titleMap: { [key: string]: string } = {
      "Web Develop": "web-development",
      "Mobile Applications": "mobile-applications",
      "UI/UX Design": "ui-ux-design",
      "Cloud Solutions": "cloud-solutions",
      "Automation": "automation",
      "Data Analytics": "data-analytics"
    };
    const slug = titleMap[title] || title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/solutions?solution=${slug}`);
  };

  return (
    <BentoCard size="2x1" className="p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-8">
          Our Solutions
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                onClick={() => handleSolutionClick(solution.title)}
                className="glass p-3 rounded-xl text-center group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className={`${solution.color} mb-3 flex justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                   <Icon className="h-5 w-5 text-midnight" />
                </motion.div>
                
                <h3 className="text-sm font-medium text-foreground text-primary">
                  {solution.title}
                </h3>
                
                {/* Glow ring on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: `radial-gradient(circle at center, ${solution.color.replace('text-', 'hsl(var(--')}/ 0.2), transparent 70%)`
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </BentoCard>
  );
};