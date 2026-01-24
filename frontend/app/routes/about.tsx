import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PiStarFour, PiDrop, PiMountains, PiCurrencyDollar } from "react-icons/pi";
import { Link } from "react-router"; 

// !!! IMPORTS !!!
import Navbar from "~/components/home/Navbar";
import GrainOverlay from "~/components/ui/GrainOverlay"; // Ensure this matches your folder structure

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } }
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg relative">
      
      {/* 0. GLOBAL TEXTURE LAYER (Film Grain) */}
      <GrainOverlay />

      {/* 1. NAVBAR */}
      <Navbar />

      {/* --- 2. HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        
        {/* Deep "Moroccan Night" Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1500] via-[#2c2005] to-black z-0" />

        {/* Vibrant "Golden Hour" Glow */}
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-gold-primary/25 rounded-full blur-[90px] mix-blend-screen pointer-events-none" 
        />

        {/* MAIN CONTENT CONTAINER */}
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center gap-10">
          
          {/* THE IMAGE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full flex justify-center"
          >
            <img 
              src="/fl.png" 
              alt="Essence" 
              className="w-full max-w-sm md:max-w-md max-h-[50vh] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* THE TEXT */}
          {/* THE TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-2xl flex flex-col items-center"
          >
            {/* 1. Small Kufic-style header */}
            <motion.p variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-primary mb-6 font-bold opacity-80">
              Est. Marrakesh • 1920
            </motion.p>
            
            {/* 2. ARABIC CALLIGRAPHY (The Centerpiece) */}
            <motion.h1 
              variants={fadeUp} 
              className="font-serif text-5xl md:text-7xl text-gold-primary mb-4 leading-relaxed drop-shadow-md select-none"
              dir="rtl" // Right-to-Left direction for correct Arabic rendering
            >
              روح المغرب
            </motion.h1>

            {/* 3. ENGLISH TRANSLATION */}
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
              The Soul of <span className="italic font-light text-white/80">Morocco</span>
            </motion.h2>
            
            {/* 4. Decorative Divider */}
            <motion.div variants={fadeUp} className="w-12 h-[1px] bg-gold-primary/50 mb-8" />
            
            {/* 5. Description */}
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base font-light leading-relaxed tracking-wide px-4 italic">
              "Bridging the eternal silence of the Sahara with the modern pulse of the world."
            </motion.p>
          </motion.div>

        </div>
      </section>

      {/* --- 3. THE ORIGIN STORY --- */}
      <section className="py-24 md:py-32 container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* The container defines the grid shape (aspect-3/4) and size constraints */}
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-gold-primary/20 relative group">
              <img 
                src="/a1.png" 
                alt="Aurum" 
                // UPDATED CLASSES:
                // 1. w-full h-full: Fills the parent container completely.
                // 2. object-cover: Ensures it fills the space without stretching, cropping if needed.
                // (Removed previous size constraints and object-contain)
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl z-[-1]" />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:pl-10"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-gold-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-primary font-bold">Heritage</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Born from the <br/> <span className="italic text-gold-primary">High Atlas</span>
            </motion.h2>
            
            <motion.div variants={fadeUp} className="space-y-6 text-home-subtext font-light leading-relaxed text-sm md:text-base">
              <p>
                AURUM was not founded in a corporate boardroom, but amidst the winding alleyways of the Medina and the cedar forests of the Middle Atlas.
              </p>
              <p>
                Our founder, raised on the soil of Morocco, grew up surrounded by the sacred ritual of scent. From the extraction of Argan oil to the distillation of pure Rose water, we learned that true luxury is patience.
              </p>
              <p>
                We source our Oud and essential oils directly from local artisans in Morocco who have guarded their extraction secrets for generations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. THE FOUNDER'S NOTE (NEW SECTION) --- */}
      <section className="relative py-24 bg-home-text/5 overflow-hidden">
        {/* Decorative Background Arabesque */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none translate-x-1/2 -translate-y-1/2 rotate-45">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-gold-primary">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto border-l-2 border-gold-primary/30 pl-8 md:pl-16 py-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold-primary mb-8 font-bold">
                A Note from the Perfumer
              </p>
              
              <h3 className="text-3xl md:text-5xl font-serif leading-relaxed mb-10 italic opacity-90">
                "We do not create fragrance to be noticed. We create fragrance to be <span className="text-gold-primary">remembered</span>. <br/><br/>
                In a world that shouts, oud is the whisper that draws you in."
              </h3>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Signature Placeholder */}
                <div className="h-16 w-32 relative opacity-70">
                   <svg viewBox="0 0 200 100" className="w-full h-full stroke-gold-primary fill-none stroke-[2px]">
                      <path d="M20,50 Q50,20 80,50 T150,50" />
                      <path d="M100,50 Q120,80 140,40" />
                   </svg>
                </div>
                
                <div className="text-sm">
                  <p className="uppercase tracking-widest font-bold text-home-text">Ismail Al-Fayed</p>
                  <p className="text-gold-primary/80 font-serif italic">Master Perfumer, Marrakesh</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 5. PHILOSOPHY --- */}
      <section className="py-24 border-y border-gold-primary/10">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <PiStarFour className="text-3xl text-gold-primary mx-auto mb-8 animate-spin-slow" />
            <h2 className="text-3xl md:text-5xl font-serif leading-snug mb-8">
              "We believe that <span className="text-gold-primary italic">Oud</span> is nature’s gold, and gold belongs to the people, not just the palaces."
            </h2>
            <p className="text-home-subtext uppercase tracking-[0.2em] text-xs">
              The Aurum Philosophy
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 6. THE PILLARS (Grid) --- */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border border-gold-primary/10 hover:border-gold-primary/40 transition-colors duration-500 group"
          >
            <PiDrop className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4">Pure Distillation</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              Our oils are unadulterated. We reject synthetic fillers. What you smell is the raw, complex soul of the ingredient.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 border border-gold-primary/10 hover:border-gold-primary/40 transition-colors duration-500 group bg-home-text/5"
          >
            <PiCurrencyDollar className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4">Attainable Opulence</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              Luxury usually comes with a markup for the "brand name." We cut out the middlemen to bring you Niche quality at a fair price.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 border border-gold-primary/10 hover:border-gold-primary/40 transition-colors duration-500 group"
          >
            <PiMountains className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4">Moroccan Terroir</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              From the Saffron of Taliouine to the Roses of Kelâat M'Gouna, every bottle contains the distinct DNA of the landscape.
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- 7. CONCIERGE / FOOTER --- */}
      <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-gold-primary/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-gold-primary mb-6">Private Client Services</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-10 text-white">
            Begin Your <span className="italic text-gold-primary">Ritual</span>
          </h2>
          <Link 
            to="/products"
            className="group relative inline-block px-12 py-5 bg-transparent border border-gold-primary/40 text-white text-[10px] uppercase tracking-[0.3em] font-black hover:border-gold-primary transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Access The Collection
            </span>
            <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </section>

    </div>
  );
}