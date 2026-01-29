import { motion } from "framer-motion";

// --- CONSTANTS ---
const BRAND_NAME = "Équiva Iconic";
const BRAND_MOTTO = "Defining the art of timeless distinction.";

interface RabatLayoutProps {
  isDarkTheme: boolean;
}

export default function RabatLayout({ isDarkTheme }: RabatLayoutProps) {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  // Logic to split the name for the two-tone shimmer effect
  const firstPart = BRAND_NAME.substring(0, 6); // "Equiva"
  const secondPart = BRAND_NAME.substring(6);   // " Iconic"

  return (
    <motion.div 
      variants={containerVars} 
      className="container mx-auto px-6 pt-32 md:pt-0 grid grid-cols-12 gap-4 items-center justify-center max-w-7xl relative"
    >
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: isDarkTheme ? 0.02 : 0.03, x: 0 }} 
        transition={{ duration: 2 }} 
        className={`absolute top-0 left-0 text-[18vw] font-serif pointer-events-none select-none italic ${
          isDarkTheme ? "text-white/5" : "text-black/5"
        }`}
      >
        Heritage
      </motion.div>

      <motion.div variants={itemVars} className="col-span-12 lg:col-span-5 relative z-20 text-center lg:text-left">
        <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
          <div className={`h-[1px] w-12 ${
            isDarkTheme ? "bg-gold-primary/60" : "bg-gold-primary"
          }`} />
          <h2 className={`${
            isDarkTheme ? "text-gold-primary/80" : "text-gold-primary"
          } text-[9px] uppercase tracking-[1em] font-black`}>
            Imperial Collection
          </h2>
        </div>
        
        {/* Adjusted size to fit the longer brand name */}
        <h1 className={`text-[5rem] lg:text-[7.5rem] font-serif leading-[0.8] tracking-tighter italic mb-12 ${
          isDarkTheme ? "text-white" : "text-home-text"
        }`}>
          <span className="text-shimmer">{firstPart}</span>
          <span className={`not-italic font-light ${
            isDarkTheme ? "text-gold-primary/90" : "text-gold-primary"
          }`}>
            {secondPart}
          </span>
        </h1>

        <p className={`${
          isDarkTheme 
            ? "text-gray-300 border-l border-gold-primary/40" 
            : "text-home-subtext border-l border-gold-primary/30"
        } font-light leading-relaxed text-xl lg:text-2xl pl-8 max-w-md mx-auto lg:mx-0`}>
          {BRAND_MOTTO}
        </p>
      </motion.div>
      
      <motion.div variants={itemVars} className="col-span-12 lg:col-span-7 relative flex justify-end">
        <div className={`relative group max-w-lg w-full aspect-[3/4] overflow-hidden ${
          isDarkTheme 
            ? "shadow-2xl border border-gold-primary/10" 
            : "shadow-2xl"
        }`}>
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
            className="w-full h-full object-cover" 
            alt={BRAND_NAME} 
          />
          {isDarkTheme && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}