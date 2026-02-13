import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MonolithLayout } from "../landing";

export default function HomeContent() {
  const color = "obsidian";
  const isDarkTheme = true;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme-color", color);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    return () => document.documentElement.removeAttribute("data-theme-color");
  }, [color]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-home-bg text-home-text transition-all duration-1000 overflow-hidden">

      {/* --- AMBIANCE --- */}
      {/* PERFORMANCE: Optimized Blurs for Mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }} // Reduced scale variance
          transition={{ duration: 10, repeat: Infinity }} // Slower duration
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold-primary/10 ${
            isMobile ? "blur-[60px]" : "blur-[120px]" 
          }`}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-gold-primary/5 to-transparent ${
            isMobile ? "blur-[70px]" : "blur-[140px]"
          }`}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      {/* --- CONTENT SECTION --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key="monolith-obsidian"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full flex items-center justify-center"
        >
          <MonolithLayout isDarkTheme={isDarkTheme} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
