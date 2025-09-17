import { motion } from "framer-motion";
import { BentoCard } from "./BentoCard";

export const JusticeLineBox = () => {
  return (
    <a
      href="http://www.justiceline.net/"
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      <BentoCard
        size="1x1"
        className="p-6 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full flex flex-col items-center justify-center text-center"
        >
          {/* JusticeLine Logo */}
          <div className="w-50 h-50 flex items-center justify-center">
            <img
              src="https://res.cloudinary.com/dnlhh8ueh/image/upload/v1757570421/JUSTICE_LINE_3.2_k97trj.png"
              alt="JusticeLine Logo"
              className="w-30 h-20 object-contain"
            />
          </div>
          {/* Heading */} 
          <p className="mb-4 text-[#510705] text-base leading-relaxed">
            We built <span className="font-semibold">JusticeLine</span> – a legal research platform 
            that provides access to over 
            <strong className="ml-1"><br />1 million+ judgments and statutes in <br/>one app</strong>.
            <br />It helps professionals find the right <br/>legal information quickly and efficiently.
            </p>
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
        </motion.div>
      </BentoCard>
    </a>
  );
};