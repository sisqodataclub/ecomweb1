import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiTrash,
  PiMinus,
  PiPlus,
  PiShoppingBag,
  PiEnvelopeSimple
} from "react-icons/pi";
import { Link } from "react-router"; 
import Navbar from "~/components/home/Navbar";
import { useCart } from "~/contexts/CartContext";
import { createCheckoutSession } from "~/lib/api";

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState(""); // Track actual user email

  // Permanent obsidian theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-color", "obsidian");
  }, []);

  // --- LOGIC ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1 ? 0 : 25; 
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address for your order confirmation.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // ✅ Now passing the dynamic email state instead of a placeholder
      const { checkout_url } = await createCheckoutSession(
        cartItems,
        email 
      );

      if (checkout_url) {
        window.location.href = checkout_url;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (err: any) {
      console.error("Checkout detail:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg">
      <Navbar />

      <div className="pt-[160px] pb-20 container mx-auto px-6 max-w-6xl">
        {/* HEADER */}
        <header className="mb-12 md:mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-4"
          >
            Your <span className="text-shimmer italic">Basket</span>
          </motion.h1>
          <div className="h-[1px] w-20 bg-gold-primary/30 mx-auto" />
        </header>

        <AnimatePresence mode="wait">
          {cartItems.length === 0 ? (
            <EmptyCart key="empty" />
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24"
            >
              {/* LEFT COLUMN: ITEMS */}
              <div className="lg:col-span-2 space-y-8">
                <div className="border-t border-gold-primary/10">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdate={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT COLUMN: SUMMARY */}
              <div className="lg:col-span-1">
                <div className="sticky top-[140px] bg-home-bg/50 backdrop-blur-md border border-gold-primary/10 p-8 shadow-2xl shadow-gold-primary/5">
                  <h3 className="text-xl font-serif mb-8 flex items-center gap-2">
                    Summary
                  </h3>

                  {/* CUSTOM EMAIL INPUT - OBSIDIAN STYLE */}
                  <div className="mb-8 space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-home-subtext font-bold flex items-center gap-2">
                      <PiEnvelopeSimple className="text-sm" /> Contact Email
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-white/5 border border-gold-primary/20 p-4 text-sm text-home-text focus:outline-none focus:border-gold-primary transition-all duration-300 placeholder:text-home-subtext/30"
                      />
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-primary group-focus-within:w-full transition-all duration-500" />
                    </div>
                  </div>

                  <div className="space-y-4 text-xs uppercase tracking-widest text-home-subtext mb-8 border-b border-gold-primary/10 pb-8">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-home-text">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-gold-primary font-bold">Complimentary</span>
                      ) : (
                        <span className="text-home-text">£{shipping.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-sm uppercase tracking-widest font-bold">Total</span>
                    <span className="text-3xl font-serif text-gold-primary">£{total.toFixed(2)}</span>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-4 p-3 bg-red-950/20 border border-red-900/50 text-red-200 text-[10px] uppercase tracking-wider text-center"
                    >
                      {error}
                    </motion.div>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-5 bg-gold-primary text-home-bg text-xs uppercase tracking-[0.25em] font-bold hover:brightness-110 active:scale-[0.98] transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Establishing Secure Link..." : "Proceed to Checkout"}
                  </button>

                  <div className="text-center">
                    <p className="text-[10px] text-home-subtext/60 uppercase tracking-widest">
                      Secure Checkout • Global Delivery
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: EMPTY STATE ---
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center py-20 min-h-[50vh]"
    >
      <div className="w-24 h-24 rounded-full bg-home-text/5 flex items-center justify-center mb-8 border border-gold-primary/20">
        <PiShoppingBag className="text-4xl text-home-subtext" />
      </div>
      <h2 className="text-3xl md:text-4xl font-serif text-home-text mb-4 italic">
        Your collection is empty
      </h2>
      <p className="text-home-subtext text-sm max-w-md text-center leading-relaxed mb-10">
        Explore our olfactory library and discover the scent that speaks to your soul.
      </p>
      <Link
        to="/products"
        className="group relative px-10 py-4 bg-transparent border border-gold-primary/40 text-home-text text-[10px] uppercase tracking-[0.3em] font-black hover:border-gold-primary transition-all duration-500 overflow-hidden"
      >
        <span className="relative z-10 group-hover:text-home-bg transition-colors duration-500">
          Discover The Collection
        </span>
        <div className="absolute inset-0 bg-gold-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </Link>
    </motion.div>
  );
}

// --- SUB-COMPONENT: CART ITEM ROW ---
function CartItem({ item, onUpdate, onRemove }: any) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, overflow: "hidden" }}
      className="flex flex-row gap-4 md:gap-6 py-6 md:py-8 border-b border-gold-primary/10 group"
    >
      {/* Image */}
      <div className="w-24 md:w-32 aspect-[3/4] md:aspect-[4/5] bg-home-text/5 overflow-hidden relative shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1 md:mb-2">
            <h3 className="text-base md:text-xl font-serif text-home-text">{item.name}</h3>
            <span className="text-gold-primary font-bold text-sm md:text-lg">£{(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-home-subtext mb-4 md:mb-6">{item.variant}</p>
        </div>

        <div className="flex justify-between items-center md:items-end">
          {/* Quantity Controls */}
          <div className="flex items-center border border-home-text/10 hover:border-gold-primary/50 transition-colors w-24 md:w-32 h-8 md:h-10">
            <button
              onClick={() => onUpdate(item.id, -1)}
              className="p-2 md:p-3 hover:text-gold-primary transition-colors disabled:opacity-30 flex-1 flex justify-center"
              disabled={item.quantity <= 1}
            >
              <PiMinus className="text-[10px] md:text-xs" />
            </button>
            <span className="flex-1 text-center text-xs font-bold">{item.quantity}</span>
            <button
              onClick={() => onUpdate(item.id, 1)}
              className="p-2 md:p-3 hover:text-gold-primary transition-colors flex-1 flex justify-center"
            >
              <PiPlus className="text-[10px] md:text-xs" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-home-subtext hover:text-red-900 transition-colors opacity-60 hover:opacity-100"
          >
            <PiTrash className="text-sm" /> <span className="hidden md:inline">Remove</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
