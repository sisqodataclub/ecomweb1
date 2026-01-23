import { motion } from "framer-motion";
import { PiWindLight, PiFlowerLotusLight, PiTreeLight } from "react-icons/pi";

const NOTES = [
  {
    title: "Head Notes",
    subtitle: "The First Impression",
    icon: <PiWindLight className="text-5xl" />,
    description: "Citrus, Bergamot, and Pink Pepper. These light molecules provide the initial spark that awakens the senses.",
    delay: 0.1
  },
  {
    title: "Heart Notes",
    subtitle: "The Soul of Scent",
    icon: <PiFlowerLotusLight className="text-5xl" />,
    description: "Damask Rose, Jasmine, and Saffron. The true personality of the perfume that lingers after the first impression.",
    delay: 0.3
  },
  {
    title: "Base Notes",
    subtitle: "The Lasting Memory",
    icon: <PiTreeLight className="text-5xl" />,
    description: "Oud, Sandalwood, and Amber. Deep, resonant molecules that ground the fragrance and stay with you all day.",
    delay: 0.5
  }
];

export default function FragranceNotes() {
  return (
    <section className="relative bg-home-bg text-home-text py-24 px-6 border-t border-gold-primary/10 transition-colors duration-1000 overflow-hidden">
      
      {/* --- ATMOSPHERE GLOWS --- */}
      {/* These use your theme's glow color to create depth */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-home-glow blur-[100px] rounded-full opacity-50"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-gold-primary/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif mb-4 italic"
          >
            The Olfactory <span className="text-shimmer not-italic font-normal">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-home-subtext uppercase tracking-[0.4em] text-xs font-light"
          >
            Layer by Layer
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NOTES.map((note) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: note.delay }}
              className="group relative p-10 border border-gold-primary/10 bg-home-text/5 backdrop-blur-sm hover:bg-gold-primary/5 hover:border-gold-primary/30 transition-all duration-700 text-center flex flex-col items-center"
            >
              {/* Icon Container */}
              <div className="text-gold-primary mb-6 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                {note.icon}
              </div>

              {/* Title */}
              <h3 className="text-home-text font-serif text-2xl mb-2 group-hover:text-gold-primary transition-colors duration-500">
                {note.title}
              </h3>

              {/* Subtitle */}
              <p className="text-gold-primary/80 uppercase tracking-widest text-[10px] mb-6 font-bold">
                {note.subtitle}
              </p>

              {/* Description */}
              <p className="text-home-subtext text-sm font-light leading-relaxed">
                {note.description}
              </p>

              {/* Decorative Corner Borders on Hover */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gold-primary/40 transition-all duration-500 group-hover:w-full" />
              <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-gold-primary/40 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}