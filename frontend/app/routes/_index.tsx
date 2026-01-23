import Navbar from "~/components/home/Navbar";
import HomeContent from "~/components/home/HomeContent";
import Press from "~/components/home/Press"; 
import ProductGrid from "~/components/home/ProductGrid";
import FragranceNotes from "~/components/home/FragranceNotes";
import FragranceQuiz from "~/components/home/FragranceQuiz";
import Gifting from "~/components/home/Gifting";
import Footer from "~/components/home/Footer";

export default function Index() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      {/* 1. Impactful Entrance */}
      <HomeContent />
      
      {/* 2. Authority & Trust */}
      <Press />
      
      {/* 3. The Main Offering */}
      <ProductGrid />
      
      {/* 4. Educational Content */}
      <FragranceNotes />
      
      {/* 5. Personal Engagement */}
      <FragranceQuiz />
      
      {/* 6. Brand Story & Services */}
      <Gifting />
      
      <Footer />
    </main>
  );
}