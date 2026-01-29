import { motion } from "framer-motion";

// --- CONSTANTS ---
const BRAND_NAME = "Équiva Iconic";
const BRAND_MOTTO = "Defining the art of timeless distinction.";

interface MonolithLayoutProps {
  isDarkTheme: boolean;
}

export default function MonolithLayout({ isDarkTheme }: MonolithLayoutProps) {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  // Logic to split the name: 
  const nameParts = BRAND_NAME.split(" ");
  const firstLine = nameParts[0]; // "Équiva"
  const secondLine = nameParts[1]; // "Iconic"

  return (
    <motion.div 
      variants={containerVars} 
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-home-bg px-4"
    >
      {/* BACKGROUND LAYER: THE ANCESTRAL GHOST */}
      <motion.div 
        initial={{ opacity: 0, letterSpacing: "1.5em" }}
        animate={{ opacity: 0.05, letterSpacing: "3em" }}
        transition={{ duration: 5, ease: "easeOut" }}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${
          isDarkTheme ? "text-white/5" : "text-black/5"
        }`}
      >
        <span className="text-[20vw] md:text-[25vw] font-serif uppercase whitespace-nowrap">
          Morocco
        </span>
      </motion.div>

      {/* MIDDLE LAYER: FLOATING GOLD PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -150], 
              x: [0, i % 2 === 0 ? 40 : -40],
              opacity: [0, 0.4, 0] 
            }}
            transition={{ duration: 12 + i, repeat: Infinity, delay: i * 1.5 }}
            className={`absolute bottom-0 w-[2px] h-[2px] rounded-full blur-[1px] ${
              isDarkTheme ? "bg-gold-primary/70" : "bg-gold-primary"
            }`}
            style={{ left: `${10 + i * 12}%` }}
          />
        ))}
      </div>

      {/* CENTERPIECE: THE MONOLITH TITLE */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Decorative Vertical Totem Line */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 140, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          className={`w-[1px] bg-gradient-to-b from-transparent via-gold-primary to-transparent mb-8 md:mb-12 ${
            isDarkTheme ? "via-gold-primary/70" : ""
          }`} 
        />

        <div className="relative group text-center w-full">
          {/* Deep Cinematic Glow */}
          <div className={`absolute inset-0 blur-[60px] md:blur-[120px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000 ${
            isDarkTheme ? "bg-gold-primary/5" : "bg-gold-primary/10"
          }`} />
          
          <motion.h1 
            variants={itemVars} 
            className="text-[clamp(4.5rem,18vw,18rem)] font-serif leading-none tracking-tighter text-home-text relative z-10 flex flex-col items-center"
          >
            <span className="relative inline-block overflow-hidden pb-2 md:pb-4">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="block uppercase" 
              >
                {firstLine}
              </motion.span>
            </span>
            <span className="text-shimmer italic font-light text-[clamp(1.5rem,6vw,5rem)] -mt-4 md:-mt-10 tracking-[0.3em] md:tracking-[0.4em] uppercase">
              {secondLine}
            </span>
          </motion.h1>
        </div>

        {/* FOOTER INFO & SCARCITY CTA */}
        <motion.div 
          variants={itemVars}
          className="mt-12 md:mt-20 flex flex-col items-center gap-8 md:gap-10"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span className={`h-[1px] w-8 md:w-12 ${
              isDarkTheme ? "bg-gold-primary/10" : "bg-gold-primary/20"
            }`} />
            
            {/* ✅ UPDATED: MOTTO REPLACES VINTAGE TEXT */}
            <p className={`text-[7px] md:text-[9px] uppercase tracking-[1em] md:tracking-[1.5em] font-black ${
              isDarkTheme ? "text-gold-primary/60" : "text-gold-primary/80"
            }`}>
              {BRAND_MOTTO}
            </p>
            
            <span className={`h-[1px] w-8 md:w-12 ${
              isDarkTheme ? "bg-gold-primary/10" : "bg-gold-primary/20"
            }`} />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <button className={`group relative px-10 md:px-16 py-4 md:py-6 bg-transparent overflow-hidden cursor-pointer ${
              isDarkTheme 
                ? "dark-button border border-gold-primary/40" 
                : "border border-gold-primary/40 text-home-text"
            } text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] font-black hover:border-gold-primary transition-all duration-700`}>
              <span className="relative z-10 group-hover:text-home-bg transition-colors duration-500">Shop Now</span>
              {!isDarkTheme && (
                <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              )}
            </button>
            
            {/* Scarcity Counter */}
            <p className={`text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-medium ${
              isDarkTheme ? "text-gold-primary/40" : "text-gold-primary/60"
            }`}>
              Only <span className={`font-black ${
                isDarkTheme ? "text-gold-primary" : "text-gold-primary"
              }`}>42</span> of 500 Units Remaining
            </p>
          </div>
        </motion.div>
      </div>

      

      {/* Side Decorative Totem (Vertical) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden 2xl:block">
        <p className={`rotate-90 origin-right text-[8px] uppercase tracking-[1.2em] whitespace-nowrap font-black ${
          isDarkTheme ? "opacity-10" : "opacity-20"
        }`}>
          The Unspoken Language of Luxury
        </p>
      </div>
    </motion.div>
  );
}