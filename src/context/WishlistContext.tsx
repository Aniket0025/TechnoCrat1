import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getUserWishlist, setUserWishlist } from "@/services/firestore";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/data/products";

interface WishlistItem {
  id: string;
  product: Product;
}

interface WishlistContextProps {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    if (user && user.uid) {
      getUserWishlist(user.uid)
        .then((data) => setWishlist(data))
        .catch(() => setWishlist([]));
    } else {
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid) {
      setUserWishlist(user.uid, wishlist);
    }
  }, [wishlist, user]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.product.id === product.id)) return prev;
      return [...prev, { id: product.id, product }];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== id));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
