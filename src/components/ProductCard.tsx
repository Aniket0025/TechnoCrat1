
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Info } from "lucide-react";
import EcoBadge from "@/components/EcoBadge";

import type { Product } from "@/data/products";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
  onSave?: () => void;
  onShowAlternative?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSave, onShowAlternative }) => {

  const { user } = useAuth();
  const navigate = useNavigate();



  if (!product || !product.name || !product.image) {
    return null;
  }
  try {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-60 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 shadow-sm hover:bg-white dark:hover:bg-gray-700"
            onClick={async () => {
              if (!user) {
                toast({
                  title: "Login required",
                  description: "Please login to add items to your wishlist.",
                  variant: "destructive",
                });
                setTimeout(() => navigate("/auth/login"), 0);
                return;
              }
              // Import setUserWishlist and getUserWishlist dynamically to avoid SSR issues
              const { setUserWishlist, getUserWishlist } = await import("@/services/firestore");
              const current = await getUserWishlist(user.uid);
              // Avoid duplicates by product id or name
              const already = current.find((p: any) => p.id === product.id || p.name === product.name);
              if (!already) {
                await setUserWishlist(user.uid, [...current, product]);
                toast({
                  title: "Saved to Wishlist",
                  description: `${product.name} added to your wishlist!`,
                });
              } else {
                toast({
                  title: "Already in Wishlist",
                  description: `${product.name} is already in your wishlist!`,
                });
              }
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          <span
            className={
              product.ecoScore >= 80
                ? "bg-green-500 text-white px-2 py-1 rounded text-xs"
                : product.ecoScore >= 50
                ? "bg-yellow-400 text-white px-2 py-1 rounded text-xs"
                : "bg-red-500 text-white px-2 py-1 rounded text-xs"
            }
            title={`Eco Score: ${product.ecoScore}/100`}
          >
            Eco Score: {product.ecoScore}
          </span>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.brand || 'Unknown Brand'}</CardDescription>
      </CardHeader>
      <div className="flex gap-2 flex-wrap px-4 pb-2">
        {(product.materials && product.materials.length > 0) ? (
          product.materials.map((mat, i) => (
            <EcoBadge key={"mat-"+i} type={mat} />
          ))
        ) : (
          <span className="text-xs text-gray-400">No materials</span>
        )}
        {(product.certifications && product.certifications.length > 0) ? (
          product.certifications.map((cert, i) => (
            <EcoBadge key={"cert-"+i} type={cert} />
          ))
        ) : (
          <span className="text-xs text-gray-400">No certifications</span>
        )}
        {(product.badges && product.badges.length > 0) ? (
          product.badges.map((badge, i) => (
            <EcoBadge key={"badge-"+i} type={badge} />
          ))
        ) : (
          <span className="text-xs text-gray-400">No badges</span>
        )}
        {(product.sustainabilityTags && product.sustainabilityTags.length > 0) ? (
          product.sustainabilityTags.map((tag, i) => (
            <EcoBadge key={"tag-"+i} type={tag} />
          ))
        ) : (
          <span className="text-xs text-gray-400">No tags</span>
        )}
      </div>
      
      <CardContent className="pb-3">
        <div className="text-lg font-bold mb-2">₹{typeof product.price === 'number' ? product.price : 'N/A'}</div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 items-start">
        <div className="flex w-full justify-between items-center">
          <span className="text-lg font-bold">₹{product.price}</span>
          <Button variant="outline" size="sm" onClick={() => onShowAlternative?.(product)}>
            <Info className="h-4 w-4 mr-1" /> Greener Alternative
          </Button>
        </div>
      </CardFooter>
    </Card>
    );
  } catch (err) {
    console.error('Error rendering ProductCard:', err, product);
    return (
      <div style={{ color: 'red', padding: 16, border: '1px solid red', margin: 8 }}>
        Error rendering product card. Check console for details.
      </div>
    );
  }
};

export default ProductCard;
