import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer"
      >
        <motion.img
          src="https://res.cloudinary.com/dlxhvugmw/image/upload/v1755342413/ChatGPT_Image_Aug_16__2025__04_23_54_PM-removebg-preview_ytq1ea.png"
          alt="Virach Logo"
          className="h-12 w-auto object-contain"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Link>
  );
};