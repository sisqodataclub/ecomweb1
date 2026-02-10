"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PiSlidersHorizontal, 
  PiX, 
  PiCheck, 
  PiCaretDown, 
  PiArrowsDownUp,
  PiMagnifyingGlass,
  PiSparkle,
  PiTrash
} from "react-icons/pi";

// FIXED IMPORTS: Navigating from /routes/products.tsx to /components/ and /lib/
import Navbar from "../components/home/Navbar";
import { getProducts } from "../lib/api";

const FILTERS = {
  category: ["All", "Men", "Women", "Unisex"],
  price: ["All", "Under £200", "£200 - £250", "£250+"],
  sort: [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" }
  ]
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(parseFloat(price));
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activePrice, setActivePrice] = useState("All");
  const [activeSort, setActiveSort] = useState("featured");
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [visibleCount, setVisibleCount] = useState(6);

  // Check if any filters are active to show "Clear All"
  const hasActiveFilters = activeCategory !== "All" || activePrice !== "All" || searchQuery !== "";

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("❌ Collection fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productCat = product.category ? product.category.toLowerCase() : "unisex";
      const selectedCat = activeCategory.toLowerCase();
      const categoryMatch = activeCategory === "All" || productCat === selectedCat;

      let priceMatch = true;
      const price = parseFloat(product.price);
      if (activePrice === "Under £200") priceMatch = price < 200;
      if (activePrice === "£200 - £250") priceMatch = price >= 200 && price <= 250;
      if (activePrice === "£250+") priceMatch = price > 250;

      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });

    if (activeSort === "price_asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (activeSort === "price_desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [products, activeCategory, activePrice, activeSort, searchQuery]);

  const handleCategoryChange = (c) => {
    startTransition(() => {
      setActiveCategory(c);
      setVisibleCount(6);
      if (c !== "All") searchParams.set("category", c);
      else searchParams.delete("category");
      setSearchParams(searchParams);
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      setActiveCategory("All");
      setActivePrice("All");
      setSearchQuery("");
      searchParams.delete("category");
      setSearchParams(searchParams);
      setVisibleCount(6);
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[#050505] text-white selection:bg-gold-primary selection:text-black">
      <Navbar />

      <div className="pt-[60px] md:pt-[80px]">
        {/* HEADER */}
        <header className="container mx-auto px-6 py-12 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mb-4">
             <PiSparkle className="text-gold-primary text-xl animate-pulse" />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-serif mb-6">
            The <span className="text-shimmer italic text-gold-primary">Collection</span>
          </motion.h1>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-[9px] max-w-md mx-auto">
            London • Marrakech • High Atlas
          </p>
        </header>

        {/* SEARCH, FILTER & SORT BAR */}
        <div className="sticky top-[70px] md:top-[80px] z-40 bg-[#050505]/90 backdrop-blur-xl border-y border-white/5">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-4">
            
            {/* Desktop Search */}
            <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-72 focus-within:border-gold-primary/40 transition-all">
              <PiMagnifyingGlass className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Find a fragrance..." 
                className="bg-transparent text-[10px] uppercase tracking-widest outline-none w-full placeholder:text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Desktop Categories */}
            <div className="hidden md:flex gap-10">
              {FILTERS.category.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`text-[10px] uppercase tracking-[0.3em] transition-all ${activeCategory === c ? "text-gold-primary font-black scale-110" : "text-gray-500 hover:text-white"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 ml-auto">
              {/* CLEAR ALL BUTTON (Desktop) */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    onClick={clearAllFilters}
                    className="hidden lg:flex items-center gap-2 text-[9px] uppercase tracking-widest text-red-400/70 hover:text-red-400 transition-colors mr-2"
                  >
                    <PiTrash /> Clear All
                  </motion.button>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-white/10 bg-white/5 px-5 py-2.5 rounded-full hover:border-gold-primary transition-all"
              >
                <PiSlidersHorizontal className="text-gold-primary" /> 
                <span className="hidden sm:inline">Refine</span>
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="container mx-auto px-6 py-12 md:py-20 min-h-[60vh]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {isLoading || isPending ? (
                [...Array(3)].map((_, i) => <ProductSkeleton key={i} />)
              ) : (
                filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 font-serif italic mb-6">No scents match your current selection.</p>
              <button onClick={clearAllFilters} className="text-gold-primary uppercase tracking-[0.3em] text-[10px] border-b border-gold-primary/30 pb-1">Reset Filters</button>
            </div>
          )}

          {!isLoading && filteredProducts.length > visibleCount && (
            <div className="mt-24 text-center">
              <button
                onClick={() => setVisibleCount(v => v + 3)}
                className="px-16 py-5 border border-gold-primary/20 text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-gold-primary hover:text-black transition-all rounded-sm"
              >
                Discover More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div className="fixed inset-0 z-[100] md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileFilterOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="absolute bottom-0 w-full bg-[#080808] border-t border-white/10 rounded-t-[3rem] overflow-hidden max-h-[85vh] flex flex-col">
              <div className="p-8 flex-1 overflow-y-auto space-y-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-serif italic text-gold-primary">Refine</h3>
                  <div className="flex items-center gap-4">
                    {hasActiveFilters && (
                      <button onClick={clearAllFilters} className="text-[10px] uppercase tracking-widest text-red-400">Reset</button>
                    )}
                    <button onClick={() => setIsMobileFilterOpen(false)} className="bg-white/5 p-3 rounded-full"><PiX className="text-xl" /></button>
                  </div>
                </div>
                
                {/* Mobile Search */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Search</p>
                  <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                    <PiMagnifyingGlass className="text-gold-primary text-xl" />
                    <input 
                      type="text" 
                      placeholder="Search collection..." 
                      className="bg-transparent outline-none w-full text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Mobile Sort */}
                <div className="space-y-4">
                   <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2"><PiArrowsDownUp /> Sort Order</p>
                   <div className="flex flex-col gap-3">
                     {FILTERS.sort.map((s) => (
                       <button key={s.value} onClick={() => setActiveSort(s.value)} className={`text-left p-4 rounded-xl text-xs uppercase tracking-widest ${activeSort === s.value ? "bg-gold-primary text-black font-bold" : "bg-white/5 text-gray-400"}`}>{s.label}</button>
                     ))}
                   </div>
                </div>
              </div>

              <div className="p-8 border-t border-white/5 bg-[#080808]">
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-white text-black py-5 text-[10px] uppercase tracking-[0.4em] font-black rounded-xl">
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <motion.div layout className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-8">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" />
      </motion.div>
      <div className="text-center px-4">
        <h3 className="text-2xl md:text-3xl font-serif mb-2 group-hover:text-gold-primary transition-colors duration-500">{product.name}</h3>
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-3">{product.category}</p>
        <p className="text-gold-primary font-mono text-sm tracking-tighter">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-white/5 mb-8 rounded-sm" />
      <div className="h-8 bg-white/5 w-3/4 mx-auto mb-3" />
      <div className="h-4 bg-white/5 w-1/4 mx-auto" />
    </div>
  );
}
