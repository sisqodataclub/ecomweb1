import { motion } from "framer-motion";

interface KasbahLayoutProps {
  isDarkTheme: boolean;
}

export default function KasbahLayout({ isDarkTheme }: KasbahLayoutProps) {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div variants={containerVars} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4 h-[70vh]">
      <motion.div variants={itemVars} className={`relative overflow-hidden ${
        isDarkTheme ? "border border-gold-primary/10" : "border border-gold-primary/5"
      }`}>
        <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Kasbah" />
      </motion.div>
      <motion.div variants={itemVars} className={`flex flex-col justify-center p-12 ${
        isDarkTheme ? "bg-black/20" : "bg-home-text/5"
      }`}>
        <h1 className={`text-6xl md:text-8xl font-serif ${
          isDarkTheme ? "text-white" : "text-home-text"
        }`}>
          Souk <br/><span className="italic font-light">Nights</span>
        </h1>
        <p className={`tracking-widest uppercase text-xs mt-4 ${
          isDarkTheme ? "text-gray-400" : "text-home-subtext"
        }`}>
          Liquid Gold • Spices • Dusk
        </p>
      </motion.div>
    </motion.div>
  );
}