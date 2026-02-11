import { useLocation } from "react-router";

interface SEOProps {
  title?: string;
  description?: string;
  schema?: object;
  image?: string;
}

export default function SEO({ 
  title = "Équiva Iconic | Luxury Fragrance House", 
  description = "Artisanal distillations sourced from the High Atlas. Presence without permission. Experience the iconic collection of Équiva Iconic.", 
  schema,
  image = "https://www.equivaiconic.co.uk/master-og-obsidian.jpg" 
}: SEOProps) {
  const { pathname } = useLocation();
  const url = `https://www.equivaiconic.co.uk${pathname}`;

  // Updated Master Brand Schema with your verified links
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "Équiva Iconic",
    "url": "https://www.equivaiconic.co.uk",
    "logo": "https://www.equivaiconic.co.uk/logo3.png",
    "description": "High-end artisanal fragrance brand specializing in rare Atlas distillations.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "equivaiconic.uk@gmail.com",
      "contactType": "customer support"
    },
    "sameAs": [
      "https://www.instagram.com/equiva_iconic_uk_?igsh=MWR2NnkzZ25zb2w5MQ=="
    ]
  };

  return (
    <>
      {/* --- STANDARD META --- */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* --- OPEN GRAPH (WhatsApp, Instagram, FB) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* --- TWITTER / X --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* --- STRUCTURED DATA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify(schema || defaultSchema) 
        }}
      />
    </>
  );
}
