import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    id: "vibe",
    text: "How do you want to feel?",
    options: [
      { label: "Bold & Powerful", value: "oud" },
      { label: "Elegant & Romantic", value: "floral" },
      { label: "Fresh & Energetic", value: "citrus" },
    ],
  },
  {
    id: "setting",
    text: "Where will you wear this scent?",
    options: [
      { label: "Midnight Galas", value: "dark" },
      { label: "Sunlit Gardens", value: "light" },
      { label: "Professional Meetings", value: "woody" },
    ],
  },
];

const RESULTS = {
  oud: { 
    name: "Oud Royale", 
    desc: "For the bold and mysterious. A scent that commands the room.",
    img: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?q=80&w=600" 
  },
  floral: { 
    name: "Midnight Rose", 
    desc: "A timeless, romantic soul. Soft petals meeting warm amber.",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600" 
  },
  citrus: { 
    name: "Golden Saffron", 
    desc: "Bright, energetic, and rare. Sunshine captured in a bottle.",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600" 
  },
};

export default function FragranceQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Default fallback if result calculation is complex, but here simplistic mapping
  const resultKey = answers.vibe || "oud"; 
  const currentResult = RESULTS[resultKey];

  return (
    <section className="relative bg-home-bg text-home-text py-24 px-6 border-t border-gold-primary/10 transition-colors duration-1000 overflow-hidden">
      
      {/* --- ATMOSPHERE GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-home-glow blur-[140px] rounded-full opacity-60"
        />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-shimmer text-4xl font-serif mb-4">Fragrance Finder</h2>
          <p className="text-home-subtext uppercase tracking-widest text-xs">Find your signature aura</p>
        </div>

        {/* QUIZ CONTAINER */}
        <div className="bg-home-text/5 border border-gold-primary/20 backdrop-blur-sm min-h-[500px] flex flex-col justify-center relative overflow-hidden shadow-2xl rounded-sm transition-colors duration-1000">
          
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="questions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 z-10 text-center w-full"
              >
                <div className="mb-8">
                    <span className="text-gold-primary text-[10px] uppercase tracking-[0.2em] mb-2 block opacity-70">
                        Question {step + 1} of {QUESTIONS.length}
                    </span>
                    <h3 className="text-home-text text-2xl md:text-3xl font-serif italic">
                    "{QUESTIONS[step].text}"
                    </h3>
                </div>

                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                  {QUESTIONS[step].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="group py-4 px-6 border border-gold-primary/30 text-home-subtext hover:border-gold-primary hover:bg-gold-primary hover:text-home-bg transition-all duration-300 cursor-pointer uppercase text-[10px] tracking-[0.3em] bg-home-bg/50 relative overflow-hidden"
                    >
                      <span className="relative z-10 font-bold">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[500px] flex items-center justify-center p-8 md:p-12 text-center w-full"
              >
                {/* Reveal Image Background */}
                <motion.div 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 z-0"
                >
                  <img 
                    src={currentResult?.img} 
                    className="w-full h-full object-cover grayscale opacity-80" 
                    alt="Result Background" 
                  />
                  {/* Dynamic Gradient Overlay using Theme Background Color */}
                  <div className="absolute inset-0 bg-gradient-to-t from-home-bg via-home-bg/80 to-transparent" />
                </motion.div>

                {/* Result Content */}
                <div className="relative z-10 w-full">
                  <motion.span 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gold-primary text-[10px] uppercase tracking-[0.5em] block mb-2 font-bold"
                  >
                    Your Aura
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-home-text text-4xl md:text-6xl font-serif mb-4"
                  >
                    {currentResult?.name}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-home-subtext font-light mb-10 max-w-sm mx-auto leading-relaxed text-sm md:text-base"
                  >
                    {currentResult?.desc}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                  >
                    <button className="w-full md:w-auto px-8 py-4 bg-gold-primary text-home-bg text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg hover:shadow-gold-primary/30">
                      Shop Now
                    </button>
                    <button 
                        onClick={resetQuiz} 
                        className="w-full md:w-auto px-8 py-4 border border-home-text/20 text-home-subtext text-[10px] uppercase tracking-widest hover:text-home-text hover:border-gold-primary transition-colors"
                    >
                      Retake
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}