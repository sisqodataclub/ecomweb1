"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://core.franciscodes.com/api/products/", {
          headers: {
            "Accept": "application/json",
            "X-Tenant": "web.franciscodes.com" 
          }
        });
        
        const data = await response.json();
        
        // Target data.results because the Django backend uses pagination
        const results = data.results || (Array.isArray(data) ? data : []);
        setProducts(results);
      } catch (error) {
        console.error("Collection fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-home-bg py-32 text-center text-gold-primary italic animate-pulse">
        Loading Collection...
      </div>
    );
  }

  return (
    <section className="bg-home-bg py-20 md:py-32 px-6 transition-colors duration-1000 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-primary/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-home-text text-3xl md:text-5xl font-serif mb-6 italic"
          >
            Signature <span className="text-gold-primary not-italic">Collection</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gold-primary/40" 
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative flex flex-col items-center"
            >
              {/* Product Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-gold-primary/10 bg-black/5 shadow-xl transition-all duration-700 group-hover:border-gold-primary/30">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x500?text=Luxury+Fragrance"}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-80 md:grayscale md:opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100"
                />
                <div className="absolute inset-4 border border-gold-primary/0 transition-all duration-700 group-hover:border-gold-primary/10 pointer-events-none" />
              </div>

              {/* Product Info */}
              <div className="mt-8 text-center px-2">
                <h3 className="text-gold-primary font-serif text-xl md:text-2xl mb-2 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-home-subtext text-xs md:text-sm italic mb-4 opacity-70">
                  {product.brand || product.category || "Exquisite Fragrance"}
                </p>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-home-text font-light tracking-[0.2em] text-sm">
                    ${product.price}
                  </p>
                  
                  <button className="relative px-6 py-2 text-[10px] uppercase tracking-[0.3em] text-gold-primary border border-gold-primary/20 hover:border-gold-primary transition-all duration-500 cursor-pointer overflow-hidden group/btn">
                    <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-home-bg">
                      Add to Collection
                    </span>
                    <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fallback if no products are found */}
        {products.length === 0 && (
          <div className="text-center py-20 text-home-subtext italic opacity-50">
            Our latest collection is arriving soon.
          </div>
        )}
      </div>
    </section>
  );
}