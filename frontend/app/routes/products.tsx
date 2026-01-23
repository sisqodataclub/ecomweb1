import { useState, useMemo, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiSlidersHorizontal, PiX, PiCheck, PiCaretDown, PiMinus, PiPlus } from "react-icons/pi";
// !!! IMPORT YOUR NAVBAR HERE !!!
import Navbar from "~/components/home/Navbar";

// --- MOCK DATA (Updated with Hover Images) ---
const PRODUCTS = [
  { 
    id: 1, name: "Oud Royale", category: "Unisex", gender: "unisex", price: 240, 
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 2, name: "Midnight Rose", category: "Floral", gender: "women", price: 195, 
    image: "https://images.unsplash.com/photo-1547881338-64674c07698b?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 3, name: "Golden Saffron", category: "Spicy", gender: "men", price: 210, 
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 4, name: "Atlas Cedar", category: "Woody", gender: "men", price: 180, 
    image: "https://images.unsplash.com/photo-1616949755610-8c9732802425?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 5, name: "Desert Amber", category: "Oriental", gender: "women", price: 260, 
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 6, name: "Vetiver Noir", category: "Earthy", gender: "men", price: 220, 
    image: "https://images.unsplash.com/photo-1590156221187-0ce0db2bf640?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 7, name: "Atlas Cedar", category: "Woody", gender: "men", price: 180, 
    image: "https://images.unsplash.com/photo-1616949755610-8c9732802425?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 8, name: "Desert Amber", category: "Oriental", gender: "women", price: 260, 
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 9, name: "Vetiver Noir", category: "Earthy", gender: "men", price: 220, 
    image: "https://images.unsplash.com/photo-1590156221187-0ce0db2bf640?auto=format&fit=crop&q=80&w=600",
    hoverImage: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=600" 
  },
];

const FILTERS = {
  gender: ["All", "Men", "Women", "Unisex"],
  price: ["All", "Under $200", "$200 - $250", "$250+"],
};

export default function Products() {
  const [activeGender, setActiveGender] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // --- PERFORMANCE STATE ---
  const [isPending, startTransition] = useTransition(); // Smooth state updates
  const [visibleCount, setVisibleCount] = useState(6);  // Pagination limit

  // --- FILTER LOGIC ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const genderMatch = activeGender === "All" || product.gender.toLowerCase() === activeGender.toLowerCase();
      
      let priceMatch = true;
      if (activePrice === "Under $200") priceMatch = product.price < 200;
      if (activePrice === "$200 - $250") priceMatch = product.price >= 200 && product.price <= 250;
      if (activePrice === "$250+") priceMatch = product.price > 250;

      return genderMatch && priceMatch;
    });
  }, [activeGender, activePrice]);

  // --- HANDLERS ---
  const handleGenderChange = (g) => {
    startTransition(() => {
      setActiveGender(g);
      setVisibleCount(6); // Reset pagination on filter change
    });
  };

  const handlePriceChange = (p) => {
    startTransition(() => {
      setActivePrice(p);
      setVisibleCount(6);
    });
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="pt-24 min-h-screen bg-home-bg text-home-text transition-colors duration-700">
      {/* 1. THE NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT WRAPPER */}
      {/* Changed pt-24 to pt-[140px] to ensure Navbar doesn't cover Header */}
      <div className="pt-[150px]">
        
        {/* 1. HEADER */}
        <header className="container mx-auto px-6 py-12 md:py-20 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            The <span className="text-shimmer italic">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-home-subtext uppercase tracking-[0.3em] text-xs max-w-md mx-auto"
          >
            Small batch distillations from the High Atlas.
          </motion.p>
        </header>

        {/* 2. FILTER BAR (Sticky) */}
        <div className="sticky top-[100px] z-40 bg-home-bg/80 backdrop-blur-xl border-y border-gold-primary/10">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            
            {/* Desktop Filters */}
            <div className="hidden md:flex gap-8">
              {FILTERS.gender.map((g) => (
                <button
                  key={g}
                  onClick={() => handleGenderChange(g)}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                    activeGender === g ? "text-gold-primary font-bold" : "text-home-subtext hover:text-home-text"
                  } ${isPending ? "opacity-50" : "opacity-100"}`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Right Side: Price (Desktop) & Results Count */}
            <div className="flex items-center gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-home-subtext relative group cursor-pointer">
                <span>Price</span>
                <PiCaretDown />
                
                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-4 w-48 bg-home-bg border border-gold-primary/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 flex flex-col gap-1">
                  {FILTERS.price.map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePriceChange(p)}
                      className={`text-left px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-gold-primary/10 ${
                        activePrice === p ? "text-gold-primary" : "text-home-text"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-2 text-xs uppercase tracking-widest border border-gold-primary/30 px-4 py-2 hover:bg-gold-primary hover:text-home-bg transition-colors"
              >
                <PiSlidersHorizontal className="text-lg" /> Filter
              </button>

              <span className="text-[10px] text-gold-primary/60 font-mono">
                {filteredProducts.length} Results
              </span>
            </div>
          </div>
        </div>

        {/* 3. PRODUCT GRID */}
        <div className="container mx-auto px-6 py-12 md:py-20 min-h-[60vh]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {isPending ? (
                // SKELETON LOADING STATE
                [...Array(3)].map((_, i) => <ProductSkeleton key={i} />)
              ) : (
                // PRODUCTS RENDER
                filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-20 text-home-subtext italic"
                  >
                    No treasures found in this selection.
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {!isPending && filteredProducts.length > visibleCount && (
            <div className="mt-20 text-center">
              <button 
                onClick={handleLoadMore}
                className="px-12 py-4 border border-gold-primary/30 text-home-text text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-gold-primary hover:text-home-bg transition-colors"
              >
                Discover More
              </button>
              <p className="mt-4 text-[9px] text-home-subtext uppercase tracking-widest opacity-60">
                Showing {visibleCount} of {filteredProducts.length}
              </p>
            </div>
          )}
        </div>

        {/* 4. MOBILE FILTER DRAWER */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div 
              className="fixed inset-0 z-[60] md:hidden"
            >
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute bottom-0 w-full bg-home-bg rounded-t-[2rem] border-t border-gold-primary/20 shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
              >
                <div className="p-6 border-b border-gold-primary/10 flex justify-between items-center">
                  <span className="text-xl font-serif italic">Refine</span>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-2"><PiX /></button>
                </div>

                <div className="p-8 overflow-y-auto space-y-10">
                  {/* Gender Section */}
                  <div>
                    <h3 className="text-gold-primary text-xs uppercase tracking-[0.2em] mb-4 font-bold">Category</h3>
                    <div className="flex flex-wrap gap-3">
                      {FILTERS.gender.map((g) => (
                        <button
                          key={g}
                          onClick={() => handleGenderChange(g)}
                          className={`px-6 py-3 border text-[10px] uppercase tracking-widest transition-all ${
                            activeGender === g 
                              ? "bg-gold-primary text-home-bg border-gold-primary" 
                              : "border-home-text/20 text-home-text"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div>
                    <h3 className="text-gold-primary text-xs uppercase tracking-[0.2em] mb-4 font-bold">Price Range</h3>
                    <div className="flex flex-col gap-2">
                      {FILTERS.price.map((p) => (
                        <button
                          key={p}
                          onClick={() => handlePriceChange(p)}
                          className="flex items-center justify-between py-3 border-b border-home-text/10 text-sm text-home-subtext hover:text-gold-primary"
                        >
                          {p}
                          {activePrice === p && <PiCheck className="text-gold-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gold-primary/10">
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full bg-home-text text-home-bg py-4 text-xs uppercase tracking-[0.3em] font-bold"
                  >
                    View {filteredProducts.length} Results
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- PRODUCT CARD (With Reveal & Lazy Loading) ---
function ProductCard({ product }) {
  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-home-text/5 mb-6">
        {/* Main Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-700 ease-out"
        />
        
        {/* Hover Reveal Image */}
        <img 
          src={product.hoverImage || product.image} 
          alt={`${product.name} detail`}
          loading="lazy" 
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
        />

        {/* Luxury Frame */}
        <div className="absolute inset-4 border border-gold-primary/0 group-hover:border-gold-primary/20 transition-all duration-500 pointer-events-none" />
        
        {/* Quick Add Overlay with Quantity */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-home-bg/90 backdrop-blur-sm border-t border-gold-primary/10">
          <div className="flex gap-2 w-full h-full">
            {/* Quantity Controls */}
            <div className="flex items-center justify-between px-2 py-3 border border-gold-primary/30 text-home-text w-24 bg-home-bg">
              <button 
                onClick={(e) => { e.stopPropagation(); setQuantity(q => Math.max(1, q - 1)); }}
                className="text-[10px] hover:text-gold-primary p-1"
              >
                <PiMinus />
              </button>
              <span className="text-[10px] font-bold">{quantity}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setQuantity(q => q + 1); }}
                className="text-[10px] hover:text-gold-primary p-1"
              >
                <PiPlus />
              </button>
            </div>
            
            {/* Add Button */}
            <button className="flex-1 py-3 border border-gold-primary/30 text-[9px] uppercase tracking-[0.2em] hover:bg-gold-primary hover:text-home-bg transition-all">
              Add - ${(product.price * quantity).toLocaleString()}
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-serif text-home-text mb-1">{product.name}</h3>
        <p className="text-[10px] uppercase tracking-widest text-home-subtext mb-3">{product.category}</p>
        <p className="text-gold-primary font-bold">${product.price}</p>
      </div>
    </motion.div>
  );
}

// --- SKELETON COMPONENT ---
function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[4/5] bg-home-text/5 mb-6" />
      <div className="h-6 bg-home-text/10 w-2/3 mx-auto mb-3" />
      <div className="h-3 bg-home-text/10 w-1/3 mx-auto" />
    </div>
  );
}