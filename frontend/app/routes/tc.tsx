import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PiScroll, PiShieldCheck, PiPackage, PiCreditCard, PiClockCounterClockwise, PiGlobe, PiLock, PiWarningCircle, PiEnvelope, PiInfo, PiCheckCircle, PiQuestion } from "react-icons/pi";
import { Link } from "react-router";

// !!! IMPORTS !!!
import Navbar from "~/components/home/Navbar";
import GrainOverlay from "~/components/ui/GrainOverlay";

// --- SEO: STRUCTURED DATA (JSON-LD) ---
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions | Équiva Iconic",
  "url": "https://web.franciscodes.com/terms",
  "description": "Legal terms, conditions, and 14-day return policy for Équiva Iconic luxury perfumes. UK-based premium fragrance brand.",
  "publisher": {
    "@type": "Brand",
    "name": "Équiva Iconic",
    "url": "https://web.franciscodes.com"
  }
};

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  }
};

export default function TermsConditions() {
  const containerRef = useRef(null);
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Quick navigation sections
  const sections = [
    { id: "general", title: "General Terms", icon: PiScroll },
    { id: "orders", title: "Orders & Payments", icon: PiCreditCard },
    { id: "returns", title: "14-Day Return Policy", icon: PiClockCounterClockwise },
    { id: "shipping", title: "Shipping & Delivery", icon: PiPackage },
    { id: "privacy", title: "Privacy & Data", icon: PiLock },
    { id: "liability", title: "Liability", icon: PiWarningCircle },
    { id: "contact", title: "Contact", icon: PiEnvelope },
  ];

  return (
    <article ref={containerRef} className="min-h-screen bg-home-bg text-home-text font-sans selection:bg-gold-primary selection:text-home-bg relative transition-colors duration-1000" data-theme-color="obsidian">
      
      {/* --- SEO: INJECT SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 0. GLOBAL TEXTURE LAYER */}
      <GrainOverlay />

      {/* 1. NAVBAR */}
      <Navbar />

      {/* --- 2. HERO SECTION --- */}
      <header className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-home-text/5 to-home-bg z-0" />

        {/* Cinematic Spotlight */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[60vh] bg-gradient-to-b from-gold-primary via-transparent to-transparent z-10"
        />

        {/* MAIN CONTENT */}
        <div className="relative z-20 container mx-auto px-6 flex flex-col items-center gap-10">
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl flex flex-col items-center"
          >
            {/* 1. Tagline */}
            <motion.p variants={fadeUp} className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-gold-primary mb-8 font-bold opacity-80">
              Legal Framework
            </motion.p>
            
            {/* 2. Main Title */}
            <motion.h1 
              variants={fadeUp} 
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-home-text mb-4 leading-[0.9] tracking-tighter"
            >
              Terms & <span className="text-gold-primary italic">Conditions</span>
            </motion.h1>

            {/* 3. Sub-Headline */}
            <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-light text-home-text/60 mb-8 tracking-wide font-serif max-w-2xl">
              The legal foundation for your journey with Équiva Iconic.
              <br />Transparency, protection, and luxury service.
            </motion.h2>
            
            {/* 4. Divider */}
            <motion.div variants={fadeUp} className="h-12 w-[1px] bg-gold-primary/30 mx-auto mb-8" />
            
            {/* 5. Brand Assurance */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 text-gold-primary">
              <PiShieldCheck className="text-2xl" />
              <p className="text-sm uppercase tracking-widest font-medium">
                UK Consumer Rights Protected | 14-Day Return Policy | GDPR Compliant
              </p>
            </motion.div>
          </motion.div>
        </div>
      </header>
      {/* --- 3. QUICK NAVIGATION ASIDE (STICKY DESKTOP / TOGGLE MOBILE) --- */}
      <aside className="fixed md:sticky md:top-20 z-40 md:left-6 md:transform-none bottom-6 right-6 md:bottom-auto md:right-auto transition-all duration-300">
        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setIsAsideOpen(!isAsideOpen)}
          className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold-primary text-home-bg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
          aria-label="Toggle navigation"
        >
          {isAsideOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Aside Panel */}
        <div className={`          ${isAsideOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 md:translate-x-0 md:opacity-100'}
          fixed md:relative inset-y-0 right-0 md:inset-auto
          w-64 md:w-auto h-screen md:h-auto
          bg-home-bg/95 md:bg-home-bg/80 backdrop-blur-lg md:backdrop-blur-md
          border-l border-gold-primary/20 md:border-y md:border-gold-primary/20
          p-6 md:p-4
          transition-all duration-300 ease-out
          overflow-y-auto md:overflow-visible
        `}>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-4 md:gap-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setIsAsideOpen(false)}
                  className="group flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest text-home-subtext hover:text-gold-primary transition-colors duration-300 border border-transparent hover:border-gold-primary/30 rounded-lg"
                >
                  <Icon className="text-base group-hover:scale-110 transition-transform" />
                  <span>{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </aside>

      <main>


        {/* SECTION 1: GENERAL TERMS */}
        <motion.section 
          id="general"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiScroll className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">1. General Terms</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Acceptance of Terms</h3>
                <p>
                  By accessing and using this website, you accept and agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use immediately.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Modifications</h3>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective upon posting. Your continued use constitutes acceptance of the updated terms.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Eligibility</h3>
                <p>
                  You must be at least 18 years old to use our website. By using the site, you represent that you meet this age requirement and have legal capacity to enter into agreements.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Account Responsibility</h3>
                <p>
                  If you create an account, you are responsible for maintaining confidentiality of your credentials and for all activities under your account. Notify us immediately of unauthorized use.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: ORDERS & PAYMENTS */}
        <motion.section 
          id="orders"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiCreditCard className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">2. Orders & Payments</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Order Process</h3>
                <p>
                  Orders are processed upon successful payment. You will receive an order confirmation email with details. We reserve the right to refuse or cancel any order at our discretion.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Payment Methods</h3>
                <p>
                  We accept major credit/debit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through encrypted gateways.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Pricing & Taxes</h3>
                <p>
                  Prices are in GBP (£) and include VAT where applicable. Shipping costs are calculated at checkout. We reserve the right to adjust prices due to market changes or errors.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Order Confirmation</h3>
                <p>
                  Your order is confirmed once payment is authorized. If payment fails, your order will not be processed. Contact support if you receive a payment error.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Cancellation Policy</h3>
                <p>
                  Orders can be cancelled within 1 hour of placement if not yet shipped. Contact us immediately. Once shipped, standard return policy applies.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

{/* SECTION 4: SHIPPING & DELIVERY */}
        <motion.section 
          id="shipping"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiPackage className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">4. Shipping & Delivery</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Shipping Regions</h3>
                <p>
                  We currently ship within the United Kingdom. International shipping may be available for select regions; please contact us for inquiries.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Delivery Times</h3>
                <p>
                  Standard delivery: 3-5 business days. Express delivery: 1-2 business days (additional fee). Orders placed after 2 PM GMT will be processed the next business day.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Shipping Costs</h3>
                <p>
                  Free standard shipping on orders over £100. Express shipping costs £9.99. Shipping costs are calculated at checkout based on weight and destination.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Order Tracking</h3>
                <p>
                  Once your order ships, you will receive a tracking number via email. You can track your package through our carrier's website.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Delivery Issues</h3>
                <p>
                  If you experience any issues with delivery, please contact us within 7 days of expected delivery. We will work with the carrier to resolve the issue.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: PRIVACY & DATA */}
        <motion.section 
          id="privacy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiLock className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">5. Privacy & Data</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Data Collection</h3>
                <p>
                  We collect personal data necessary for order processing, customer service, and marketing (with consent). For details, please see our Privacy Policy.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect your data. All sensitive information is encrypted during transmission and storage.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Third-Party Sharing</h3>
                <p>
                  We do not sell your personal data. We may share data with trusted partners (e.g., payment processors, shipping carriers) only for order fulfillment.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Your Rights</h3>
                <p>
                  Under GDPR, you have the right to access, correct, or delete your personal data. Contact us at privacy@equivaiconic.com to exercise these rights.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 6: LIABILITY */}
        <motion.section 
          id="liability"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiWarningCircle className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">6. Liability</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Product Use</h3>
                <p>
                  Our fragrances are for external use only. Discontinue use if irritation occurs. Keep out of reach of children. We are not liable for misuse or allergic reactions.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Website Content</h3>
                <p>
                  While we strive for accuracy, we do not warrant that product descriptions or other content on the site is error-free. We reserve the right to correct errors.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Limitation of Liability</h3>
                <p>
                  Équiva Iconic shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Governing Law</h3>
                <p>
                  These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 7: CONTACT */}
        <motion.section 
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <PiEnvelope className="text-3xl text-gold-primary" />
            <h2 className="text-3xl font-serif text-home-text">7. Contact</h2>
          </div>
          
          <div className="obsidian-glass p-8 border border-gold-primary/10 rounded-lg">
            <div className="space-y-6 text-home-subtext leading-relaxed">
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Customer Service</h3>
                <p>
                  For questions about orders, returns, or general inquiries, please email us at support@equivaiconic.com. We aim to respond within 24 hours.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Legal Inquiries</h3>
                <p>
                  For legal matters, please contact legal@equivaiconic.com. All legal correspondence must be in writing and sent to our registered office.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Registered Office</h3>
                <p>
                  Équiva Iconic Ltd.<br />
                  123 Luxury Lane<br />
                  London, W1K 7TN<br />
                  United Kingdom
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-home-text">Effective Date</h3>
                <p>
                  These terms are effective as of January 1, 2024. Last updated: February 8, 2024.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-gold-primary/20 text-center text-home-subtext text-sm">
        <div className="container mx-auto px-6">
          <p className="mb-4">
            By using our website, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
          </p>
          <p>
            © 2024 Équiva Iconic. All rights reserved. | <Link to="/privacy" className="text-gold-primary hover:underline">Privacy Policy</Link> | <Link to="/contact" className="text-gold-primary hover:underline">Contact Us</Link>
          </p>
        </div>
      </footer>
    </article>
  );
}
