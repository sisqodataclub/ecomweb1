import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-900/30 pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <h2 className="gold-foil text-3xl font-serif">AURUM</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Crafting timeless scents that bridge the gap between tradition and modernity. 
              Maison Aurum — Paris / London / Dubai.
            </p>
            <div className="flex gap-4 text-yellow-600">
              <SocialIcon Icon={FaInstagram} />
              <SocialIcon Icon={FaPinterestP} />
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaTwitter} />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Explore</h4>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm font-light">
              <FooterLink label="The Collection" />
              <FooterLink label="Fragrance Finder" />
              <FooterLink label="Our Heritage" />
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Concierge</h4>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm font-light">
              <FooterLink label="Contact Us" />
              <FooterLink label="Shipping & Returns" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="FAQ" />
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">The Inner Circle</h4>
            <p className="text-gray-500 text-sm mb-4">Join our list for exclusive releases.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-transparent border-b border-yellow-900/50 py-2 text-sm text-yellow-500 focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button className="absolute right-0 bottom-2 text-xs uppercase tracking-widest text-yellow-600 font-bold hover:text-yellow-400 cursor-pointer">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-yellow-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
          <p>© 2026 Maison Aurum. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-yellow-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon }: { Icon: any }) {
  return (
    <a href="#" className="w-8 h-8 rounded-full border border-yellow-900/30 flex items-center justify-center hover:bg-yellow-600/10 hover:border-yellow-500 transition-all duration-300">
      <Icon size={14} />
    </a>
  );
}

function FooterLink({ label }: { label: string }) {
  return (
    <li>
      <a href="#" className="hover:text-yellow-500 transition-colors duration-300">
        {label}
      </a>
    </li>
  );
}