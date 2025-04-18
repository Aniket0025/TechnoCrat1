import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getUserWishlist } from "@/services/firestore";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getUserWishlist(user.uid).then((items) => {
      setWishlist(items || []);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="flex flex-col items-center py-10">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>❤️ My Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-gray-500">Loading wishlist...</div>
          ) : wishlist.length === 0 ? (
            <div className="text-gray-500">No items in your wishlist.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id || product.name} product={product} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Wishlist;
