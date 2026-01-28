import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiCalendar, PiClock, PiUser, PiCheckCircle, PiXCircle } from "react-icons/pi";
import Navbar from "~/components/home/Navbar";
import { getBookings } from "~/lib/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBookings();
        // Check if data is an array, or if it's nested like { results: [...] }
        const results = Array.isArray(data) ? data : (data.results || []);
        setBookings(results);
      } catch (err) {
        setError("Unable to retrieve reservation data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-home-bg text-home-text font-sans pt-32 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left border-b border-gold-primary/20 pb-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold-primary font-bold mb-4">
            Private Client Services
          </p>
          <h1 className="text-4xl md:text-6xl font-serif">
            Your <span className="italic text-gold-primary">Reservations</span>
          </h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 opacity-50">
            <div className="w-12 h-12 border-2 border-gold-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest">Retrieving Data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 border border-red-900/50 bg-red-900/10 text-center">
             <p className="text-red-400 font-serif text-xl mb-2">{error}</p>
             <p className="text-xs text-home-subtext">Please ensure you are logged in or check your connection.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-20 border border-white/5 bg-white/5">
            <p className="text-home-subtext font-serif italic text-2xl">No active reservations found.</p>
          </div>
        )}

        {/* Bookings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <BookingCard key={booking.id || index} booking={booking} />
          ))}
        </div>

      </div>
    </div>
  );
}

// --- CARD COMPONENT ---
function BookingCard({ booking }) {
  // NOTE: You need to adjust these fields (booking.date, booking.client_name) 
  // to match exactly what your API returns. Console.log(data) to check.
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group p-8 border border-gold-primary/10 bg-home-text/5 hover:border-gold-primary/40 hover:bg-home-text/10 transition-all duration-500 relative overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-primary/10 blur-[50px] group-hover:bg-gold-primary/20 transition-all" />

      {/* ID / Status */}
      <div className="flex justify-between items-start mb-6">
        <span className="text-[9px] uppercase tracking-widest opacity-50">
          REF: #{booking.id || "000"}
        </span>
        <StatusBadge status={booking.status || "Pending"} />
      </div>

      {/* Main Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <PiCalendar className="text-gold-primary text-lg" />
          <span className="font-serif text-lg">
             {/* Format this based on your API date format */}
             {booking.date || "Date Pending"}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <PiClock className="text-gold-primary text-lg" />
          <span className="text-sm text-home-subtext uppercase tracking-wider">
            {booking.time || "Time Pending"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <PiUser className="text-gold-primary text-lg" />
          <span className="text-sm text-home-subtext">
            {booking.name || "Client Name"}
          </span>
        </div>
      </div>

      {/* Action Line */}
      <div className="pt-6 border-t border-white/10 flex justify-between items-center">
         <span className="text-[10px] uppercase tracking-[0.2em] group-hover:text-gold-primary transition-colors">
           View Details
         </span>
         <div className="h-[1px] w-8 bg-gold-primary/50 group-hover:w-16 transition-all duration-500" />
      </div>
    </motion.div>
  );
}

// Helper to style status
function StatusBadge({ status }) {
  const isConfirmed = status.toLowerCase() === 'confirmed';
  return (
    <span className={`flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2 py-1 border ${isConfirmed ? 'text-green-400 border-green-900/50 bg-green-900/10' : 'text-amber-400 border-amber-900/50 bg-amber-900/10'}`}>
      {isConfirmed ? <PiCheckCircle /> : <PiClock />}
      {status}
    </span>
  )
}