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
          method: "GET",
          headers: {
            "Accept": "application/json",
            "X-Tenant": "web.franciscodes.com"
          }
        });

        const data = await response.json();
        console.log("📡 API Response Data:", data);

        // Flexible data extraction
        let results = [];
        if (data.results && Array.isArray(data.results)) {
          results = data.results; // Standard DRF Pagination
        } else if (Array.isArray(data)) {
          results = data; // Non-paginated list
        } else if (data.data && Array.isArray(data.data)) {
          results = data.data; // Alternative wrapper
        }

        setProducts(results);
      } catch (error) {
        console.error("❌ Collection fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="bg-home-bg py-32 text-center text-gold-primary italic">Loading Collection...</div>;

  return (
    <section className="bg-home-bg py-20 px-6 relative z-10 min-h-[500px]">
      <div className="container mx-auto max-w-7xl">
        
        {/* If products.length is 0, this will show us why */}
        {products.length === 0 && (
          <div className="text-white text-center py-10 opacity-50">
             Connected to Backend, but no products were returned for web.franciscodes.com
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-gold-primary/10">
                <img
                  src={product.image_url || "https://via.placeholder.com/400x500"}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-gold-primary font-serif text-2xl mt-8 mb-2 italic">{product.name}</h3>
              <p className="text-home-text tracking-[0.2em] font-light">${product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}