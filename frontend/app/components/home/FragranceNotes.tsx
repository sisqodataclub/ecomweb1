import { motion } from "framer-motion";
import { PiInfinityLight, PiPlantLight, PiStarLight, PiShieldCheckLight } from "react-icons/pi";

const STATS = [
  {
    title: "24H+",
    subtitle: "Longevity",
    icon: <PiInfinityLight className="text-5xl" />,
    description: "Engineered with Extrait de Parfum concentration. A scent that lingers from the first spray until the following dawn.",
    delay: 0.1
  },
  {
    title: "98%",
    subtitle: "Natural Oils",
    icon: <PiPlantLight className="text-5xl" />,
    description: "Clean luxury sourced from Grasse and the High Atlas. Free from harsh synthetics, parabens, and phthalates.",
    delay: 0.2
  },
  {
    title: "1,000+",
    subtitle: "5-Star Reviews",
    icon: <PiStarLight className="text-5xl" />,
    description: "Adored by connoisseurs worldwide. Join a community that values distinction, presence, and uncompromising quality.",
    delay: 0.3
  },
  {
    title: "30-Day",
    subtitle: "Scent Guarantee",
    icon: <PiShieldCheckLight className="text-5xl" />,
    description: "Wear it with confidence. If it doesn't become your signature within 30 days, we make it right.",
    delay: 0.4
  }
];

export default function BrandStats() {
  return (
    <section className="relative bg-home-bg text-home-text py-32 px-6 border-t border-gold-primary/10 transition-colors duration-1000 overflow-hidden">
      
      {/* --- ATMOSPHERE GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-home-text/5 blur-[100px] rounded-full"
        />
      </div>

      <div className="container mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-6"
          >
             <span className="h-[1px] w-8 bg-gold-primary/50"></span>
             <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-primary font-bold">Why Équiva Iconic</span>
             <span className="h-[1px] w-8 bg-gold-primary/50"></span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif mb-4 italic text-home-text"
          >
            Excellence in <span className="text-shimmer not-italic font-normal">Details</span>
          </motion.h2>
        </div>

        {/* CARDS GRID (Updated to 4 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent -translate-y-1/2 z-0" />

          {STATS.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: stat.delay }}
              className="group relative z-10"
            >
              <div className="h-full p-8 border border-gold-primary/10 bg-home-bg/80 backdrop-blur-md hover:bg-home-text/5 hover:border-gold-primary/40 transition-all duration-700 text-center flex flex-col items-center shadow-lg shadow-black/5">
                
                {/* Number Watermark (01, 02, etc) */}
                <span className="absolute top-4 right-4 text-5xl font-serif text-home-text/5 group-hover:text-gold-primary/10 transition-colors duration-700 select-none">
                  0{index + 1}
                </span>

                {/* Icon Circle */}
                <div className="w-16 h-16 mb-6 rounded-full border border-gold-primary/20 flex items-center justify-center bg-home-bg group-hover:scale-110 group-hover:border-gold-primary transition-all duration-700 shadow-[0_0_30px_-5px_rgba(212,175,55,0.1)]">
                  <div className="text-gold-primary transition-transform duration-700 group-hover:rotate-6">
                    {stat.icon}
                  </div>
                </div>

                {/* Title (The Statistic) */}
                <h3 className="text-home-text font-serif text-3xl mb-1 group-hover:text-gold-primary transition-colors duration-500">
                  {stat.title}
                </h3>

                {/* Subtitle (The Label) */}
                <p className="text-gold-primary/70 uppercase tracking-[0.2em] text-[9px] mb-6 font-bold">
                  {stat.subtitle}
                </p>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-gold-primary/30 mb-6 group-hover:w-16 transition-all duration-700" />

                {/* Description */}
                <p className="text-home-subtext text-xs font-light leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {stat.description}
                </p>
                
                {/* Bottom Active Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold-primary transition-all duration-500 group-hover:w-1/2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}