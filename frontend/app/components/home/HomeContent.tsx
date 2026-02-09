import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { MonolithLayout } from "../landing";

export default function HomeContent() {
  // 1. Hardcode the theme name to match your CSS selector [data-theme-color='obsidian']
  const color = "obsidian";
  const isDarkTheme = true;

  // 2. RESTORED: This function injects the attribute so your CSS actually triggers
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-color", color);
    
    // Optional: cleanup to make sure the attribute stays set
    return () => document.documentElement.removeAttribute("data-theme-color");
  }, [color]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-home-bg text-home-text transition-all duration-1000 overflow-hidden">
      
      {/* --- AMBIANCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-gold-primary/10"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] bg-gradient-to-tr from-gold-primary/5 to-transparent"
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
