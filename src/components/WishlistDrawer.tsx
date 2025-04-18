import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/components/ProtectedRoute";
import { useWishlist } from "@/hooks/useWishlist";
import type { Product } from "@/data/products";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.uid || "guest";
  const { wishlist, removeFromWishlist } = useWishlist(userId);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 border-l border-gray-200 dark:border-gray-700 ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold text-green-700 dark:text-green-300">💚 Wishlist</h2>
        <Button variant="ghost" size="icon" aria-label="Close Wishlist" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-5 w-5 text-gray-700 dark:text-gray-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto bg-white dark:bg-gray-900">
        {wishlist.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center mt-12">Wishlist is empty</div>
        ) : (
          <ul className="space-y-4">
            {wishlist.map((item: Product) => (
              <li key={item.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-300">₹{item.price}</div>
                </div>
                <Button size="sm" variant="destructive" onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col gap-2">
        <Button className="w-full" disabled={wishlist.length === 0} onClick={() => { onClose(); navigate("/wishlist"); }}>
          Go to Wishlist Page
        </Button>
      </div>
    </div>
  );
};

export default WishlistDrawer;
