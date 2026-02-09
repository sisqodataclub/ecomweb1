// 1. DEFINE THE BASE URL
export const API_BASE = import.meta.env.VITE_API_URL || "https://core.franciscodes.com";

/**
 * Helper to construct full image URLs.
 */
export const getImageUrl = (path) => {
  if (!path) return "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&auto=format&fit=crop";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};

/**
 * FETCH PRODUCTS (Public Access)
 * Fetches the list of products from the API.
 */
export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "X-Tenant": "web" // ✅ FIXED: Added Tenant Header
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    // ✅ FIXED: Handle Django Pagination vs List
    let rawResults = [];
    if (data.results && Array.isArray(data.results)) {
      rawResults = data.results;
    } else if (Array.isArray(data)) {
      rawResults = data;
    }

    // ✅ FIXED: Map data to match what your ProductGrid expects
    return rawResults.map(item => {
      // Replicating your "getProductImage" logic here so it's reusable
      let mainImage = null;
      const primaryImgObj = item.images?.find(img => img.is_primary);

      if (primaryImgObj?.image_url) mainImage = primaryImgObj.image_url;
      else if (item.images?.[0]?.image_url) mainImage = item.images[0].image_url;
      else if (item.image_url) mainImage = item.image_url;

      return {
        id: item.id,
        name: item.name,
        // Use category for filtering (Men/Women/Unisex)
        category: item.category || "Unisex",
        price: item.price,
        // Pre-process the image URL here
        image: getImageUrl(mainImage),
        // Pass raw images array if needed for galleries
        images: item.images || [],
        sku: item.sku,
        description: item.description
      };
    });

  } catch (error) {
    console.error("API Error (getProducts):", error);
    return [];
  }
}

/**
 * FETCH BOOKINGS (Private Access)
 */
export async function getBookings() {
  try {
    const url = `${API_BASE}/api/booking/`;
    const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
        "X-Tenant": "web"
      },
    });

    if (res.status === 401) throw new Error("Unauthorized: Please log in.");
    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

/**
 * FETCH BLOGS
 */
export async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Tenant": "web"
      },
    });

    if (!res.ok) throw new Error(`Error fetching blogs: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

/**
 * CREATE CHECKOUT SESSION
 */
export async function createCheckoutSession(cartItems, userEmail, isGift = false) {
  try {
    const response = await fetch(`${API_BASE}/api/payments/bookings/create_checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tenant": "web",
      },
      body: JSON.stringify({
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          // Only send variant if it exists and is meaningful
          variant: item.variant && item.variant !== "Extrait de Parfum" ? item.variant : null
        })),
        customer_email: userEmail || "guest@example.com",
        is_gift: isGift,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Checkout failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Payment Error:", error);
    throw error;
  }
}
