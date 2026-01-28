import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { PiPenNib, PiCalendar, PiArrowRight } from "react-icons/pi";
import Navbar from "~/components/home/Navbar";
import { getBlogs } from "~/lib/api";

export default function Journal() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getBlogs();
      // Handle Django pagination (results array) or standard list
      const results = Array.isArray(data) ? data : (data.results || []);
      setBlogs(results);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-primary font-bold mb-6">
            The Olfactory Journal
          </p>
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Stories from <span className="italic text-gold-primary">Marrakesh</span>
          </h1>
          <p className="text-home-subtext max-w-lg mx-auto font-light leading-relaxed">
            Notes on ingredients, rituals, and the art of perfumery.
          </p>
        </div>

        {/* Loading */}
        {loading && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1,2,3].map(i => <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />)}
           </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {!loading && blogs.length === 0 && (
          <div className="text-center py-20 border border-white/5">
            <p className="text-home-subtext font-serif italic text-2xl">The journal is currently silent.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// --- BLOG CARD COMPONENT ---
function BlogCard({ blog }) {
  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Link to={`/journal/${blog.id}`} className="group block">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col h-full"
      >
        {/* Image / Cover */}
        <div className="aspect-[16/10] overflow-hidden bg-home-text/5 mb-8 relative border border-white/5">
          {blog.image ? (
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            // Fallback purely decorative "No Image" state
            <div className="w-full h-full flex items-center justify-center bg-neutral-900">
               <PiPenNib className="text-4xl text-gold-primary/20" />
            </div>
          )}
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-home-bg/90 backdrop-blur px-4 py-2 border border-gold-primary/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-primary">
              {formatDate(blog.created_at || blog.created)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-3xl font-serif leading-tight mb-4 group-hover:text-gold-primary transition-colors duration-300">
            {blog.title}
          </h3>
          
          <p className="text-home-subtext font-light text-sm leading-relaxed mb-8 line-clamp-3">
            {blog.content || blog.body} {/* Adjust based on your serializer fields */}
          </p>

          <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white group-hover:text-gold-primary transition-colors">
            Read Article <PiArrowRight />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}