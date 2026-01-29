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
            "X-Tenant": "web"
          }
        });

        const data = await response.json();
        console.log("📡 API Response Data:", data);

        let results = [];
        if (data.results && Array.isArray(data.results)) {
          results = data.results;
        } else if (Array.isArray(data)) {
          results = data;
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

  // ✅ Helper function to get product image
  const getProductImage = (product) => {
    // Priority 1: Primary image from images array
    const primaryImage = product.images?.find(img => img.is_primary);
    if (primaryImage?.image_url) return primaryImage.image_url;
    
    // Priority 2: First image from images array
    if (product.images?.[0]?.image_url) return product.images[0].image_url;
    
    // Priority 3: Main image_url field
    if (product.image_url) return product.image_url;
    
    // Priority 4: Fallback placeholder
    return "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&auto=format&fit=crop";
  };

  if (loading) {
    return (
      <div className="bg-home-bg py-32 text-center text-gold-primary italic">
        Loading Collection...
      </div>
    );
  }

  return (
    <section className="bg-home-bg py-20 px-6 relative z-10 min-h-[500px]">
      <div className="container mx-auto max-w-7xl">
        
        {products.length === 0 && (
          <div className="text-white text-center py-10 opacity-50">
            No products found. Add products in the admin panel.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-gold-primary/10">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  onError={(e) => {
                    console.error(`Failed to load image for ${product.name}:`, e.target.src);
                    e.target.src = "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&auto=format&fit=crop";
                  }}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <h3 className="text-gold-primary font-serif text-2xl mt-8 mb-2 italic">
                {product.name}
              </h3>
              <p className="text-home-text tracking-[0.2em] font-light">
                ${product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}