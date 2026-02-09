// app/root.tsx
// app/root.tsx
import "./app.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  // REPLACE THIS WITH YOUR ACTUAL ID FROM GOOGLE
  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

  useEffect(() => {
    const handleTrackingClick = (e: any) => {
      const trackableElement = e.target.closest('[data-track-event]');
      if (trackableElement) {
        const eventName = trackableElement.getAttribute('data-track-event');
        const label = trackableElement.getAttribute('data-track-label');
        const sectionElement = e.target.closest('[data-track-section]');
        const section = sectionElement ? sectionElement.getAttribute('data-track-section') : 'global';

        console.log(`📡 Tracking: ${eventName} | Section: ${section} | Label: ${label}`);

        // Send to Google
        if (typeof window.gtag === 'function') {
          window.gtag('event', eventName, {
            'event_category': section,
            'event_label': label
          });
        }
      }
    };
    document.addEventListener('click', handleTrackingClick);
    return () => document.removeEventListener('click', handleTrackingClick);
  }, []);

  return (
    <html 
      lang="en" 
      data-theme-color="obsidian" 
      suppressHydrationWarning 
      style={{ colorScheme: 'dark', backgroundColor: '#050505' }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Set browser UI color to match Obsidian */}
        <meta name="theme-color" content="#050505" />
        <Meta />
        <Links />

        {/* --- GOOGLE ANALYTICS SCRIPT START --- */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `,
          }}
        />
        {/* --- GOOGLE ANALYTICS SCRIPT END --- */}
      </head>
      {/* FIXED: Changed bg-[#fdfcf8] to #050505 (Obsidian) 
          FIXED: Changed text-[#1a1a1a] to #f4f4f4 (Obsidian Text)
      */}
      <body className="bg-[#050505] text-[#f4f4f4] min-h-screen" suppressHydrationWarning>
        <CartProvider>
          <Outlet />
        </CartProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
