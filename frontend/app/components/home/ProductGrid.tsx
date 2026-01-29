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
        console.log("DEBUG: Data received:", data); // Check console for this!
        
        const results = data.results || (Array.isArray(data) ? data : []);
        setProducts(results);
      } catch (error) {
        console.error("DEBUG: Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="py-20 text-center text-gold-primary">Loading...</div>;

  return (
    <section className="bg-home-bg py-20 px-6 relative z-10 min-h-[500px]">
      <div className="container mx-auto max-w-7xl">
        
        {/* 🔥 DEBUG COUNTER: If this says 0, the API is empty. If it says 2, CSS is hiding them */}
        <div className="text-white text-center mb-10">
          Backend Found: {products.length} Products
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center border border-white/10 p-4">
               <img
                  src={product.image_url || "https://via.placeholder.com/400x500"}
                  alt={product.name}
                  className="w-full h-auto"
                />
                <h3 className="text-gold-primary text-xl mt-4">{product.name}</h3>
                <p className="text-white">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}