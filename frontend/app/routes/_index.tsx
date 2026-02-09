import { lazy, Suspense } from "react";
import Navbar from "~/components/home/Navbar";
import HomeContent from "~/components/home/HomeContent";

// --- LAZY LOADED COMPONENTS ---
// These are only downloaded when the user starts scrolling, 
// significantly speeding up the initial page load.
const Press = lazy(() => import("~/components/home/Press"));
const ProductGrid = lazy(() => import("~/components/home/ProductGrid"));
const FragranceNotes = lazy(() => import("~/components/home/FragranceNotes"));
const Footer = lazy(() => import("~/components/home/Footer"));

export default function Index() {
  return (
    // Updated bg-black to bg-[#050505] to match Obsidian exactly
    <main className="bg-[#050505] min-h-screen">
      <Navbar />

      {/* 1. Impactful Entrance - Loaded Immediately */}
      <HomeContent />

      {/* Suspense handles the loading state for the components below.
          The fallback is a simple black spacer to prevent layout shift.
      */}
      <Suspense fallback={<div className="h-20 bg-[#050505]" />}>
        
        {/* 2. Authority & Trust */}
        <Press />

        {/* 3. The Main Offering */}
        <ProductGrid />

        {/* 4. Educational Content */}
        <FragranceNotes />

        {/* 5. Personal Engagement (Placeholder for future use) */}

        {/* 6. Brand Story & Services (Placeholder for future use) */}

        <Footer />
      </Suspense>
    </main>
  );
}
