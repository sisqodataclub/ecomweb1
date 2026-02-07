import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  RabatLayout, 
  MinaretLayout, 
  RitualLayout, 
  KasbahLayout, 
  MonolithLayout 
} from "../landing";

// --- MAIN COMPONENT ---
export default function HomeContent() {
  const [layout, setLayout] = useState("monolith");
  
  // ✅ Set "obsidian" as the default state
  const [color, setColor] = useState("obsidian");
  
  const isDarkTheme = color === "onyx" || color === "obsidian";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme-color", color);
  }, [color]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-home-bg text-home-text transition-all duration-1000 overflow-hidden">
      
      {/* --- AMBIANCE (Background Glows) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: isDarkTheme ? [0.1, 0.2, 0.1] : [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ${isDarkTheme ? "bg-gold-primary/10" : "bg-gold-primary/20"}`} 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: isDarkTheme ? [0.05, 0.1, 0.05] : [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] transition-colors duration-1000 ${isDarkTheme ? "bg-gradient-to-tr from-gold-primary/5 to-transparent" : "bg-home-glow"}`} 
        />
      </div>

      {/* --- CONTENT SECTION --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${layout}-${color}`}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, y: -20 }}
          className="w-full flex items-center justify-center"
        >
          {renderLayoutContent(layout, color)}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// --- LAYOUT RENDERER ---
function renderLayoutContent(layout: string, color: string) {
  // ✅ Ensure the renderer knows Obsidian is also a dark theme
  const isDarkTheme = color === "onyx" || color === "obsidian";
  
  switch (layout) {
    case "rabat":
      return <RabatLayout isDarkTheme={isDarkTheme} />;
    case "minaret":
      return <MinaretLayout isDarkTheme={isDarkTheme} />;
    case "ritual":
      return <RitualLayout isDarkTheme={isDarkTheme} />;
    case "kasbah":
      return <KasbahLayout isDarkTheme={isDarkTheme} />;
    case "monolith":
      return <MonolithLayout isDarkTheme={isDarkTheme} />;
    default:
      return null;
  }
}
