"use client";

import { useState, useMemo, useTransition, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiCaretDown,
  PiSparkle
} from "react-icons/pi";

// FIXED IMPORTS
import SEO from "../components/ui/SEO";
import Navbar from "../components/home/Navbar";
import { getProducts } from "../lib/api";

const FILTERS = {
  category: ["All", "Men", "Women", "Unisex"],
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

  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activeSort, setActiveSort] = useState("featured");
  
  // FIXED: State for Mobile Sort Menu
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("❌ Collection fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || searchParams.get("gender");
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const productCat = product.category ? product.category.toLowerCase() : "unisex";
      const selectedCat = activeCategory.toLowerCase();
      return activeCategory === "All" || productCat === selectedCat;
    });

    if (activeSort === "price_asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (activeSort === "price_desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [products, activeCategory, activeSort]);

  const handleCategoryChange = (c) => {
    startTransition(() => {
      setActiveCategory(c);
      setVisibleCount(6);
      if (c !== "All") {
        searchParams.set("category", c);
      } else {
        searchParams.delete("category");
        searchParams.delete("gender");
      }
      setSearchParams(searchParams);
    });
  };

  return (
    <div className="pt-24 min-h-screen bg-[#050505] text-white selection:bg-gold-primary selection:text-black antialiased">

      <SEO
        title={`${activeCategory === 'All' ? 'The Collection' : activeCategory} • Équiva Iconic`}
        description={`Explore the ${activeCategory.toLowerCase()} collection of iconic perfume recreations. Presence without permission.`}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `The ${activeCategory} Collection | Équiva Iconic`,
          "description": "Luxury extrait de parfum recreations of the world's most iconic scents.",
          "url": "https://www.equivaiconic.co.uk/products",
        }}
      />

      <Navbar isDarkTheme={true} />

      <div className="pt-[60px] md:pt-[80px]">
        <header className="container mx-auto px-6 py-12 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mb-4">
             <PiSparkle className="text-gold-primary text-xl animate-pulse" />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-serif">
            The <span className="text-shimmer italic text-gold-primary">Collection</span>
          </motion.h1>
        </header>

        {/* NAVIGATION BAR */}
        <div className="sticky top-[70px] md:top-[80px] z-40 bg-[#050505]/95 backdrop-blur-xl border-y border-white/5">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            
            {/* Categories */}
            <div className="flex gap-8 md:gap-10 overflow-x-auto no-scrollbar py-2 items-center">
              {FILTERS.category.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCategoryChange(c)}
                  className={`text-[12px] md:text-[10px] uppercase tracking-[0.3em] transition-all whitespace-nowrap py-3 px-1 ${
                    activeCategory.toLowerCase() === c.toLowerCase()
                    ? "text-gold-primary font-black scale-105"
                    : "text-gray-500 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* FIXED SORT DROPDOWN FOR MOBILE */}
            <div 
              className="flex items-center gap-4 text-[12px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 relative cursor-pointer h-full ml-4"
              onClick={() => setIsSortOpen(!isSortOpen)}
              onMouseEnter={() => setIsSortOpen(true)}
              onMouseLeave={() => setIsSortOpen(false)}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                Sort <PiCaretDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
              </span>

              <div className={`absolute top-full right-0 mt-0 pt-2 transition-all duration-300 ${isSortOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="w-52 bg-[#0a0a0a] border border-white/10 shadow-2xl p-2 flex flex-col">
                  {FILTERS.sort.map((s) => (
                    <button
                      key={s.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSort(s.value);
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-4 text-[11px] md:text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors ${activeSort === s.value ? "text-gold-primary" : "text-white"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
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

          {!isLoading && filteredProducts.length > visibleCount && (
            <div className="mt-24 text-center pb-20">
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

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="block group">
      <motion.div layout className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
        />
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
