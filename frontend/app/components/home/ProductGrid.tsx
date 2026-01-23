import { motion } from "framer-motion";

const PERFUMES = [
  {
    id: 1,
    name: "Oud Royale",
    notes: "Agarwood, Praline, Clove",
    price: "$240",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Midnight Rose",
    notes: "Damask Rose, Amber, Oud",
    price: "$195",
    image: "https://images.unsplash.com/photo-1547881338-64674c07698b?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "Golden Saffron",
    notes: "Saffron, Leather, Juniper",
    price: "$210",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
  },
];

export default function ProductGrid() {
  return (
    <section className="bg-home-bg py-20 md:py-32 px-6 transition-colors duration-1000 relative overflow-hidden">
      {/* Background Ambient Glow (matching HomeContent) */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-home-text text-3xl md:text-5xl font-serif mb-6 italic"
          >
            Signature <span className="text-gold-primary not-italic">Collection</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gold-primary/40" 
          />
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PERFUMES.map((perfume, index) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col items-center"
            >
              {/* Product Card Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-gold-primary/10 bg-black/5 shadow-xl transition-all duration-700 group-hover:border-gold-primary/30">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover opacity-80 md:grayscale md:opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100"
                />
                
                {/* Minimalist Gold Overlay Frame */}
                <div className="absolute inset-4 border border-gold-primary/0 transition-all duration-700 group-hover:border-gold-primary/10 pointer-events-none" />
              </div>

              {/* Product Info */}
              <div className="mt-8 text-center px-2">
                <h3 className="text-gold-primary font-serif text-xl md:text-2xl mb-2 tracking-tight">
                  {perfume.name}
                </h3>
                <p className="text-home-subtext text-xs md:text-sm italic mb-4 opacity-70">
                  {perfume.notes}
                </p>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-home-text font-light tracking-[0.2em] text-sm">
                    {perfume.price}
                  </p>
                  
                  {/* Action Button: More visible on mobile, animated on desktop */}
                  <button className="relative px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-gold-primary border border-gold-primary/20 hover:border-gold-primary transition-all duration-500 cursor-pointer overflow-hidden group/btn">
                    <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-home-bg">
                      Add to Collection
                    </span>
                    <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}