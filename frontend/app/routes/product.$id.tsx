"use client";

import { useParams, Link } from "react-router"; 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiMinus, PiPlus, PiCaretDown, PiArrowLeft, PiCheck, PiSparkle, PiShieldCheck, PiAirplaneTilt } from "react-icons/pi";

// FIXED RELATIVE IMPORTS
import Navbar from "../components/home/Navbar";
import { getProductById } from "../lib/api";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("notes");
  const [addedToCart, setAddedToCart] = useState(false);

  // --- UK PRICE FORMATTER ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(parseFloat(price));
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductById(id);
        if (!data) throw new Error("Artefact not found");
        setProduct(data);
      } catch (error) {
        console.error("❌ Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-t border-gold-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gold-primary text-[10px] uppercase tracking-[0.4em] animate-pulse">Retrieving Artefact...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-serif text-white mb-4">Artefact Missing</h1>
          <Link to="/products" className="text-gold-primary border-b border-gold-primary/30 pb-1 uppercase tracking-widest text-[10px]">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-gold-primary selection:text-black antialiased overflow-x-hidden">
      {/* MONOLITH PERSISTENCE: Navbar stays Obsidian Black */}
      <Navbar isDarkTheme={true} />

      {/* BACKGROUND TEXT (Monolith Style) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] flex items-center justify-center select-none">
        <span className="text-[30vw] font-serif uppercase tracking-tighter">ÉQUIVA</span>
      </div>

      <div className="pt-32 pb-20 container mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gray-500 hover:text-gold-primary mb-12 transition-all">
          <PiArrowLeft /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* LEFT: MONOLITH IMAGE BOX (GPU Accelerated) */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/5] w-full bg-[#0a0a0a] overflow-hidden group border border-white/5"
              >
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-gold-primary/5 blur-[100px] opacity-50 pointer-events-none" />
                
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                  style={{ willChange: "transform", transform: "translateZ(0)" }}
                />

                {/* Corner Decoration */}
                <div className="absolute top-8 left-8 border-l border-t border-gold-primary/30 w-12 h-12 pointer-events-none" />
                <div className="absolute bottom-8 right-8 border-r border-b border-gold-primary/30 w-12 h-12 pointer-events-none" />
                
                <div className="absolute top-1/2 left-6 -translate-y-1/2 opacity-20 hidden md:block">
                   <p className="rotate-90 origin-left text-[8px] uppercase tracking-[1em] whitespace-nowrap">Extrait de Parfum</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: OBSIDIAN DETAILS */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <span className="h-[1px] w-8 bg-gold-primary" />
                 <h2 className="text-gold-primary text-[10px] uppercase tracking-[0.5em] font-black">
                   {product.category || "The Private Selection"}
                 </h2>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.1] tracking-tight text-white">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <p className="text-3xl text-white font-mono tracking-tighter">
                  {formatPrice(product.price)}
                </p>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Incl. Duties</span>
              </div>

              <p className="text-gray-400 leading-relaxed font-light text-base md:text-lg mb-12 max-w-lg border-l border-gold-primary/20 pl-6">
                {product.description || `An uncompromising olfactory signature, distilled for those who claim their presence without permission.`}
              </p>

              {/* ACTION AREA */}
              <div className="flex flex-col gap-4 mb-16">
                <div className="flex gap-4 h-16">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-white/10 px-6 h-full w-40 justify-between bg-white/5 hover:border-gold-primary/30 transition-colors">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-gold-primary transition-colors p-2">
                      <PiMinus />
                    </button>
                    <span className="font-mono text-sm font-bold text-gold-primary">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-gold-primary transition-colors p-2">
                      <PiPlus />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }}
                    className="flex-1 bg-gold-primary text-black h-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-white transition-all duration-700 flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                  >
                    <AnimatePresence mode="wait">
                      {addedToCart ? (
                        <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
                          <PiCheck className="text-lg" /> Securely Added
                        </motion.span>
                      ) : (
                        <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                          Add to Collection <PiSparkle className="group-hover:rotate-180 transition-transform duration-700" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              {/* TRUST BADGES */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/5 mb-10 text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  <div className="flex items-center gap-3">
                    <PiAirplaneTilt className="text-xl text-gold-primary/60" />
                    <span>Royal Shipping <br/> £50+ Complimentary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PiShieldCheck className="text-xl text-gold-primary/60" />
                    <span>Authenticity <br/> Guaranteed</span>
                  </div>
              </div>

              {/* ACCORDIONS (Obsidion Style) */}
              <div className="space-y-2">
                <AccordionItem
                  title="Olfactory Composition"
                  isOpen={activeAccordion === "notes"}
                  onClick={() => setActiveAccordion(activeAccordion === "notes" ? "" : "notes")}
                >
                  <div className="text-[12px] uppercase tracking-[0.2em] text-gray-400 leading-loose">
                      <p><span className="text-gold-primary">Signature:</span> {product.category || "Exotic"}</p>
                      <p><span className="text-gold-primary">Complexity:</span> High Intensity</p>
                      <p className="mt-4 lowercase first-letter:uppercase text-gray-500 font-serif italic text-base">A meticulous distillation crafted for the bold.</p>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title="The Ritual"
                  isOpen={activeAccordion === "ritual"}
                  onClick={() => setActiveAccordion(activeAccordion === "ritual" ? "" : "ritual")}
                >
                  <p className="text-sm font-light text-gray-400 leading-relaxed italic">
                    Apply to pulse points. Allow the heat of your body to awaken the complex oils naturally. Do not rub; let the scent breathe.
                  </p>
                </AccordionItem>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionItem({ title, isOpen, onClick, children }) {
  return (
    <div className={`border border-white/5 transition-colors duration-500 ${isOpen ? "bg-white/[0.02]" : ""}`}>
      <button onClick={onClick} className="w-full flex justify-between items-center px-6 py-6 text-left group">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 group-hover:text-gold-primary transition-colors">
          {title}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gold-primary">
          <PiCaretDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 text-gray-400">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
