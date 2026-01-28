// 1. DEFINE THE BASE URL
// Ensure this matches your backend's public URL
export const API_BASE = "https://api.franciscodes.com"; 

/**
 * Helper to construct full image URLs.
 * If the path is already a full URL (starts with http), return it.
 * Otherwise, prepend the API_BASE.
 */
export const getImageUrl = (path) => {
  if (!path) return "/a1.png"; // Default fallback image if null
  if (path.startsWith("http")) return path; 
  return `${API_BASE}${path}`;
};

/**
 * FETCH PRODUCTS (Public Access)
 * Fetches the list of products from the API.
 */
export async function getProducts() {
  try {
    // Note: Verify your backend URL is exactly /api/products/
    const res = await fetch(`${API_BASE}/api/products/`); 
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    
    const data = await res.json();
    
    // Map backend data to frontend structure
    return data.map(item => ({
      id: item.id,
      name: item.name, 
      category: item.category || "Unisex",
      gender: item.gender || "unisex",
      price: item.price,
      // Handle nested image objects or simple strings
      image: getImageUrl(item.image?.url || item.image), 
      hoverImage: getImageUrl(item.hoverImage?.url || item.hoverImage),
    }));

  } catch (error) {
    console.error("API Error (getProducts):", error);
    return []; 
  }
}

/**
 * FETCH BOOKINGS (Private Access)
 * Requires Authentication Token.
 */
export async function getBookings() {
  try {
    // Correct URL for the API endpoint (NOT dashboard-admin)
    const url = `${API_BASE}/api/booking/`; 

    // Retrieve token safely
    const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization is required if your view uses IsAuthenticated
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    // Check for HTML response (Login page redirect issue)
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Server returned HTML instead of JSON:", text.slice(0, 500));
      throw new Error("Server returned an HTML page. Please check your URL or Login status.");
    }

    if (res.status === 401) {
      throw new Error("Unauthorized: Please log in.");
    }

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return []; 
  }
}

/**
 * FETCH BLOGS (Public Read Access)
 * Uses IsAuthenticatedOrReadOnly on backend.
 */
export async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // No Authorization header needed for GET requests here
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching blogs: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}


