import { useState, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue, useReducedMotion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { PiDrop, PiInfinity, PiCaretDown, PiX, PiStarFour, PiArrowRight } from "react-icons/pi";

// --- LUXURY COPY ---
const BRAND_MOTTO = "Presence. Without Permission.";

// --- ADVERTISING BANNER MESSAGES (Top bar) ---
const BANNER_MESSAGES = [
  "Complimentary Royal Shipping on Orders Over £50",
  "Welcome Offer: Use Code 'ICONIC' for 15% Off",
  "New Arrival: The 'Oud Wood' Interpretation"
];

interface MonolithLayoutProps {
  isDarkTheme: boolean;
}

export default function MonolithLayout({ isDarkTheme }: MonolithLayoutProps) {
  // --- STATE ---
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [showAdCard, setShowAdCard] = useState(true); // Control for the new big ad
  const [bannerIndex, setBannerIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();

  // --- MOUSE PARALLAX SETUP ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (!showTopBanner) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNER_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showTopBanner]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  const springConfig = { damping: 30, stiffness: 80 };
  
  const moveX = useSpring(useTransform(mouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-15, 15]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [-15, 15]), springConfig);
  const moveBgX = useSpring(useTransform(mouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [30, -30]), springConfig);

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      variants={containerVars}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-home-bg px-4 pt-12"
    >
      {/* === TOP ROTATING BANNER === */}
      <AnimatePresence>
        {showTopBanner && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3 backdrop-blur-md border-b transition-colors duration-500 ${
              isDarkTheme 
                ? "bg-black/60 border-gold-primary/20 text-gold-primary" 
                : "bg-white/60 border-gold-primary/30 text-home-text"
            }`}
          >
            <div className="w-6" />
            <div className="flex-1 flex justify-center overflow-hidden relative h-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bannerIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium whitespace-nowrap"
                >
                  <PiStarFour className="text-[8px] opacity-70" />
                  {BANNER_MESSAGES[bannerIndex]}
                  <PiStarFour className="text-[8px] opacity-70" />
                </motion.div>
              </AnimatePresence>
            </div>
            <button 
              onClick={() => setShowTopBanner(false)}
              className="w-6 flex justify-end opacity-60 hover:opacity-100 transition-opacity"
            >
              <PiX className="text-lg" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* PARALLAX BACKGROUND TEXT */}
      <motion.div
        style={{ x: moveBgX }}
        initial={{ opacity: 0, letterSpacing: shouldReduceMotion ? "3em" : "1em" }}
        animate={{ opacity: 0.04, letterSpacing: "3.5em" }}
        transition={{ duration: 6, ease: "easeOut" }}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none ${
          isDarkTheme ? "text-white/5" : "text-black/5"
        }`}
      >
        <span className="text-[20vw] md:text-[25vw] font-serif uppercase whitespace-nowrap">
          EQUIVA
        </span>
      </motion.div>

      {/* GOLD PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={shouldReduceMotion ? {} : {
              y: [0, -150],
              x: [0, i % 2 === 0 ? 30 : -30],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 15 + i * 2, repeat: Infinity, delay: i * 2 }}
            className={`absolute bottom-0 w-[1px] h-[1px] rounded-full blur-[1px] ${
              isDarkTheme ? "bg-gold-primary/60" : "bg-gold-primary"
            } ${shouldReduceMotion ? "opacity-10" : ""}`}
            style={{ left: `${15 + i * 15}%` }}
          />
        ))}
      </div>

      {/* === CENTERPIECE === */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
        
        {/* Decorative Line */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: typeof window !== 'undefined' && window.innerWidth < 768 ? 60 : 120, opacity: 1 }}
          transition={{ duration: 3, delay: 0.2 }}
          className={`w-[1px] bg-gradient-to-b from-transparent via-gold-primary to-transparent mb-6 ${
            isDarkTheme ? "via-gold-primary/70" : ""
          }`}
        />

        <div className="relative group text-center w-full flex flex-col items-center justify-center">
          
          {/* GLOW EFFECT */}
          <motion.div 
            style={{ x: moveX, y: moveY }}
            className={`absolute inset-0 transition-opacity duration-1000 ${
               shouldReduceMotion 
                ? "opacity-5 bg-gold-primary/10 rounded-full" 
                : "blur-[80px] md:blur-[140px] opacity-30 group-hover:opacity-50"
            } ${isDarkTheme ? "bg-gold-primary/5" : "bg-gold-primary/10"}`} 
          />

          {/* === LOGO AREA === */}
          <div className="relative w-full flex justify-center items-center">
            
            {/* MAIN LOGO */}
            <motion.div variants={itemVars} className="relative z-10">
              
              {/* ✅ NEW: BIG LUXURY AD CAMPAIGN CARD (Floating) */}
              <AnimatePresence>
              {showAdCard && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
                  // Positioned on top-left of the bottle to look like a magazine overlay
                  className={`absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:-left-20 z-50 w-[280px] md:w-[320px] backdrop-blur-xl border flex flex-col shadow-2xl overflow-hidden ${
                    isDarkTheme 
                      ? "bg-black/80 border-gold-primary/30" 
                      : "bg-white/80 border-gold-primary/40"
                  }`}
                >
                  {/* Campaign Content Row */}
                  <div className="flex h-24">
                    {/* AD IMAGE (Placeholder for Campaign Shot) */}
                    <div className="w-1/3 bg-gradient-to-br from-gold-primary via-yellow-600 to-yellow-900 relative">
                      {/* You can replace this div with: <img src="your-ad.jpg" className="w-full h-full object-cover" /> */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                         <PiStarFour className="text-white text-2xl" />
                      </div>
                    </div>

                    {/* AD COPY */}
                    <div className="w-2/3 p-4 flex flex-col justify-center text-left relative">
                       {/* Close Button */}
                       <button 
                        onClick={() => setShowAdCard(false)}
                        className={`absolute top-2 right-2 text-xs opacity-50 hover:opacity-100 ${isDarkTheme ? "text-white" : "text-black"}`}
                       >
                         <PiX />
                       </button>

                       <span className={`text-[8px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60 ${isDarkTheme ? "text-gold-primary" : "text-black"}`}>
                         Member Access
                       </span>
                       <h3 className={`text-lg font-serif italic leading-none mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>
                         The Gold Sale
                       </h3>
                       <div className="flex items-center gap-2">
                         <span className={`text-[10px] uppercase tracking-widest font-black ${isDarkTheme ? "text-white" : "text-black"}`}>
                           20% OFF
                         </span>
                         <PiArrowRight className="text-xs text-gold-primary animate-pulse" />
                       </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar / Decorative Bottom Line */}
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }} // Simulates "time running out"
                    className="h-[2px] bg-gold-primary"
                  />
                </motion.div>
              )}
              </AnimatePresence>

              <img 
                src="/logo3.png" 
                alt="Équiva Iconic Logo" 
                className="w-[70vw] md:w-[40vw] max-w-[500px] h-auto object-contain drop-shadow-2xl opacity-90"
              />
            </motion.div>
          </div>

          {/* === IDENTITY & COPY === */}
          <motion.div 
            variants={itemVars}
            className={`relative z-20 -mt-24 md:-mt-32 max-w-2xl text-center px-4 flex flex-col items-center gap-8`}
          >
            {/* FEATURES */}
            <div className="flex items-center justify-center gap-12 opacity-80">
               <motion.div variants={itemVars} className="flex flex-col items-center gap-2">
                  <PiDrop className="text-xl md:text-2xl text-gold-primary/80" />
                  <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Oil Absolute</span>
               </motion.div>

               <span className="w-[1px] h-8 bg-gold-primary/20" />

               <motion.div variants={itemVars} className="flex flex-col items-center gap-2">
                  <PiInfinity className="text-xl md:text-2xl text-gold-primary/80" />
                  <span className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>Eternal Wear</span>
               </motion.div>
            </div>

            {/* IDENTITY HEADLINE */}
            <div className="flex flex-col gap-2">
              <h2 className={`text-2xl md:text-4xl font-serif tracking-wide leading-tight ${
                isDarkTheme ? "text-white" : "text-black"
              }`}>
                Smell Iconic. <br/> 
                <span className="italic font-light opacity-80">Take your chance.</span>
              </h2>
            </div>
          </motion.div>
        </div>

        {/* === FOOTER ACTION === */}
        <motion.div
          variants={itemVars}
          className="mt-16 flex flex-col items-center gap-8"
        >
          {/* Shop Button */}
          <Link to="/products" className={`relative pb-2 border-b border-gold-primary/50 hover:border-gold-primary transition-all duration-700 cursor-pointer ${
            isDarkTheme ? "text-white" : "text-black"
          }`}>
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold">
              See Our Collection
            </span>
          </Link>

          {/* MOTTO */}
          <p className={`text-[8px] uppercase tracking-[0.6em] opacity-50 ${isDarkTheme ? "text-gold-primary" : "text-home-text"}`}>
             {BRAND_MOTTO}
          </p>
          
          {/* Scroll Arrow */}
          <motion.div 
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`mt-2 ${isDarkTheme ? "text-gold-primary/30" : "text-gold-primary/50"}`}
          >
            <PiCaretDown className="text-xl" />
          </motion.div>

        </motion.div>
      </div>

      {/* Side Text - Vertical */}
      <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden 2xl:block">
        <p className={`rotate-90 origin-right text-[8px] uppercase tracking-[1.5em] whitespace-nowrap font-black ${
          isDarkTheme ? "opacity-10" : "opacity-20"
        }`}>
          Rare • Iconic • Yours
        </p>
      </div>
    </motion.div>
  );
}
