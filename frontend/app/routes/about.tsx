import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PiStarFour, PiDrop, PiMountains, PiCurrencyDollar } from "react-icons/pi";
import { Link } from "react-router"; 
// !!! IMPORT YOUR NAVBAR !!!
import Navbar from "~/components/home/Navbar";

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
    <div ref={containerRef} className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg">
      
      {/* 1. NAVBAR */}
      <Navbar />

      {/* --- 2. HERO SECTION --- */}
      {/* CHANGED: Increased padding to pt-[200px] to prevent Navbar overlap */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-[200px]">
        {/* Parallax Background Image */}
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay for text readability */}
          <img 
            src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop" 
            alt="Moroccan Dunes" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Text */}
        <div className="relative z-20 text-center px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.4em] text-gold-primary mb-4 font-bold">
              Est. Marrakesh
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-serif text-white mb-6">
              The Soul of <span className="italic text-gold-primary">Morocco</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 max-w-lg mx-auto text-sm md:text-lg font-light leading-relaxed tracking-wide">
              Bridging the gap between the ancient palaces of the Maghreb and the modern world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. THE ORIGIN STORY --- */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border border-gold-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1554188248-986adbb73be0?q=80&w=800&auto=format&fit=crop" 
                alt="Moroccan Oils" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-primary/10 rounded-full blur-3xl" />
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

            <motion.div variants={fadeUp} className="mt-10">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" 
                alt="Founder Signature" 
                className="h-12 opacity-60 invert dark:invert-0" // Simple placeholder signature
              />
              <p className="text-[10px] uppercase tracking-widest mt-2 text-gold-primary">Founder & Creative Director</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. PHILOSOPHY / VALUE PROPOSITION --- */}
      <section className="py-24 bg-home-text/5 border-y border-gold-primary/10">
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

      {/* --- 5. THE PILLARS (Grid) --- */}
      <section className="py-24 md:py-32 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
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
              Our oils are unadulterated. We reject synthetic fillers. What you smell is the raw, complex soul of the ingredient, exactly as it was extracted in the mountains.
            </p>
          </motion.div>

          {/* Pillar 2 */}
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
              Luxury usually comes with a markup for the "brand name." We cut out the middlemen and the marketing fluff to bring you Niche quality at a fair price.
            </p>
          </motion.div>

          {/* Pillar 3 */}
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
              From the Saffron of Taliouine to the Roses of Kelâat M'Gouna, every bottle contains the distinct DNA of the Moroccan landscape.
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- 6. FOOTER / CTA --- */}
      <section className="relative py-32 flex flex-col items-center justify-center overflow-hidden">
        {/* Background Blur */}
        <div className="absolute inset-0 bg-gold-primary/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-home-text">
            Experience the <span className="italic text-gold-primary">Legacy</span>
          </h2>
          <Link 
            to="/products"
            className="group relative inline-block px-12 py-5 bg-transparent border border-gold-primary/40 text-home-text text-[10px] uppercase tracking-[0.3em] font-black hover:border-gold-primary transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-home-bg transition-colors duration-500">
              Shop The Collection
            </span>
            <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </section>

    </div>
  );
}