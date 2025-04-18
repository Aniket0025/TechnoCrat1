
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface AIRecommendationsProps {
  userPreferences?: string[];
  previousPurchases?: Array<any>;
  products: Array<any>;
  title?: string;
  description?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userPreferences = ["sustainable", "organic"],
  previousPurchases = [],
  products,
  title = "AI-Powered Recommendations",
  description = "Based on your preferences and shopping history"
}) => {
  
  // In a real app, this would be handled by a proper ML algorithm
  // Here we're just simulating recommendations with a simple filter
  const getRecommendedProducts = () => {
    // Placeholder for a more sophisticated algorithm
    // Ensure each product has a unique id for React keys and ProductCard
    if (!Array.isArray(products) || products.length === 0) return [];
    return products
      .map((product, idx) => ({
        ...product,
        id: product.id || product.name || `product-${idx}`
      }))
      .filter((product) => product && product.id && product.name && product.image && typeof product.price === 'number')
      .sort(() => Math.random() - 0.5);
  };

  const recommendedProducts = React.useMemo(() => getRecommendedProducts(), [products, userPreferences, previousPurchases]);

  const handleSaveProduct = () => {
    // Handle save product logic
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-green-500 mr-2" />
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            <TrendingUp className="h-3 w-3 mr-1" /> 
            AI-Powered
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
        
        {userPreferences && userPreferences.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-sm text-muted-foreground">Based on preferences: </span>
            {userPreferences.map((pref, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {pref}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <Carousel className="w-full">
          <CarouselContent>
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    {product && product.name && product.image ? (
                      <ProductCard
                        product={product}
                        onSave={handleSaveProduct}
                      />
                    ) : (
                      <div className="p-2 bg-yellow-100 text-xs text-gray-800 rounded border border-yellow-300">
                        <pre>{JSON.stringify(product, null, 2)}</pre>
                        <div className="text-red-500">Missing required fields for ProductCard</div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8 w-full">
                No recommendations available. Try searching for products or updating your preferences.
              </div>
            )}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-2">
            <CarouselPrevious className="static transform-none mx-0" />
            <CarouselNext className="static transform-none mx-0" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
