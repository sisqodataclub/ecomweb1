import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Gifting() {
  // 1. Create a reference to the section to track its scroll progress
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Starts tracking when top of section hits bottom of screen
  });

  // 2. Map the scroll progress to a vertical offset (Parallax)
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-home-bg text-home-text py-24 md:py-32 border-t border-gold-primary/10 overflow-hidden transition-colors duration-1000"
    >
      
      {/* --- ATMOSPHERE GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-home-glow blur-[120px] rounded-full opacity-60"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-primary/10 blur-[100px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10">
        
        {/* Image side with Parallax */}
        <div className="relative w-full md:w-1/2 aspect-[4/5] overflow-hidden border border-gold-primary/20 bg-home-text/5 shadow-2xl">
          <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
            <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" 
              alt="Luxury Gifting" 
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
            />
          </motion.div>
          
          {/* Subtle Inner Glow & Border Overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.2)]" />
          <div className="absolute inset-4 border border-gold-primary/10 pointer-events-none" />
        </div>

        {/* Text side */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <span className="text-gold-primary text-[10px] tracking-[0.5em] uppercase font-bold block mb-4">
            Complimentary
          </span>
          
          <h2 className="text-home-text text-4xl md:text-6xl font-serif mb-6 leading-tight">
            The Art of <span className="text-shimmer italic font-light">Gifting</span>
          </h2>
          
          <p className="text-home-subtext font-light leading-relaxed mb-10 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Every Maison Équiva Iconic creation arrives in our signature lacquered box, 
            hand-wrapped in silk tissue. Add a personalized message engraved into the glass 
            flacon for a truly bespoke experience.
          </p>
          
          <button className="group relative px-10 py-4 bg-transparent border border-gold-primary/40 text-home-text text-[10px] uppercase tracking-[0.3em] font-black hover:border-gold-primary transition-all duration-500 overflow-hidden cursor-pointer">
            <span className="relative z-10 group-hover:text-home-bg transition-colors duration-500">
                Shop Now
            </span>
            <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}