import { motion } from "framer-motion";

// --- CONSTANTS ---
const BRAND_NAME = "Équiva Iconic";
const BRAND_MOTTO = "Defining the art of timeless distinction.";

interface RitualLayoutProps {
  isDarkTheme: boolean;
}

export default function RitualLayout({ isDarkTheme }: RitualLayoutProps) {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  // Logic to split the name: 
  // We split by space so "Équiva" is on top and "Iconic" is below
  const nameParts = BRAND_NAME.split(" ");
  const firstLine = nameParts[0]; // "Équiva"
  const secondLine = nameParts[1]; // "Iconic"

  return (
    <motion.div 
      variants={containerVars} 
      className="container mx-auto px-6 pt-24 pb-24 md:pt-0 md:pb-0 grid grid-cols-12 gap-y-16 lg:gap-24 items-center max-w-7xl relative overflow-hidden"
    >
      {/* LEFT SIDE: THE ARTISANAL LENS */}
      <motion.div variants={itemVars} className="col-span-12 lg:col-span-6 relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
        
        {/* PULSING GOLD AURA */}
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.15, 0], 
              scale: [0.8, 1.8],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              delay: index * 2,
              ease: "easeOut" 
            }}
            className={`absolute w-full max-w-xs md:max-w-md aspect-square rounded-full pointer-events-none z-0 ${
              isDarkTheme ? "border border-gold-primary/40" : "border border-gold-primary"
            }`}
          />
        ))}

        {/* ETHEREAL SMOKE EFFECT */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <motion.div
            animate={{ 
              y: [-20, -140],
              opacity: [0, 0.4, 0],
              scale: [1, 2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className={`w-[150px] md:w-[200px] h-[300px] blur-[60px] rounded-full ${
              isDarkTheme ? "bg-gold-primary/5" : "bg-gold-primary/10"
            }`}
            style={{ filter: "url(#smoke-filter)" }}
          />
        </div>

        {/* Hidden SVG Filter */}
        <svg className="hidden">
          <filter id="smoke-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" seed="1">
              <animate attributeName="baseFrequency" dur="30s" values="0.01;0.02;0.01" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="60" />
          </filter>
        </svg>

        {/* Rotating Sacred Geometry Ring */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className={`absolute w-[105%] md:w-[115%] aspect-square border border-dashed rounded-full pointer-events-none z-10 ${
            isDarkTheme ? "border-gold-primary/10" : "border-gold-primary/20"
          }`}
        />

        {/* ROUND IMAGE CONTAINER */}
        <div className="relative group w-full max-w-xs md:max-w-md aspect-square z-20">
          
          {/* Floating "Aged" Badge */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-4 -right-2 md:-right-4 z-40 w-20 h-20 md:w-24 md:h-24 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 ${
              isDarkTheme 
                ? "bg-gold-primary text-black border-black" 
                : "bg-gold-primary text-home-bg border-home-bg"
            }`}
          >
            <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter">Vintaged</span>
            <span className="text-xl md:text-2xl font-serif italic leading-none">10yr</span>
          </motion.div>

          {/* THE CIRCLE VESSEL */}
          <div className={`relative w-full h-full rounded-full overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-neutral-900 ${
            isDarkTheme ? "border border-gold-primary/10" : "border border-gold-primary/20"
          }`}>
            <motion.img 
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[4000ms] filter contrast-125 brightness-75 group-hover:brightness-100" 
              alt="The Oud Ritual" 
            />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/30 via-transparent to-transparent opacity-40" />
          </div>

          {/* Extraction Data Label */}
          <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center">
            <p className={`text-[8px] md:text-[9px] uppercase tracking-[0.5em] md:tracking-[0.7em] font-black ${
              isDarkTheme ? "text-gold-primary/90" : "text-gold-primary"
            }`}>
              Batch № 882 // Private Collection
            </p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className={`h-[1px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent w-full mt-4 ${
                isDarkTheme ? "via-gold-primary/30" : ""
              }`} 
            />
          </div>
        </div>
      </motion.div>

      {/* RIGHT SIDE: THE SENSORY NARRATIVE */}
      <motion.div variants={itemVars} className="col-span-12 lg:col-span-6 space-y-8 md:space-y-10 text-center lg:text-left z-20 px-2 md:px-0">
        <div className="space-y-4">
          <h3 className={`tracking-[0.5em] md:tracking-[1em] uppercase text-[9px] md:text-[10px] font-black ${
            isDarkTheme ? "text-gold-primary/80 opacity-80" : "text-gold-primary opacity-70"
          }`}>
            Heritage & Alchemy
          </h3>
          
          {/* ✅ UPDATED: BRAND NAME SPLIT */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-serif leading-[1] md:leading-[0.9] ${
            isDarkTheme ? "text-white" : "text-home-text"
          }`}>
            {firstLine} <br/> 
            <span className="text-shimmer italic font-light">{secondLine}</span>
          </h1>
        </div>

        <div className="space-y-8 max-w-lg mx-auto lg:mx-0">
          <p className={`font-light leading-relaxed text-lg md:text-2xl italic border-l-0 md:border-l-2 md:pl-8 ${
            isDarkTheme 
              ? "text-gray-300 border-gold-primary/30" 
              : "text-home-subtext border-gold-primary/30"
          }`}>
            "{BRAND_MOTTO}"
          </p>
          
          <div className="grid grid-cols-2 gap-y-10 pt-8 border-t border-gold-primary/10">
            <div>
              <p className={`text-[8px] uppercase tracking-[0.3em] font-black mb-2 ${
                isDarkTheme ? "text-gray-500" : "opacity-40"
              }`}>
                Base
              </p>
              <p className={`text-[10px] md:text-xs uppercase tracking-widest font-bold ${
                isDarkTheme ? "text-gold-primary/90" : "text-gold-primary"
              }`}>
                Wild Cambodian Oud
              </p>
            </div>
            <div>
              <p className={`text-[8px] uppercase tracking-[0.3em] font-black mb-2 ${
                isDarkTheme ? "text-gray-500" : "opacity-40"
              }`}>
                Longevity
              </p>
              <p className={`text-[10px] md:text-xs uppercase tracking-widest font-bold ${
                isDarkTheme ? "text-gold-primary/90" : "text-gold-primary"
              }`}>
                Infinite (24h+)
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-8">
          <button className={`group relative px-10 md:px-14 py-5 md:py-6 bg-transparent overflow-hidden cursor-pointer ${
            isDarkTheme 
              ? "dark-button border border-gold-primary/40" 
              : "border border-gold-primary/30"
          }`}>
            <span className={`relative z-10 text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] font-black group-hover:text-home-bg transition-colors duration-500 ${
              isDarkTheme ? "text-gold-primary" : "text-gold-primary"
            }`}>
              Shop Now
            </span>
            {!isDarkTheme && (
              <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}