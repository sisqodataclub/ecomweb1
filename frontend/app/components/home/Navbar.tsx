import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router"; 
import { 
  PiList, 
  PiX, 
  PiShoppingBag, 
  PiMagnifyingGlass, 
  PiArrowRight, 
  PiInstagramLogo, 
  PiWhatsappLogo, 
  PiEnvelopeSimple 
} from "react-icons/pi";

// --- ANIMATION CONFIGURATION ---
const menuOverlayVars = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } }
};

const menuPanelVars = {
  initial: { y: "-100%" },
  animate: { 
    y: "0%",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    y: "-100%", 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const linkVars = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { y: 20, opacity: 0 }
};

const containerVars = {
  initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- LOGIC ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <>
      {/* 1. MAIN NAVIGATION (Fixed Top) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-700 font-sans ${
          isScrolled 
            ? "py-4 bg-home-bg/85 backdrop-blur-xl border-b border-gold-primary/10 shadow-sm" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-home-text">
          
          {/* --- LEFT: Links + Mobile Trigger + Search --- */}
          <div className="flex-1 flex items-center justify-start gap-6">
            <div className="hidden md:flex gap-8">
              {/* Linked Collection to /products */}
              <NavLink label="Collection" to="/products" />
              <NavLink label="About Us" to="/about" />
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden -ml-2 p-2 text-2xl hover:text-gold-primary transition-colors active:scale-90"
              aria-label="Menu"
            >
              <PiList />
            </button>
            
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-xl hover:text-gold-primary transition-colors p-1"
              aria-label="Search"
            >
              <PiMagnifyingGlass />
            </button>
          </div>

          {/* --- CENTER: Logo --- */}
          <div className="flex-1 flex justify-center">
            {/* ✅ UPDATED: Added text-gold-primary and whitespace-nowrap */}
            <Link to="/" className="text-gold-primary whitespace-nowrap text-2xl md:text-3xl font-serif font-bold tracking-tighter cursor-pointer relative group">
              Équiva Iconic
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* --- RIGHT: Desktop Links + Cart --- */}
          <div className="flex-1 flex justify-end items-center gap-8">
            <div className="hidden md:flex gap-8">
                <NavLink label="Men" to="/products?gender=Men" />
                <NavLink label="Women" to="/products?gender=Women" />
            </div>
            
            {/* Cart Icon Linked to /cart */}
            <Link to="/cart" className="relative group p-1" aria-label="Cart">
              <PiShoppingBag className="text-2xl hover:text-gold-primary transition-colors" />
              <span className="absolute -top-1 -right-1 bg-gold-primary text-home-bg text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                2
              </span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 2. HALF-SCREEN MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col"
          >
            {/* The Backdrop (Bottom Half) - Clicks close menu */}
            <motion.div 
              variants={menuOverlayVars}
              initial="initial" animate="animate" exit="exit"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* The Menu Panel (Top Half - approx 60% height) */}
            <motion.div
              variants={menuPanelVars}
              initial="initial" animate="animate" exit="exit"
              className="relative w-full h-[65vh] bg-home-bg text-home-text flex flex-col border-b border-gold-primary/20 shadow-2xl rounded-b-[2rem] overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gold-primary/10">
                {/* ✅ UPDATED: Added text-gold-primary here too */}
                <span className="text-xl font-serif font-bold tracking-tighter text-gold-primary"> Équiva Iconic</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-3xl hover:text-gold-primary transition-colors active:rotate-90 duration-300"
                >
                  <PiX />
                </button>
              </div>

              {/* Links Body */}
              <div className="flex-1 flex flex-col justify-center px-8 relative">
                  <div className="absolute -right-20 top-1/4 w-64 h-64 bg-gold-primary/5 rounded-full blur-[80px] pointer-events-none" />

                  {/* ... inside the Mobile Menu container ... */}
                <motion.div variants={containerVars} className="flex flex-col gap-5">
                    <MobileNavLink index="01" label="Collections" to="/products" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavLink index="02" label="About Us" to="/about" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavLink index="03" label="Women" to="/products?gender=Women" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavLink index="04" label="Men" to="/products?gender=Men" onClick={() => setIsMobileMenuOpen(false)} />
                    <MobileNavLink index="05" label="T&C" onClick={() => setIsMobileMenuOpen(false)} />
                </motion.div>
              </div>

              {/* Minimal Footer inside Menu */}
              <div className="px-8 py-6 border-t border-gold-primary/10 bg-home-text/5 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-home-subtext text-xs">
                    <PiEnvelopeSimple /> concierge@ÉquivaIconic.com
                  </div>
                  <div className="flex gap-4 text-lg">
                      <PiInstagramLogo className="hover:text-gold-primary cursor-pointer" />
                      <PiWhatsappLogo className="hover:text-gold-primary cursor-pointer" />
                  </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SEARCH CURTAIN OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-home-bg/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 font-sans text-home-text"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 hover:text-gold-primary transition-colors text-xs uppercase tracking-widest flex items-center gap-2"
            >
              Close <PiX className="text-lg" />
            </button>

            <div className="w-full max-w-2xl text-center">
              <motion.label 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block text-gold-primary text-xs uppercase tracking-[0.3em] mb-6 font-bold"
              >
                Search The Collection
              </motion.label>
              
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                className="relative group border-b border-home-text/20 focus-within:border-gold-primary transition-colors duration-500"
              >
                <input 
                  type="text" 
                  placeholder="Type to search..." 
                  autoFocus
                  className="w-full bg-transparent py-4 text-3xl md:text-5xl font-serif text-center placeholder:text-home-text/20 focus:outline-none"
                />
                <PiArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gold-primary opacity-0 group-focus-within:opacity-100 -translate-x-4 group-focus-within:translate-x-0 transition-all duration-500" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FOOTER TICKER (Fixed Bottom) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-0 w-full z-[40] bg-home-bg/90 backdrop-blur-md border-t border-gold-primary/20 text-home-text py-3 flex items-center justify-center gap-3 overflow-hidden font-sans shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"
      >
        <PiEnvelopeSimple className="text-gold-primary text-lg" />
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-center">
          Complimentary Worldwide Shipping on Orders Over $250
        </p>
      </motion.div>
    </>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({ label, to }) {
  return (
    <Link 
      to={to || "#"}
      className="relative text-[10px] uppercase tracking-[0.2em] font-medium text-home-subtext hover:text-gold-primary transition-colors group py-2"
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-primary transition-all duration-500 group-hover:w-full opacity-50" />
    </Link>
  );
}

function MobileNavLink({ index, label, onClick, to }) {
  return (
    <motion.div variants={linkVars} className="group relative w-full">
        <Link
            to={to || "#"}
            onClick={onClick}
            className="flex items-baseline gap-6 w-full"
        >
            <span className="text-[10px] text-gold-primary/60 font-mono group-hover:text-gold-primary transition-colors">{index}</span>
            <span className="text-3xl md:text-5xl font-serif text-home-text group-hover:text-gold-primary group-hover:italic transition-all duration-500">
                {label}
            </span>
        </Link>
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-primary/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}