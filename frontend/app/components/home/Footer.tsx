import { motion } from "framer-motion";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const EMAIL = "equivaiconic.uk@gmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/equiva_iconic_uk_?igsh=MWR2NnkzZ25zb2w5MQ==";

  return (
    <footer className="bg-black border-t border-yellow-900/30 pt-20 pb-10 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 mb-16">
          {/* Contact & Support Section with Icons */}
          <div className="text-center">
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Contact & Support</h4>
            <ul className="flex flex-col gap-4 text-gray-500 text-sm font-light mb-8">
              <FooterLink label="Contact Us" href="/about" />
              <FooterLink label="Shipping & Returns" href="/about" />
              <FooterLink label="Terms" href="/tc" />
            </ul>
            <div className="flex justify-center gap-4 text-yellow-600">
              {/* Email Icon */}
              <SocialIcon 
                Icon={FaEnvelope} 
                href={`mailto:${EMAIL}`} 
                label="Email Us"
              />
              {/* Instagram Icon */}
              <SocialIcon 
                Icon={FaInstagram} 
                href={INSTAGRAM_URL} 
                label="Follow us on Instagram"
                isExternal
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-yellow-900/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-gray-600">
          <p>© 2026 Data Club Center. All Rights Reserved.</p>
          <div className="flex gap-6">
            {/* Social handles text could go here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Updated SocialIcon to handle real links
function SocialIcon({ Icon, href, label, isExternal }: { Icon: any, href: string, label: string, isExternal?: boolean }) {
  return (
    <a 
      href={href} 
      aria-label={label}
      // target="_blank" and rel="noopener noreferrer" ensure it opens in a new tab/app securely
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : ""}
      className="w-10 h-10 rounded-full border border-yellow-900/30 flex items-center justify-center hover:bg-yellow-600/10 hover:border-yellow-500 transition-all duration-300"
    >
      <Icon size={16} />
    </a>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <a href={href} className="hover:text-yellow-500 transition-colors duration-300">
        {label}
      </a>
    </li>
  );
}
