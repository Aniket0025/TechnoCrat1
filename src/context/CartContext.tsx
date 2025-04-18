// CartContext removed. File is now empty.
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import type { Product } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { getUserCart, setUserCart } from "@/services/orderStorage";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from Firestore on login
  useEffect(() => {
    if (user && user.uid) {
      console.log('[CartContext] User logged in:', user.uid);
      setLoading(true);
      try {
        const cart = getUserCart();
        console.log('[CartContext] Loaded cart from storage:', cart);
        setItems(cart);
      } catch (err) {
        console.error('[CartContext] Error loading cart from storage:', err);
      }
      setLoading(false);
    } else {
      console.log('[CartContext] User logged out or no user. Clearing local cart.');
      setItems([]);
    }
  }, [user]);

  // Sync cart to Firestore when items change (if logged in)
  useEffect(() => {
    if (user && user.uid && !loading) {
      console.log('[CartContext] Saving cart to storage for user', user.uid, items);
      try {
        setUserCart(items);
        console.log('[CartContext] Cart saved to storage successfully');
      } catch (err) {
        console.error('[CartContext] Error saving cart to storage:', err);
      }
    }
  }, [items, user, loading]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const increaseQty = (productId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, increaseQty, decreaseQty, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
