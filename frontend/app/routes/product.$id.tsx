import { useParams, Link } from "react-router"; // Use 'react-router-dom' if needed
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiMinus, PiPlus, PiCaretDown, PiStarFour, PiArrowLeft, PiCheck } from "react-icons/pi";
import Navbar from "~/components/home/Navbar";
import GrainOverlay from "~/components/ui/GrainOverlay";
import { useCart } from "~/contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("notes");
  const [addedToCart, setAddedToCart] = useState(false);

  // --- FETCH PRODUCT DATA ---
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://core.franciscodes.com/api/products/${id}/`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-Tenant": "web"
          }
        });

        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("❌ Product fetch error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  // --- IMAGE HELPER ---
  const getProductImage = (prod) => {
    if (!prod) return "";
    const primaryImage = prod.images?.find(img => img.is_primary);
    if (primaryImage?.image_url) return primaryImage.image_url;
    if (prod.images?.[0]?.image_url) return prod.images[0].image_url;
    if (prod.image_url) return prod.image_url;
    return "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop";
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-home-bg text-home-text flex items-center justify-center">
        <GrainOverlay />
        <div className="text-center">
          <div className="w-12 h-12 border-t border-gold-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gold-primary text-xs uppercase tracking-widest">Retrieving Artefact...</p>
        </div>
      </div>
    );
  }

  // --- ERROR STATE (Product Not Found) ---
  if (!product) {
    return (
      <div className="min-h-screen bg-home-bg text-home-text flex items-center justify-center relative">
        <GrainOverlay />
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Artefact Missing</h1>
          <p className="text-home-subtext mb-8">This scent has faded into history.</p>
          <Link to="/products" className="text-gold-primary border-b border-gold-primary pb-1 uppercase tracking-widest text-xs">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-home-bg text-home-text selection:bg-gold-primary selection:text-home-bg relative">
      <GrainOverlay />
      <Navbar />

      {/* MAIN LAYOUT: Split Screen */}
      <div className="pt-32 pb-20 container mx-auto px-6">

        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-home-subtext hover:text-gold-primary mb-12 transition-colors">
          <PiArrowLeft /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* LEFT: IMAGE (Sticky) */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="aspect-[4/5] w-full bg-home-text/5 relative overflow-hidden"
              >
                {/* Main Image */}
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop";
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Luxury inner border */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {/* Tagline & Name */}
              <h2 className="text-gold-primary text-xs uppercase tracking-[0.3em] mb-4 font-bold">
                {product.brand || product.category || "Extrait de Parfum"}
              </h2>
              <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl text-white/90 font-light mb-8">
                ${Number(product.price).toFixed(2)}
              </p>

              <div className="h-[1px] w-12 bg-gold-primary mb-8" />

              <p className="text-home-subtext leading-relaxed font-light text-sm md:text-base mb-10">
                {product.description || `A luxurious ${product.category?.toLowerCase() || 'crafted'} fragrance sourced from the finest ingredients.`}
              </p>

              {/* CONTROLS */}
              <div className="flex gap-6 mb-12">
                {/* Quantity */}
                <div className="flex items-center border border-gold-primary/30 px-4 h-14 w-32 justify-between bg-home-text/5">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:text-gold-primary transition-colors p-2">
                    <PiMinus />
                  </button>
                  <span className="font-mono text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="hover:text-gold-primary transition-colors p-2">
                    <PiPlus />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    if (product) {
                      addToCart(product, quantity);
                      setAddedToCart(true);
                      setTimeout(() => setAddedToCart(false), 2000);
                    }
                  }}
                  className="flex-1 bg-gold-primary text-home-bg h-14 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-2"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <PiCheck className="text-lg" />
                        Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* ACCORDIONS */}
              <div className="border-t border-white/10">
                <AccordionItem
                  title="Olfactory Notes"
                  isOpen={activeAccordion === "notes"}
                  onClick={() => setActiveAccordion(activeAccordion === "notes" ? "" : "notes")}
                >
                  <div className="grid grid-cols-3 gap-4 text-xs uppercase tracking-widest text-home-subtext py-2">
                    {/* Since API usually returns a string or JSON, we display safely */}
                    <div className="col-span-3 leading-relaxed">
                      {/* If you have specific fields in DB for notes, replace this logic */}
                      {typeof product.notes === 'object' ? (
                        <>
                          <p><span className="text-gold-primary">Top:</span> {product.notes.top || "---"}</p>
                          <p><span className="text-gold-primary">Heart:</span> {product.notes.heart || "---"}</p>
                          <p><span className="text-gold-primary">Base:</span> {product.notes.base || "---"}</p>
                        </>
                      ) : (
                        product.description_short || "Notes details not available for this vintage."
                      )}
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title="The Ritual"
                  isOpen={activeAccordion === "ritual"}
                  onClick={() => setActiveAccordion(activeAccordion === "ritual" ? "" : "ritual")}
                >
                  <p className="text-sm font-light text-home-subtext leading-relaxed">
                    Apply to pulse points—wrists, neck, and behind the ears. Do not rub; allow the heat of your body to awaken the oils naturally over time.
                  </p>
                </AccordionItem>

                <AccordionItem
                  title="Shipping & Returns"
                  isOpen={activeAccordion === "shipping"}
                  onClick={() => setActiveAccordion(activeAccordion === "shipping" ? "" : "shipping")}
                >
                  <p className="text-sm font-light text-home-subtext leading-relaxed">
                    Complimentary shipping on all orders over $200. Each bottle comes with a 2ml sample; if the sample does not captivate you, return the unopened full bottle within 30 days.
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

// --- HELPER COMPONENT: ACCORDION ---
function AccordionItem({ title, isOpen, onClick, children }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left group"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-white group-hover:text-gold-primary transition-colors">
          {title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold-primary"
        >
          <PiCaretDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}