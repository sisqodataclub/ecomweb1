import { lazy, Suspense } from "react";
import Navbar from "~/components/home/Navbar";
import HomeContent from "~/components/home/HomeContent";
import SEO from "~/components/ui/SEO";

// --- LAZY LOADED COMPONENTS ---
const Press = lazy(() => import("~/components/home/Press"));
const ProductGrid = lazy(() => import("~/components/home/ProductGrid"));
const FragranceNotes = lazy(() => import("~/components/home/FragranceNotes"));
const Footer = lazy(() => import("~/components/home/Footer"));

export default function Index() {
  return (
    <main className="bg-[#050505] min-h-screen">
      {/* --- SEO: BRAND IDENTITY --- */}
      <SEO 
        title="Équiva Iconic | Presence. Without Permission."
        description="Exceptional recreations of the world's most iconic perfumes. Experience luxury extrait de parfums designed for those who command presence."
        schema={{
          "@context": "https://schema.org",
          "@type": "PerfumeStore",
          "name": "Équiva Iconic",
          "url": "https://www.equivaiconic.co.uk",
          "logo": "https://www.equivaiconic.co.uk/logo.png",
          "image": "https://www.equivaiconic.co.uk/master-og-obsidian.jpg",
          "description": "Luxury fragrance house specializing in high-concentration recreations of iconic scents.",
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "equivaiconic.uk@gmail.com",
            "contactType": "customer support"
          },
          "sameAs": [
            "https://www.instagram.com/equiva_iconic_uk_?igsh=MWR2NnkzZ25zb2w5MQ=="
          ]
        }}
      />

      {/* Force Obsidian Black Navbar */}
      <Navbar isDarkTheme={true} />

      {/* 1. Impactful Entrance - Loaded Immediately */}
      <HomeContent />

      {/* Suspense handles the loading state for the components below */}
      <Suspense fallback={<div className="h-20 bg-[#050505]" />}>
        
        {/* 2. Authority & Trust */}
        <Press />

        {/* 3. The Main Offering */}
        <ProductGrid />

        {/* 4. Educational Content */}
        <FragranceNotes />

        {/* 5. Personal Engagement (Placeholder) */}

        {/* 6. Brand Story & Services (Placeholder) */}

        <Footer />
      </Suspense>
    </main>
  );
}
