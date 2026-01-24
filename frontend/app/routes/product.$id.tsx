import { useParams, Link } from "react-router"; // Use 'react-router-dom' if not using Remix/React Router v7
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiMinus, PiPlus, PiCaretDown, PiStarFour, PiArrowLeft } from "react-icons/pi";
import Navbar from "~/components/home/Navbar";
import GrainOverlay from "~/components/ui/GrainOverlay";

// --- MOCK DATA (Your list + Enriched details for the product page) ---
const PRODUCTS = [
  { 
    id: 1, 
    name: "Oud Royale", 
    category: "Unisex", 
    gender: "unisex", 
    price: 240, 
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=600",
    // Added details:
    tagline: "The Scent of Kings",
    description: "A commanding blend of aged Agarwood and Royal Amber. Sourced from the deep forests of Assam and distilled in the heart of Marrakesh, this scent captures the essence of nobility.",
    notes: { top: "Bergamot, Saffron", heart: "Wild Oud, Rose", base: "Amber, Musk" }
  },
  { 
    id: 2, 
    name: "Midnight Rose", 
    category: "Floral", 
    gender: "women", 
    price: 195, 
    image: "/a1.png",
    hoverImage: "/a1.png",
    // Added details:
    tagline: "Velvet in the Dark",
    description: "An intoxicating floral bouquet that blooms only at night. Damask Rose petals are harvested at dawn to preserve their dew-kissed freshness, layered over a smoky incense base.",
    notes: { top: "Pink Pepper, Cassis", heart: "Damask Rose, Peony", base: "Incense, Vanilla" }
  },
  { 
    id: 3, 
    name: "Golden Saffron", 
    category: "Spicy", 
    gender: "men", 
    price: 210, 
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600",
    tagline: "The Red Gold",
    description: "Hand-picked saffron threads from Taliouine, woven into a tapestry of warm spices and soft leather. A fragrance that radiates the heat of the desert sun.",
    notes: { top: "Saffron, Cinnamon", heart: "Leather, Tobacco", base: "Oud, Sandalwood" }
  },
  { 
    id: 4, 
    name: "Atlas Cedar", 
    category: "Woody", 
    gender: "men", 
    price: 180, 
    image: "/a2.png",
    hoverImage: "/a2.png",
    tagline: "Strength of the Mountain",
    description: "Inspired by the ancient cedar forests of the Middle Atlas. Crisp, clean, and grounding, this scent evokes the silence of the mountains.",
    notes: { top: "Pine, Juniper", heart: "Atlas Cedar, Vetiver", base: "Oakmoss, Musk" }
  },
  { 
    id: 5, 
    name: "Desert Amber", 
    category: "Oriental", 
    gender: "women", 
    price: 260, 
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?auto=format&fit=crop&q=80&w=600",
    tagline: "Liquid Sunset",
    description: "Warm, resinous, and deeply comforting. A tribute to the golden dunes of Merzouga at dusk.",
    notes: { top: "Mandarin, Honey", heart: "Amber, Labdanum", base: "Vanilla, Benzoin" }
  },
  { 
    id: 6, 
    name: "Vetiver Noir", 
    category: "Earthy", 
    gender: "men", 
    price: 220, 
    image: "/a3.png",
    hoverImage: "/a3.png",
    tagline: "Shadows & Earth",
    description: "A dark, smoky interpretation of classic Vetiver. Rooty and raw, sharpened with black pepper and softened by night-blooming jasmine.",
    notes: { top: "Black Pepper, Lime", heart: "Vetiver, Jasmine", base: "Patchouli, Smoke" }
  },
  { 
    id: 7, 
    name: "Cedar", 
    category: "Woody", 
    gender: "men", 
    price: 80, 
    image: "/a3.png",
    hoverImage: "/a3.png",
    tagline: "Pure Essence",
    description: "A single-note exploration of Moroccan Cedarwood. Simple, elegant, and timeless.",
    notes: { top: "Citrus", heart: "Cedarwood", base: "Dry Amber" }
  },
  { 
    id: 8, 
    name: "Amber", 
    category: "Oriental", 
    gender: "women", 
    price: 60, 
    image: "/a2.png",
    hoverImage: "/a2.png",
    tagline: "Golden Warmth",
    description: "A pure amber distillation. Sweet, resinous, and enveloping.",
    notes: { top: "Bergamot", heart: "Amber", base: "Vanilla" }
  },
  { 
    id: 9, 
    name: "Vetiver", 
    category: "Earthy", 
    gender: "men", 
    price: 220, 
    image: "/a1.png",
    hoverImage: "/a1.png",
    tagline: "Root of the Earth",
    description: "Fresh, grassy, and clean. The scent of rain falling on dry earth.",
    notes: { top: "Grapefruit", heart: "Vetiver", base: "Moss" }
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("notes");

  // Find product (parse ID as number)
  const product = PRODUCTS.find((p) => p.id === Number(id));

  // Handle "Product Not Found"
  if (!product) {
    return (
      <div className="min-h-screen bg-home-bg text-home-text flex items-center justify-center">
        <GrainOverlay />
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Artefact Missing</h1>
          <Link to="/products" className="text-gold-primary border-b border-gold-primary pb-1">Return to Collection</Link>
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
                  src={product.image} 
                  alt={product.name} 
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
                {product.tagline || product.category}
              </h2>
              <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl text-white/90 font-light mb-8">
                ${product.price}
              </p>

              <div className="h-[1px] w-12 bg-gold-primary mb-8" />

              <p className="text-home-subtext leading-relaxed font-light text-sm md:text-base mb-10">
                {product.description || `A luxurious ${product.category.toLowerCase()} fragrance sourced from the finest ingredients.`}
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
                <button className="flex-1 bg-gold-primary text-home-bg h-14 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors duration-500">
                  Add to Cart
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
                    <div>
                      <span className="block text-gold-primary mb-1 font-bold">Top</span>
                      {product.notes?.top || "---"}
                    </div>
                    <div>
                      <span className="block text-gold-primary mb-1 font-bold">Heart</span>
                      {product.notes?.heart || "---"}
                    </div>
                    <div>
                      <span className="block text-gold-primary mb-1 font-bold">Base</span>
                      {product.notes?.base || "---"}
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem 
                  title="The Ritual" 
                  isOpen={activeAccordion === "ritual"} 
                  onClick={() => setActiveAccordion(activeAccordion === "ritual" ? "" : "ritual")}
                >
                  <p className="text-sm font-light text-home-subtext leading-relaxed">
                    Apply to pulse points—wrists, neck, and behind the ears. Do not rub; allow the heat of your body to awaken the oud oils naturally over time.
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

      {/* RECOMMENDATIONS SECTION */}
      <section className="border-t border-white/5 py-24 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <PiStarFour className="text-2xl text-gold-primary mx-auto mb-4 animate-spin-slow" />
            <h3 className="text-3xl font-serif">You May Also Desire</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Filter out current product, show 3 random others */}
            {PRODUCTS.filter(p => p.id !== Number(id)).slice(0, 3).map(rec => (
               <Link to={`/product/${rec.id}`} key={rec.id} className="group block cursor-pointer">
                 <div className="aspect-[4/5] bg-white/5 overflow-hidden mb-6 relative">
                   <img 
                      src={rec.image} 
                      alt={rec.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    />
                   {/* Frame on Hover */}
                   <div className="absolute inset-3 border border-gold-primary/0 group-hover:border-gold-primary/20 transition-all duration-500" />
                 </div>
                 <div className="text-center">
                   <h4 className="font-serif text-xl mb-2 group-hover:text-gold-primary transition-colors">{rec.name}</h4>
                   <p className="text-xs uppercase tracking-widest text-home-subtext mb-2">{rec.category}</p>
                   <p className="text-sm text-gold-primary">${rec.price}</p>
                 </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

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