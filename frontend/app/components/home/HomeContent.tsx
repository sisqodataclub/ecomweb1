import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { PiGear, PiCaretRight } from "react-icons/pi"; // Ensure you have react-icons installed

// --- CONSTANTS ---
const COLORS = [
  { id: "default", bg: "#fdfcf7", label: "Ivory" },
  { id: "champagne", bg: "#f9f5eb", label: "Champagne" },
  { id: "pearl", bg: "#f4f4f4", label: "Pearl" },
  { id: "saffron", bg: "#fffcf2", label: "Saffron" },
  { id: "linen", bg: "#ede9e1", label: "Linen" },
  { id: "royal", bg: "#ffffff", label: "Royal" },
  { id: "pure-gold", bg: "#e6c200", label: "Pure Gold" },
];

const LAYOUTS = [
  { id: "rabat", label: "Rabat" },
  { id: "minaret", label: "The Minaret" },
  { id: "ritual", label: "The Oud Ritual" },
  { id: "kasbah", label: "The Kasbah" },
  { id: "monolith", label: "The Monolith" },
];

const containerVars = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};

const itemVars = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

// --- MAIN COMPONENT ---
export default function HomeContent() {
  const [layout, setLayout] = useState("rabat");
  const [color, setColor] = useState("default");
  
  // New state to toggle control panel visibility
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme-color", color);
  }, [color]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-home-bg text-home-text transition-all duration-1000 overflow-hidden">
      
      {/* --- AMBIANCE (Background Glows) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-home-glow rounded-full blur-[140px] transition-colors duration-1000" 
        />
      </div>

      {/* --- COLLAPSIBLE CONTROL SIDEBAR --- */}
      <motion.div 
        // Fixed positioning on the right side
        className="fixed top-24 right-0 z-50 flex items-start"
        animate={{ x: showControls ? 0 : "calc(100% - 40px)" }} // Slide logic
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        
        {/* 1. TOGGLE BUTTON (Visible when closed) */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-home-bg/80 backdrop-blur-md border border-gold-primary/20 border-r-0 p-3 rounded-l-md shadow-lg text-gold-primary hover:bg-home-text/5 transition-colors"
          title={showControls ? "Hide Controls" : "Show Theme Controls"}
        >
          {showControls ? <PiCaretRight size={20} /> : <PiGear size={20} className="animate-spin-slow" />}
        </button>

        {/* 2. THE PANEL CONTENT */}
        <div className="bg-home-bg/90 backdrop-blur-3xl p-6 border-l border-b border-gold-primary/20 shadow-2xl w-64 min-h-[400px] flex flex-col gap-8">
          
          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold mb-4 opacity-40">Architectural Vision</p>
            <div className="flex flex-col gap-1.5">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLayout(l.id)}
                  className={`text-left px-4 py-2 text-[9px] uppercase tracking-[0.2em] transition-all cursor-pointer rounded-sm ${
                    layout === l.id 
                      ? "bg-gold-primary text-home-bg font-bold shadow-sm" 
                      : "hover:bg-gold-primary/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[0.4em] font-bold mb-4 opacity-40">Chromatic Atmosphere</p>
            <div className="flex flex-wrap gap-3 px-1">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-6 h-6 rounded-full transition-all cursor-pointer relative group ${
                    color === c.id ? "ring-2 ring-gold-primary ring-offset-2 ring-offset-home-bg scale-110" : "opacity-70 hover:opacity-100 hover:scale-110"
                  }`}
                  style={{ backgroundColor: c.bg, border: '1px solid rgba(0,0,0,0.1)' }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gold-primary/10">
             <p className="text-[8px] text-center text-home-subtext opacity-50">CLIENT PREVIEW MODE</p>
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
          {renderLayoutContent(layout)}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

// --- LAYOUT RENDERER ---
function renderLayoutContent(layout: string) {
  switch (layout) {
    case "rabat":
      return (
        <motion.div 
          variants={containerVars} 
          className="container mx-auto px-6 pt-32 md:pt-0 grid grid-cols-12 gap-4 items-center justify-center max-w-7xl relative"
        >
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 0.03, x: 0 }} transition={{ duration: 2 }} className="absolute top-0 left-0 text-[18vw] font-serif pointer-events-none select-none italic">
            Heritage
          </motion.div>

          <motion.div variants={itemVars} className="col-span-12 lg:col-span-5 relative z-20 text-center lg:text-left">
            <div className="flex items-center gap-4 mb-10 justify-center lg:justify-start">
              <div className="h-[1px] w-12 bg-gold-primary" />
              <h2 className="text-gold-primary text-[9px] uppercase tracking-[1em] font-black">Imperial Collection</h2>
            </div>
            
            <h1 className="text-[10rem] lg:text-[13rem] font-serif leading-[0.7] tracking-tighter italic mb-12">
              <span className="text-shimmer">Rab</span>
              <span className="not-italic font-light text-gold-primary">at</span>
            </h1>

            <p className="text-home-subtext font-light leading-relaxed text-xl lg:text-2xl border-l border-gold-primary/30 pl-8 max-w-md mx-auto lg:mx-0">
              Where the <span className="text-home-text font-medium italic">Atlantic breeze</span> meets ancient stone.
            </p>
          </motion.div>
          
          <motion.div variants={itemVars} className="col-span-12 lg:col-span-7 relative flex justify-end">
            <div className="relative group max-w-lg w-full aspect-[3/4] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Rabat" />
            </div>
          </motion.div>
        </motion.div>
      );

      case "minaret":
  return (
    <motion.div variants={containerVars} className="relative flex flex-col items-center text-center px-6 overflow-hidden min-h-screen justify-center">
      
      {/* 1. Background Zellij Star - Using your animate-spin-slow utility */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
        <div className="animate-spin-slow opacity-[0.07] blend-morocco">
          <svg width="800" height="800" viewBox="0 0 100 100" fill="none" stroke="var(--color-gold-primary)" strokeWidth="0.5">
            {/* Traditional 8-point Moroccan Star Pattern */}
            <path d="M50 5 L63 37 L95 50 L63 63 L50 95 L37 63 L5 50 L37 37 Z" />
            <path d="M50 15 L58 42 L85 50 L58 58 L50 85 L42 58 L15 50 L42 42 Z" />
            <circle cx="50" cy="50" r="5" />
            <circle cx="50" cy="50" r="45" strokeDasharray="1 4" />
          </svg>
        </div>
      </div>

      {/* 2. The Minaret Spire */}
      <motion.div variants={itemVars} className="relative w-px h-32 bg-gradient-to-b from-transparent via-gold-primary to-transparent mb-12">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-primary/80 blur-[2px]" />
      </motion.div>

      {/* 3. Main Brand Content */}
      <motion.div variants={itemVars} className="z-10">
        <span className="uppercase tracking-[1.2em] text-[10px] text-home-subtext font-semibold mb-6 block">
          The Private Collection
        </span>
        
        <h1 className="text-6xl md:text-[9rem] font-serif tracking-tighter leading-none mb-6 text-home-text">
          Oud <span className="text-shimmer italic font-light">Moutlaq</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-10 text-home-subtext/60">
          <span className="h-px w-8 bg-gold-primary/30" />
          <p className="text-[11px] uppercase tracking-[0.4em]">Marrakesh • 2026 • Extrait</p>
          <span className="h-px w-8 bg-gold-primary/30" />
        </div>
      </motion.div>

      {/* 4. Luxury CTA */}
      <motion.button 
        variants={itemVars}
        className="group relative border border-gold-primary/40 px-20 py-6 overflow-hidden transition-all duration-700"
      >
        <span className="relative z-10 text-gold-primary uppercase text-[10px] tracking-[0.8em] font-bold group-hover:text-home-bg transition-colors duration-500">
          Order the Discovery Set
        </span>
        <div className="absolute inset-0 bg-gold-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-[600 lines] ease-in-out" />
      </motion.button>

      {/* 5. Longevity Anchor */}
      <motion.div variants={itemVars} className="absolute bottom-12  opacity-40">
        <span className="text-[9px] uppercase tracking-[0.6em] text-home-text">
          Sillage Eternal • 24hr Wear
        </span>
      </motion.div>

    </motion.div>
  );

  case "ritual":
    return (
      <motion.div 
        variants={containerVars} 
        // UPDATED: Added pt-32 for mobile to clear navbar, md:pt-0 for desktop
        className="container mx-auto px-6 pt-32 md:pt-0 grid grid-cols-12 gap-12 lg:gap-24 items-center max-w-7xl relative"
      >
        {/* 1. LEFT SIDE: THE ARTISANAL LENS */}
        <motion.div variants={itemVars} className="col-span-12 lg:col-span-6 relative flex justify-center items-center min-h-[500px]">
          
          {/* --- PULSING GOLD AURA --- */}
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
              className="absolute w-full max-w-md aspect-square rounded-full border border-gold-primary pointer-events-none z-0"
            />
          ))}

          {/* --- ETHEREAL SMOKE EFFECT --- */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
            <motion.div
              animate={{ 
                y: [-20, -140],
                opacity: [0, 0.4, 0],
                scale: [1, 2],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-[200px] h-[300px] bg-gold-primary/10 blur-[60px] rounded-full"
              style={{ filter: "url(#smoke-filter)" }}
            />
          </div>

          {/* Hidden SVG Filter for Smoke Texture */}
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
            className="absolute w-[115%] aspect-square border border-dashed border-gold-primary/20 rounded-full pointer-events-none z-10"
          />

          {/* ROUND IMAGE CONTAINER */}
          <div className="relative group w-full max-w-md aspect-square z-20">
            
            {/* Floating "Aged" Badge */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-40 bg-gold-primary text-home-bg w-24 h-24 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-home-bg"
            >
              <span className="text-[8px] font-black uppercase tracking-tighter">Vintaged</span>
              <span className="text-2xl font-serif italic leading-none">10yr</span>
            </motion.div>

            {/* THE CIRCLE VESSEL */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-gold-primary/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-neutral-900">
               <motion.img 
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[4000ms] filter contrast-125 brightness-75 group-hover:brightness-100" 
                  alt="The Oud Ritual" 
               />
               
               {/* Inner Depth Effects */}
               <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-tr from-gold-primary/30 via-transparent to-transparent opacity-40" />
            </div>

            {/* Extraction Data Label */}
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <p className="text-[9px] uppercase tracking-[0.7em] text-gold-primary font-black">
                Batch № 882 // Private Collection
              </p>
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent w-full mt-4" 
              />
            </div>
          </div>
        </motion.div>

        {/* 2. RIGHT SIDE: THE SENSORY NARRATIVE */}
        <motion.div variants={itemVars} className="col-span-12 lg:col-span-6 space-y-10 text-center lg:text-left z-20">
          <div className="space-y-4">
            <h3 className="text-gold-primary tracking-[1em] uppercase text-[10px] font-black opacity-70">
              Heritage & Alchemy
            </h3>
            <h1 className="text-7xl lg:text-8xl font-serif text-home-text leading-[0.9]">
              A Decade <br/> 
              <span className="text-shimmer italic font-light">of Silence</span>
            </h1>
          </div>

          <div className="space-y-8 max-w-lg mx-auto lg:mx-0">
            <p className="text-home-subtext font-light leading-relaxed text-xl lg:text-2xl italic border-l-2 border-gold-primary/30 pl-8">
              "Every drop carries ten winters of Atlas mountain air and the spirit of ancient resin."
            </p>
            
            <div className="grid grid-cols-2 gap-y-10 pt-8 border-t border-gold-primary/10">
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] font-black opacity-40 mb-2">Base</p>
                <p className="text-xs uppercase tracking-widest text-gold-primary font-bold">Wild Cambodian Oud</p>
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.3em] font-black opacity-40 mb-2">Longevity</p>
                <p className="text-xs uppercase tracking-widest text-gold-primary font-bold">Infinite (24h+)</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button className="group relative px-14 py-6 bg-transparent border border-gold-primary/30 overflow-hidden cursor-pointer">
              <span className="relative z-10 text-gold-primary text-[10px] uppercase tracking-[0.8em] font-black group-hover:text-home-bg transition-colors duration-500">
                Acquire Ritual
              </span>
              <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    );

    case "kasbah":
      return (
        <motion.div variants={containerVars} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 h-[70vh]">
          <motion.div variants={itemVars} className="relative overflow-hidden border border-gold-primary/5">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Kasbah" />
          </motion.div>
          <motion.div variants={itemVars} className="flex flex-col justify-center p-12 bg-home-text/5">
            <h1 className="text-6xl md:text-8xl font-serif">Souk <br/><span className="italic font-light">Nights</span></h1>
            <p className="text-home-subtext tracking-widest uppercase text-xs mt-4">Liquid Gold • Spices • Dusk</p>
          </motion.div>
        </motion.div>
      );

      case "monolith":
  return (
    <motion.div 
      variants={containerVars} 
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-home-bg px-4"
    >
      {/* 1. BACKGROUND LAYER: THE ANCESTRAL GHOST */}
      <motion.div 
        initial={{ opacity: 0, letterSpacing: "1.5em" }}
        animate={{ opacity: 0.05, letterSpacing: "3em" }}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[20vw] md:text-[25vw] font-serif uppercase whitespace-nowrap">
          Morocco
        </span>
      </motion.div>

      {/* 2. MIDDLE LAYER: FLOATING GOLD PARTICLES */}
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
            className="absolute bottom-0 w-[2px] h-[2px] bg-gold-primary rounded-full blur-[1px]"
            style={{ left: `${10 + i * 12}%` }}
          />
        ))}
      </div>

      {/* 3. CENTERPIECE: THE MONOLITH TITLE */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Decorative Vertical Totem Line - Height adjusted for mobile */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: window?.innerWidth < 768 ? 80 : 140, opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          className="w-[1px] bg-gradient-to-b from-transparent via-gold-primary to-transparent mb-8 md:mb-12" 
        />

        <div className="relative group text-center w-full">
          {/* Deep Cinematic Glow */}
          <div className="absolute inset-0 bg-gold-primary/10 blur-[60px] md:blur-[120px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <motion.h1 
            variants={itemVars} 
            className="text-[clamp(4.5rem,18vw,18rem)] font-serif leading-none tracking-tighter text-home-text relative z-10 flex flex-col items-center"
          >
            <span className="relative inline-block overflow-hidden pb-2 md:pb-4">
              <motion.span 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                AURUM
              </motion.span>
            </span>
            <span className="text-shimmer italic font-light text-[clamp(1.5rem,6vw,5rem)] -mt-4 md:-mt-10 tracking-[0.3em] md:tracking-[0.4em] uppercase">
              Oud Royale
            </span>
          </motion.h1>
        </div>

        {/* 4. FOOTER INFO & SCARCITY CTA */}
        <motion.div 
          variants={itemVars}
          className="mt-12 md:mt-20 flex flex-col items-center gap-8 md:gap-10"
        >
          <div className="flex items-center gap-4 md:gap-8">
            <span className="h-[1px] w-8 md:w-12 bg-gold-primary/20" />
            <p className="text-[7px] md:text-[9px] uppercase tracking-[1em] md:tracking-[1.5em] font-black text-gold-primary/80">
              High Atlas Vintages
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-gold-primary/20" />
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <button className="group relative px-10 md:px-16 py-4 md:py-6 bg-transparent border border-gold-primary/40 text-home-text text-[9px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] font-black hover:border-gold-primary transition-all duration-700 cursor-pointer overflow-hidden">
              <span className="relative z-10 group-hover:text-home-bg transition-colors duration-500">Request Allocation</span>
              <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            
            {/* Scarcity Counter */}
            <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] text-gold-primary/60 font-medium">
              Only <span className="text-gold-primary font-black">42</span> of 500 Units Remaining
            </p>
          </div>
        </motion.div>
      </div>

      {/* 5. PROVENANCE TICKER */}
      <div className="absolute bottom-0 w-full overflow-hidden border-t border-gold-primary/10 bg-black/20 backdrop-blur-sm py-4 md:py-5">
        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 md:gap-24 whitespace-nowrap text-[7px] md:text-[8px] uppercase tracking-[0.6em] font-black text-gold-primary/50"
        >
          <span>Batch: 09/A2</span>
          <span>•</span>
          <span>Altitude: 1,840m</span>
          <span>•</span>
          <span>Aging: 124 Months</span>
          <span>•</span>
          <span>Notes: Smoke, Honey, Ancient Resin</span>
          <span>•</span>
          <span>Origin: Middle Atlas Plateau</span>
          {/* Duplicated for seamless loop */}
          <span>•</span>
          <span>Batch: 09/A2</span>
          <span>•</span>
          <span>Altitude: 1,840m</span>
          <span>•</span>
          <span>Aging: 124 Months</span>
          <span>•</span>
          <span>Notes: Smoke, Honey, Ancient Resin</span>
        </motion.div>
      </div>

      {/* Side Decorative Totem (Vertical) - Kept hidden on smaller screens */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden 2xl:block">
        <p className="rotate-90 origin-right text-[8px] uppercase tracking-[1.2em] opacity-20 whitespace-nowrap font-black">
          The Unspoken Language of Luxury
        </p>
      </div>
    </motion.div>
  );

    default:
      return null;
  }
}