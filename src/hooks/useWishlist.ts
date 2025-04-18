import { useState, useEffect } from "react";
import type { Product } from "@/data/products";

const WISHLIST_KEY = "ecocart_wishlist";

export function useWishlist(userId: string | undefined) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    if (!userId) return;
    const data = localStorage.getItem(WISHLIST_KEY + userId);
    if (data) setWishlist(JSON.parse(data));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(WISHLIST_KEY + userId, JSON.stringify(wishlist));
  }, [wishlist, userId]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isWishlisted };
}
