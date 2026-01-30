import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// --- TYPES ---
export interface CartItem {
    id: number;
    name: string;
    variant?: string;
    price: number;
    quantity: number;
    image: string;
    category?: string;
    brand?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: any, quantity: number) => void;
    updateQuantity: (id: number, delta: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    cartCount: number;
}

// --- CONTEXT ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- PROVIDER ---
export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        // Load cart from localStorage on initial mount
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (product: any, quantity: number) => {
        setCartItems((prev) => {
            // Check if item already exists in cart
            const existingItem = prev.find((item) => item.id === product.id);

            if (existingItem) {
                // Update quantity if item exists
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Add new item to cart
                const newItem: CartItem = {
                    id: product.id,
                    name: product.name,
                    variant: product.category || "Extrait de Parfum",
                    price: Number(product.price),
                    quantity: quantity,
                    image: getProductImage(product),
                    category: product.category,
                    brand: product.brand,
                };
                return [...prev, newItem];
            }
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    };

    const removeItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// --- HOOK ---
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

// --- HELPER ---
function getProductImage(product: any): string {
    if (!product) return "";
    const primaryImage = product.images?.find((img: any) => img.is_primary);
    if (primaryImage?.image_url) return primaryImage.image_url;
    if (product.images?.[0]?.image_url) return product.images[0].image_url;
    if (product.image_url) return product.image_url;
    return "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800&auto=format&fit=crop";
}
