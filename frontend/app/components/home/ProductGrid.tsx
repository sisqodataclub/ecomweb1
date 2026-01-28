"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // We use the full absolute URL of your backend
        // Your middleware identifies "web.franciscodes.com" automatically
        const response = await fetch("https://core.franciscodes.com/api/products/", {
            headers: {
                // IMPORTANT: If your backend is strict, you might need to pass the
                // origin or a custom header, but usually the 'Host' or 'Referer' works.
                "Accept": "application/json",
            }
        });
        
        const data = await response.json();
        
        // Handle DRF pagination (data.results) or direct list
        const results = Array.isArray(data) ? data : data.results || [];
        setProducts(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div className="py-20 text-center text-gold-primary">Loading...</div>;

  return (
    <section className="bg-home-bg py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group relative flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-gold-primary/10">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x500?text=Perfume"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-8 text-center px-2">
                <h3 className="text-gold-primary font-serif text-xl md:text-2xl mb-2">
                  {product.name}
                </h3>
                <p className="text-home-subtext text-xs italic mb-4">
                  {/* Showing category or brand as the "notes" */}
                  {product.brand || product.category}
                </p>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-home-text font-light tracking-widest">
                    ${product.price}
                  </p>
                  <button className="px-6 py-2 text-[10px] uppercase border border-gold-primary/20 hover:bg-gold-primary hover:text-black transition-all">
                    Add to Collection
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}