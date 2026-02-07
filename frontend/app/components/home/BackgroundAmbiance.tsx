// app/components/home/BackgroundAmbiance.tsx
"use client";

import { motion } from "framer-motion";

interface BackgroundAmbianceProps {
  isDarkTheme: boolean;
}

export default function BackgroundAmbiance({ isDarkTheme }: BackgroundAmbianceProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: isDarkTheme ? [0.1, 0.2, 0.1] : [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ${
          isDarkTheme ? "bg-gold-primary/10" : "bg-gold-primary/20"
        }`} 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: isDarkTheme ? [0.05, 0.1, 0.05] : [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] transition-colors duration-1000 ${
          isDarkTheme 
            ? "bg-gradient-to-tr from-gold-primary/5 to-transparent" 
            : "bg-home-glow"
        }`} 
      />
    </div>
  );
}