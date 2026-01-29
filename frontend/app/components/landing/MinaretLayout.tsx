import { motion } from "framer-motion";

// --- CONSTANTS ---
const BRAND_NAME = "Équiva Iconic";
const BRAND_MOTTO = "Defining the art of timeless distinction.";

interface MinaretLayoutProps {
  isDarkTheme: boolean;
}

export default function MinaretLayout({ isDarkTheme }: MinaretLayoutProps) {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  // Logic to split the name: 
  // "Équiva" (6 characters) + " Iconic"
  const firstPart = BRAND_NAME.substring(0, 6); 
  const secondPart = BRAND_NAME.substring(6);   

  return (
    <motion.div variants={containerVars} className="relative flex flex-col items-center text-center px-6 overflow-hidden min-h-screen justify-center">
      
      {/* Background Zellij Star */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className={`animate-spin-slow ${
          isDarkTheme ? "opacity-[0.04] mix-blend-screen" : "opacity-[0.07] blend-morocco"
        }`}>
          <svg width="800" height="800" viewBox="0 0 100 100" fill="none" 
            stroke={`${isDarkTheme ? "#d4af37" : "var(--color-gold-primary)"}`} 
            strokeWidth="0.5">
            <path d="M50 5 L63 37 L95 50 L63 63 L50 95 L37 63 L5 50 L37 37 Z" />
            <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" />
            <circle cx="50" cy="50" r="5" />
            <circle cx="50" cy="50" r="45" strokeDasharray="1 4" />
          </svg>
        </div>
      </div>

      {/* The Minaret Spire */}
      <motion.div variants={itemVars} className={`relative w-px h-32 mb-12 ${
        isDarkTheme 
          ? "bg-gradient-to-b from-transparent via-gold-primary/70 to-transparent" 
          : "bg-gradient-to-b from-transparent via-gold-primary to-transparent"
      }`}>
        <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
          isDarkTheme ? "bg-gold-primary/60 blur-[2px]" : "bg-gold-primary/80 blur-[2px]"
        }`} />
      </motion.div>

      {/* Main Brand Content */}
      <motion.div variants={itemVars} className="z-10">
        <span className={`uppercase tracking-[1.2em] text-[10px] font-semibold mb-6 block ${
          isDarkTheme ? "text-gray-400" : "text-home-subtext"
        }`}>
          The Private Collection
        </span>
        
        {/* Updated Name with Split styling */}
        <h1 className={`text-6xl md:text-[9rem] font-serif tracking-tighter leading-none mb-6 ${
          isDarkTheme ? "text-white" : "text-home-text"
        }`}>
          {firstPart} <span className="text-shimmer italic font-light">{secondPart}</span>
        </h1>
        
        <div className={`flex items-center justify-center gap-4 mb-10 ${
          isDarkTheme ? "text-gray-500" : "text-home-subtext/60"
        }`}>
          <span className={`h-px w-8 ${
            isDarkTheme ? "bg-gold-primary/20" : "bg-gold-primary/30"
          }`} />
          {/* Updated Motto */}
          <p className="text-[10px] uppercase tracking-[0.3em]">{BRAND_MOTTO}</p>
          <span className={`h-px w-8 ${
            isDarkTheme ? "bg-gold-primary/20" : "bg-gold-primary/30"
          }`} />
        </div>
      </motion.div>

      {/* Luxury CTA */}
      <motion.button 
        variants={itemVars}
        className={`group relative overflow-hidden transition-all duration-700 ${
          isDarkTheme 
            ? "dark-button px-20 py-6" 
            : "border border-gold-primary/40 px-20 py-6"
        }`}
      >
        <span className={`relative z-10 uppercase text-[10px] tracking-[0.8em] font-bold group-hover:text-home-bg transition-colors duration-500 ${
          isDarkTheme ? "text-gold-primary" : "text-gold-primary"
        }`}>
          Shop Now
        </span>
        {!isDarkTheme && (
          <div className="absolute inset-0 bg-gold-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-600 ease-in-out" />
        )}
      </motion.button>

      {/* Longevity Anchor */}
      <motion.div variants={itemVars} className="absolute bottom-12 opacity-40">
        <span className={`text-[9px] uppercase tracking-[0.6em] ${
          isDarkTheme ? "text-gray-400" : "text-home-text"
        }`}>
          Sillage Eternal • 24hr Wear
        </span>
      </motion.div>
    </motion.div>
  );
}