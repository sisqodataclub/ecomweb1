import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PiStarFour, PiDrop, PiInfinity, PiCrown } from "react-icons/pi"; 
import { Link } from "react-router"; 

// !!! IMPORTS !!!
import Navbar from "~/components/home/Navbar";
import GrainOverlay from "~/components/ui/GrainOverlay"; 

// --- SEO: STRUCTURED DATA (JSON-LD) ---
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "Équiva Iconic",
  "url": "https://web.franciscodes.com",
  "logo": "https://web.franciscodes.com/logo.png",
  "description": "Luxury fragrances crafted with high oil concentration for exceptional longevity.",
  "slogan": "Elegance that lasts.",
  "sameAs": [
    "https://instagram.com/equivaiconic",
    "https://facebook.com/equivaiconic"
  ]
};

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

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <article ref={containerRef} className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg relative transition-colors duration-1000" data-theme-color="obsidian">
      
      {/* --- SEO: INJECT SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 0. GLOBAL TEXTURE LAYER */}
      <GrainOverlay />

      {/* 1. NAVBAR */}
      <Navbar />

      {/* --- 2. HERO SECTION --- */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        
        {/* Background Gradient - Theme Aware */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-home-text/5 to-home-bg z-0" />

        {/* Cinematic Spotlight */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[70vh] bg-gradient-to-b from-gold-primary via-transparent to-transparent z-10"
        />

        {/* MAIN CONTENT */}
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center gap-10">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl flex flex-col items-center"
          >
            {/* 1. Tagline */}
            <motion.p variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold-primary mb-8 font-bold opacity-80">
              The Art of Permanence
            </motion.p>
            
            {/* 2. Brand Name */}
            <motion.h1 
              variants={fadeUp} 
              className="font-serif text-6xl md:text-8xl lg:text-9xl text-home-text mb-2 leading-[0.8] tracking-tighter"
            >
              Équiva <span className="text-gold-primary italic">Iconic</span>
            </motion.h1>

            {/* 3. Sub-Headline */}
            <motion.h2 variants={fadeUp} className="text-2xl md:text-4xl font-light text-home-text/60 mb-12 tracking-wide font-serif">
              Elegance that lasts.
            </motion.h2>
            
            {/* 4. Divider */}
            <motion.div variants={fadeUp} className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent mb-12" />
            
            {/* 5. Intro Text - SEO OPTIMIZED */}
            <motion.p 
                variants={fadeUp} 
                className="text-home-subtext text-sm md:text-lg font-light leading-relaxed tracking-wide max-w-2xl px-4"
            >
                We analyse the DNA of the world’s most iconic perfumes and recreate them with uncompromising precision. Our high-potency Extrait de Parfum formulas ensure your scent lasts longer and projects further—giving you the luxury experience without the luxury markup.</motion.p>
          </motion.div>

        </div>
      </header>

      {/* --- NEW SECTION: STATS & TRUST SIGNALS (Marketing) --- */}
      <div className="border-y border-gold-primary/10 bg-home-text/5 py-10 overflow-hidden relative z-20">
        <div className="container mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-center">
             
             {/* Stat 1 */}
             <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-serif text-gold-primary">24H+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-home-subtext font-bold">Longevity</div>
             </div>

             {/* Stat 2 */}
             <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-serif text-gold-primary">98%</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-home-subtext font-bold">Natural Oils</div>
             </div>

             {/* Stat 3 */}
             <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-serif text-gold-primary">1,000+</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-home-subtext font-bold">5-Star Reviews</div>
             </div>

             {/* Stat 4 */}
             <div className="space-y-2">
                <div className="text-3xl md:text-4xl font-serif text-gold-primary">30-Day</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-home-subtext font-bold">Scent Guarantee</div>
             </div>

        </div>
      </div>

      {/* --- 3. THE CHEMISTRY (Performance) --- */}
      <section className="py-24 md:py-32 container mx-auto px-6 relative z-10" aria-label="Our Formulation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border-l border-b border-gold-primary/30 relative group">
              <img 
                src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800" 
                alt="Équiva Iconic High Concentration Perfume Oil Bottle" 
                loading="lazy"
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-home-bg via-transparent to-transparent opacity-20" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="md:pl-10 order-1 md:order-2"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="h-[1px] w-12 bg-gold-primary" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-primary font-bold">Uncompromising Quality</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-8 leading-tight text-home-text">
              Intensity by <br/> <span className="italic text-gold-primary">Design</span>
            </motion.h2>
            
            <motion.div variants={fadeUp} className="space-y-6 text-home-subtext font-light leading-relaxed text-sm md:text-base border-l border-gold-primary/10 pl-6">
              <p>
                We do not deal in the fleeting. Our fragrances are crafted with a <strong className="text-home-text font-normal">higher concentration of perfume oils</strong> (Extrait de Parfum), meticulously engineered to bond with the skin.
              </p>
              <p>
                The result is a refined, elegant trail—a <em>sillage</em> that announces your arrival and lingers as a memory of your departure.
              </p>
              
              {/* Internal Link */}
              <div className="pt-4">
                  <Link to="/products?category=extrait" className="text-xs uppercase tracking-widest text-gold-primary border-b border-gold-primary/30 hover:border-gold-primary pb-1 transition-all">
                      Learn about Extrait De Parfum
                  </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- 4. THE EVOLUTION (Philosophy) --- */}
      <section className="relative py-32 bg-home-text/5 overflow-hidden" aria-label="Brand Philosophy">
        
        {/* Abstract Background Element */}
        <motion.div 
            style={{ y: parallaxY }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" 
        />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl mx-auto"
          >
            <PiStarFour className="text-3xl text-gold-primary mx-auto mb-8 animate-spin-slow" />
            
            <h3 className="text-3xl md:text-5xl font-serif leading-relaxed mb-10 italic text-home-text/90">
              "Each scent is created to evolve beautifully over time, maintaining depth, balance, and character."
            </h3>

            <div className="h-16 w-[1px] bg-gold-primary/30 mx-auto mb-8" />
            
            <p className="text-xl md:text-2xl font-light tracking-wide text-gold-primary">
              More than a fragrance, it is a presence. <br/>
              <span className="font-serif italic text-home-text">A personal signature.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 5. THE THREE PILLARS --- */}
      <section className="py-24 md:py-32 container mx-auto px-6" aria-label="Brand Values">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border-t border-gold-primary/20 hover:bg-home-text/5 transition-colors duration-500 group"
          >
            <PiCrown className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4 text-home-text">Iconic Inspiration</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              We study the masterpieces of olfactory history, reinterpreting the world's most beloved profiles with modern precision and enhanced intensity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 border-t border-gold-primary/20 hover:bg-home-text/5 transition-colors duration-500 group"
          >
            <PiDrop className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4 text-home-text">Oil Concentration</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              Designed for performance. Our blends use a higher ratio of precious oils to alcohol, ensuring the scent survives the day on your skin.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-8 border-t border-gold-primary/20 hover:bg-home-text/5 transition-colors duration-500 group"
          >
            <PiInfinity className="text-4xl text-gold-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-serif mb-4 text-home-text">Lasting Trail</h3>
            <p className="text-home-subtext text-xs leading-relaxed">
              A fragrance should not shout, but it should never disappear. We engineer our base notes to leave a refined, unforgettable aura.
            </p>
          </motion.div>

        </div>
      </section>

      {/* --- 6. CTA / FOOTER (With Tracking) --- */}
      <footer 
        className="relative py-32 flex flex-col items-center justify-center overflow-hidden bg-home-bg border-t border-gold-primary/10"
        data-track-section="about-cta"
      >
        <div className="relative z-10 text-center px-6">
          <p className="text-[9px] uppercase tracking-[0.4em] text-home-subtext mb-6">Your Signature Awaits</p>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 text-home-text">
            Discover the scent <br/> that <span className="italic text-gold-primary">defines you</span>.
          </h2>
          <Link 
            to="/products"
            className="group relative inline-block px-12 py-5 bg-transparent border border-gold-primary text-gold-primary text-[10px] uppercase tracking-[0.3em] font-black hover:bg-gold-primary hover:text-home-bg transition-all duration-500"
            data-track-event="cta-click"
            data-track-label="about-page-explore-collection"
          >
            Explore The Collection
          </Link>
        </div>
      </footer>

    
      {/* --- 7. CONTACT SECTION --- */}
      <section className="py-20 bg-home-bg/50 border-t border-gold-primary/20" aria-label="Contact">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-home-text">Get in Touch</h3>
          <p className="text-home-subtext mb-8 max-w-md mx-auto">
            For inquiries, collaborations, or feedback, feel free to reach out.
          </p>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-home-bg border border-gold-primary/30 rounded-lg hover:border-gold-primary transition-colors duration-300">
            <span className="text-home-text font-mono text-lg">fd92uk@gmail.com</span>
            <svg className="w-5 h-5 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </section>
</article>
  );
}