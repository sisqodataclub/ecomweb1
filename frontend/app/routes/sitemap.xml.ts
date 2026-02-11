import { getProducts } from "../lib/api";

export async function loader() {
  const products = await getProducts();
  const baseUrl = "https://www.equivaiconic.co.uk";

  // 1. Define your core brand pages
  const staticPages = [
    "",           // Homepage
    "/products",  // The Collection
    "/about",     // Brand Story
    "/tc",        // Legal
  ];

  // 2. Build the XML string
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${path === "" ? "daily" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`)
    .join("")}
  ${products
    .map((product: any) => `
  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`)
    .join("")}
</urlset>`.trim();

  // 3. Return as an XML Response
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
