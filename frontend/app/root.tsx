// app/root.tsx
import "./app.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useEffect } from "react";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      <body className="bg-[#fdfcf8] text-[#1a1a1a]" suppressHydrationWarning>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}