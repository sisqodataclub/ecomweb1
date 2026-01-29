import { useState, useMemo, useTransition, useEffect } from "react"; 
import { useSearchParams } from "react-router"; 
import { Link } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";
import { PiSlidersHorizontal, PiX, PiCheck, PiCaretDown, PiMinus, PiPlus } from "react-icons/pi";
import Navbar from "~/components/home/Navbar";

// --- FILTERS CONSTANTS ---
const FILTERS = {
  // These match your database 'category' values
  category: ["All", "Men", "Women", "Unisex"],
  price: ["All", "Under $200", "$200 - $250", "$250+"],
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  // Filter States
  // We call it 'activeCategory' now instead of 'activeGender' for clarity
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activePrice, setActivePrice] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [visibleCount, setVisibleCount] = useState(6); 

  // --- 1. FETCH DATA FROM API ---
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://core.franciscodes.com/api/products/", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-Tenant": "web"
          }
        });

        const data = await response.json();
        
        let results = [];
        if (data.results && Array.isArray(data.results)) {
          results = data.results;
        } else if (Array.isArray(data)) {
          results = data;
        }

        setProducts(results);
      } catch (error) {
        console.error("❌ Product fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // --- 2. SYNC URL PARAMS ---
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("All");
    }
  }, [searchParams]);

  // --- 3. FILTER LOGIC (UPDATED TO USE CATEGORY) ---
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Normalize Database Category
      const productCat = product.category ? product.category.toLowerCase() : "unisex"; 
      
      // 2. Normalize Selected Filter
      const selectedCat = activeCategory.toLowerCase();

      // 3. Match
      const categoryMatch = activeCategory === "All" || productCat === selectedCat;
      
      // 4. Price Logic
      let priceMatch = true;
      const price = parseFloat(product.price);
      if (activePrice === "Under $200") priceMatch = price < 200;
      if (activePrice === "$200 - $250") priceMatch = price >= 200 && price <= 250;
      if (activePrice === "$250+") priceMatch = price > 250;

      return categoryMatch && priceMatch;
    });
  }, [products, activeCategory, activePrice]);

  // --- HANDLERS ---
  const handleCategoryChange = (c) => {
    startTransition(() => {
      setActiveCategory(c);
      setVisibleCount(6);
      if (c === "All") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", c);
      }
      setSearchParams(searchParams);
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
      <Navbar />

      <div className="pt-[100px] md:pt-[120px]">
        
        {/* HEADER */}
        <header className="container mx-auto px-6 py-12 md:py-16 text-center">
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

        {/* FILTER BAR */}
        <div className="sticky top-[70px] md:top-[80px] z-40 bg-home-bg/85 backdrop-blur-xl border-y border-gold-primary/10 transition-all duration-300">
          <div className="container mx-auto px-6 h-12 flex items-center justify-between">
            
            {/* Desktop Category Filters */}
            <div className="hidden md:flex gap-8">
              {FILTERS.category.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                    activeCategory === c ? "text-gold-primary font-bold" : "text-home-subtext hover:text-home-text"
                  } ${isPending ? "opacity-50" : "opacity-100"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-home-subtext relative group cursor-pointer h-full">
                <span className="flex items-center gap-2">Price <PiCaretDown /></span>
                <div className="absolute top-full right-0 mt-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="w-48 bg-home-bg border border-gold-primary/20 shadow-xl p-2 flex flex-col gap-1">
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
              </div>

              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="md:hidden flex items-center gap-2 text-[10px] uppercase tracking-widest border border-gold-primary/30 px-3 py-1.5 hover:bg-gold-primary hover:text-home-bg transition-colors"
              >
                <PiSlidersHorizontal className="text-sm" /> Filter
              </button>

              <span className="text-[10px] text-gold-primary/60 font-mono">
                {filteredProducts.length} Results
              </span>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="container mx-auto px-6 py-12 md:py-20 min-h-[60vh]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {isLoading || isPending ? (
                [...Array(3)].map((_, i) => <ProductSkeleton key={i} />)
              ) : (
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
          {!isLoading && !isPending && filteredProducts.length > visibleCount && (
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

        {/* MOBILE FILTER DRAWER */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div className="fixed inset-0 z-[60] md:hidden">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
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
                  <div>
                    <h3 className="text-gold-primary text-xs uppercase tracking-[0.2em] mb-4 font-bold">Category</h3>
                    <div className="flex flex-wrap gap-3">
                      {FILTERS.category.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleCategoryChange(c)}
                          className={`px-6 py-3 border text-[10px] uppercase tracking-widest transition-all ${
                            activeCategory === c 
                              ? "bg-gold-primary text-home-bg border-gold-primary" 
                              : "border-home-text/20 text-home-text"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

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

// --- PRODUCT CARD ---
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const getImage = (prod) => {
    const primary = prod.images?.find(img => img.is_primary);
    if (primary?.image_url) return primary.image_url;
    if (prod.images?.[0]?.image_url) return prod.images[0].image_url;
    if (prod.image_url) return prod.image_url;
    return "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&auto=format&fit=crop";
  };

  const mainImage = getImage(product);

  const handleAction = (e, actionCallback) => {
    e.preventDefault(); 
    e.stopPropagation();
    actionCallback();
  };

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="group cursor-pointer h-full"
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-home-text/5 mb-6">
          <img 
            src={mainImage} 
            alt={product.name} 
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-700 ease-out"
          />
          
          <img 
            src={mainImage} 
            alt={`${product.name} detail`}
            loading="lazy" 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out grayscale group-hover:grayscale-0"
          />

          <div className="absolute inset-4 border border-gold-primary/0 group-hover:border-gold-primary/20 transition-all duration-500 pointer-events-none" />
          
          <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-home-bg/90 backdrop-blur-sm border-t border-gold-primary/10">
            <div className="flex gap-2 w-full h-full">
              <div className="flex items-center justify-between px-2 py-3 border border-gold-primary/30 text-home-text w-24 bg-home-bg">
                <button 
                  onClick={(e) => handleAction(e, () => setQuantity(q => Math.max(1, q - 1)))}
                  className="text-[10px] hover:text-gold-primary p-1"
                >
                  <PiMinus />
                </button>
                <span className="text-[10px] font-bold">{quantity}</span>
                <button 
                  onClick={(e) => handleAction(e, () => setQuantity(q => q + 1))}
                  className="text-[10px] hover:text-gold-primary p-1"
                >
                  <PiPlus />
                </button>
              </div>
              
              <button 
                onClick={(e) => handleAction(e, () => console.log(`Added ${quantity} of ${product.name}`))}
                className="flex-1 py-3 border border-gold-primary/30 text-[9px] uppercase tracking-[0.2em] hover:bg-gold-primary hover:text-home-bg transition-all"
              >
                Add - ${(parseFloat(product.price) * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-serif text-home-text mb-1 group-hover:text-gold-primary transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-home-subtext mb-3">{product.category || "Extrait"}</p>
          <p className="text-gold-primary font-bold">${parseFloat(product.price).toFixed(2)}</p>
        </div>
      </motion.div>
    </Link>
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