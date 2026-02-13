import { motion } from "framer-motion";
import { PiCheckCircle, PiPackage, PiArrowRight } from "react-icons/pi";
import { Link } from "react-router";
import Navbar from "~/components/home/Navbar";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-home-bg text-home-text font-sans">
      <Navbar />
      <div className="pt-[200px] pb-20 container mx-auto px-6 flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-24 h-24 bg-gold-primary/10 rounded-full flex items-center justify-center mb-8 border border-gold-primary/20"
        >
          <PiCheckCircle className="text-5xl text-gold-primary" />
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif mb-6"
        >
          Order <span className="text-shimmer italic">Confirmed</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-home-subtext max-w-md leading-relaxed mb-12 uppercase tracking-widest text-[10px]"
        >
          Thank you for choosing Equiva Iconic. Your olfactory journey has begun. 
          A confirmation email will arrive in your inbox shortly.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6"
        >
          <Link
            to="/account/orders"
            className="flex items-center gap-3 px-8 py-4 bg-gold-primary text-home-bg text-[10px] uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all"
          >
            <PiPackage className="text-lg" /> Track Order
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-8 py-4 border border-gold-primary/30 text-home-text text-[10px] uppercase tracking-[0.2em] font-bold hover:border-gold-primary transition-all"
          >
            Return Home <PiArrowRight />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
