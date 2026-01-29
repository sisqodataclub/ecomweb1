import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PiGear, PiCaretRight } from "react-icons/pi";
import { 
  RabatLayout, 
  MinaretLayout, 
  RitualLayout, 
  KasbahLayout, 
  MonolithLayout 
} from "../landing";

// --- CONSTANTS ---
const COLORS = [
//  { id: "default", bg: "#fdfcf7", label: "Ivory" },
//  { id: "champagne", bg: "#f9f5eb", label: "Champagne" },
  { id: "pearl", bg: "#f4f4f4", label: "Pearl" },
  { id: "saffron", bg: "#fffcf2", label: "Saffron" },
  { id: "linen", bg: "#ede9e1", label: "Linen" },
//  { id: "royal", bg: "#ffffff", label: "Royal" },
//  { id: "pure-gold", bg: "#e6c200", label: "Pure Gold" },
  { id: "onyx", bg: "#0f0f0f", label: "Onyx" }, // Added Onyx theme
  { id: "obsidian", bg: "#050505", label: "Obsidian" }, // New Theme
];

const LAYOUTS = [
  { id: "rabat", label: "Rabat" },
  { id: "minaret", label: "The Minaret" },
  { id: "ritual", label: "The Oud Ritual" },
//  { id: "kasbah", label: "The Kasbah" },
  { id: "monolith", label: "The Monolith" },
];


// --- MAIN COMPONENT ---
export default function HomeContent() {
  const [layout, setLayout] = useState("rabat");
  const [color, setColor] = useState("default");
  const [showControls, setShowControls] = useState(true);
  // Update this to handle both dark themes
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

      {/* --- COLLAPSIBLE CONTROL SIDEBAR --- */}
      <motion.div 
        className="fixed top-24 right-0 z-50 flex items-start"
        animate={{ x: showControls ? 0 : "calc(100% - 40px)" }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        
        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setShowControls(!showControls)}
          className={`p-3 rounded-l-md shadow-lg transition-colors ${
            isDarkTheme 
              ? "bg-home-bg/90 backdrop-blur-md border border-gold-primary/30 border-r-0 text-gold-primary hover:bg-gold-primary/10"
              : "bg-home-bg/80 backdrop-blur-md border border-gold-primary/20 border-r-0 text-gold-primary hover:bg-home-text/5"
          }`}
          title={showControls ? "Hide Controls" : "Show Theme Controls"}
        >
          {showControls ? <PiCaretRight size={20} /> : <PiGear size={20} className="animate-spin-slow" />}
        </button>

        {/* PANEL CONTENT */}
        <div className={`p-6 shadow-2xl w-64 min-h-[400px] flex flex-col gap-8 ${
          isDarkTheme
            ? "bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-3xl border-l border-b border-gold-primary/30"
            : "bg-home-bg/90 backdrop-blur-3xl border-l border-b border-gold-primary/20"
        }`}>
          
          <div>
            <p className={`text-[8px] uppercase tracking-[0.4em] font-bold mb-4 ${
              isDarkTheme ? "text-gold-primary/60" : "opacity-40"
            }`}>
              Architectural Vision
            </p>
            <div className="flex flex-col gap-1.5">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`text-left px-4 py-2 text-[9px] uppercase tracking-[0.2em] transition-all cursor-pointer rounded-sm ${
                    layout === l.id 
                      ? `${isDarkTheme
                          ? "bg-gradient-to-r from-gold-primary to-gold-primary/80 text-black font-bold shadow-lg"
                          : "bg-gold-primary text-home-bg font-bold shadow-sm"
                        }` 
                      : `${isDarkTheme
                          ? "hover:bg-gold-primary/10 text-gold-primary/80 hover:text-gold-primary"
                          : "hover:bg-gold-primary/10 opacity-60 hover:opacity-100"
                        }`
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className={`text-[8px] uppercase tracking-[0.4em] font-bold mb-4 ${
              isDarkTheme ? "text-gold-primary/60" : "opacity-40"
            }`}>
              Chromatic Atmosphere
            </p>
            <div className="flex flex-wrap gap-3 px-1">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-6 h-6 rounded-full transition-all cursor-pointer relative group ${
                    color === c.id 
                      ? `${c.id === "onyx" 
                          ? "ring-2 ring-gold-primary ring-offset-2 ring-offset-black scale-110"
                          : "ring-2 ring-gold-primary ring-offset-2 ring-offset-home-bg scale-110"
                        }` 
                      : "opacity-70 hover:opacity-100 hover:scale-110"
                  }`}
                  style={{ 
                    backgroundColor: c.bg, 
                    border: c.id === "onyx" 
                      ? '1px solid rgba(212, 175, 55, 0.3)' 
                      : '1px solid rgba(0,0,0,0.1)' 
                  }}
                  title={c.label}
                >
                  {c.id === "onyx" && (
                    <div className="absolute inset-0 rounded-full border border-gold-primary/50 group-hover:border-gold-primary transition-colors"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gold-primary/10">
            <p className={`text-[8px] text-center ${
              isDarkTheme ? "text-gold-primary/50" : "text-home-subtext opacity-50"
            }`}>
              CLIENT PREVIEW MODE
            </p>
            <p className="text-[7px] text-center mt-2 text-gold-primary/70 uppercase tracking-[0.2em]">
              {isDarkTheme ? "DARK MODE ACTIVE" : "LIGHT MODE"}
            </p>
          </div>
        </div>
      </motion.div>

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
  const isDarkTheme = color === "onyx";
  
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