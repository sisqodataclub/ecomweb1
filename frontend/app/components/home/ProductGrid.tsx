"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiHandbag } from "react-icons/pi";

// FIXED: Using relative path to resolve the [plugin:vite:import-analysis] error
import { getProducts } from "../../lib/api"; 

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Calls the centralized helper which already handles 'X-Tenant' and data mapping
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("❌ Collection load error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // FIXED: Standardized UK Pound (£) formatting
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(parseFloat(price));
  };

  if (loading) {
    return (
      <section className="bg-home-bg py-24 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-t border-gold-primary rounded-full animate-spin mb-4" />
        <p className="text-gold-primary text-xs uppercase tracking-[0.3em] animate-pulse">
          Curating Collection...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-home-bg py-24 px-0 md:px-8 relative z-10 transition-colors duration-1000">
      <div className="container mx-auto max-w-[1400px]">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-24 px-4"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-home-subtext block mb-3">
            The Private Collection
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-home-text">
            Best <span className="italic text-gold-primary">Seller</span>
          </h2>
        </motion.div>

        {/* PRODUCT CONTAINER */}
        <div className="flex gap-4 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scroll-smooth no-scrollbar md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-16 md:pb-0 md:overflow-visible">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="min-w-[45vw] md:min-w-0 snap-center group flex flex-col relative"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 mb-4 md:mb-6">
                <Link to={`/product/${product.id}`} className="block w-full h-full cursor-pointer">
                  <div className="absolute inset-0 border border-gold-primary/10 group-hover:border-gold-primary/40 transition-colors duration-500 z-20 pointer-events-none" />
                  
                  {/* Using 'product.image' processed by your api.js helper */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    loading="lazy"
                  />
                </Link>

                <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 pointer-events-none">
                  <button className="w-full bg-home-text text-home-bg py-3 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-gold-primary transition-colors flex items-center justify-center gap-2 pointer-events-auto shadow-xl">
                    <PiHandbag size={14} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* INFO */}
              <div className="text-center px-1">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-home-text font-serif text-base md:text-2xl mb-1 group-hover:text-gold-primary transition-colors duration-300 truncate">
                    {product.name}
                  </h3>
                </Link>
                
                <p className="text-[8px] md:text-[10px] text-home-subtext uppercase tracking-widest mb-2 md:mb-3 opacity-60">
                  {product.category}
                </p>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-gold-primary font-medium tracking-widest text-xs md:text-sm">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIEW ALL CTA */}
        <div className="mt-12 md:mt-20 text-center">
          <Link to="/products" className="text-[10px] uppercase tracking-[0.3em] text-home-text border-b border-gold-primary/30 pb-1 hover:border-gold-primary hover:text-gold-primary transition-all">
            View Full Collection
          </Link>
        </div>
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}
