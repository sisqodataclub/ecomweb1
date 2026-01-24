import { motion } from "framer-motion";

export default function Press() {
  const ingredients = ["WILD OUD", "SAFFRON", "DAMASK ROSE", "AMBERGRIS", "ATLAS CEDAR"];
  
  // Duplicate for infinite loop
  const scrollingItems = [...ingredients, ...ingredients, ...ingredients, ...ingredients];

  return (
    // Reduced py-16 to py-8 for a thinner profile
    <section className="bg-black py-8 border-y border-white/10 overflow-hidden relative z-20">
      
      {/* Context Label - Reduced bottom margin (mb-6) */}
      <div className="container mx-auto px-6 text-center mb-6">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">
           Olfactory Palette
        </p>
      </div>
      
      {/* Scrolling Marquee */}
      <div className="flex w-full">
        <motion.div 
          className="flex gap-16 md:gap-32 whitespace-nowrap px-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {scrollingItems.map((item, index) => (
            <span 
              key={`${item}-${index}`} 
              // Slightly reduced font size to fit the thinner height
              className="text-neutral-500 font-serif text-lg md:text-2xl tracking-[0.15em] hover:text-yellow-600 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
      
      {/* Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none" />

    </section>
  );
}