import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-900/30 pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 mb-16">
          {/* Contact & Support Section with Icons */}
          <div className="text-center">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Contact & Support</h4>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm font-light mb-8">
              {/* ✅ Updated links with specific paths */}
              <FooterLink label="Contact Us" href="/about" />
              <FooterLink label="Shipping & Returns" href="/about" />
              <FooterLink label="Terms" href="/tc" />
            </ul>
            <div className="flex justify-center gap-4 text-yellow-600">
              <SocialIcon Icon={FaEnvelope} />
              <SocialIcon Icon={FaInstagram} />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-yellow-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
          <p>© 2026 Data Club Center. All Rights Reserved.</p>
          <div className="flex gap-6">
            {/* Empty div from original snippet kept for layout/spacing if needed */}
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

// ✅ Updated component to accept 'href' prop
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a href={href} className="hover:text-yellow-500 transition-colors duration-300">
        {label}
      </a>
    </li>
  );
}
