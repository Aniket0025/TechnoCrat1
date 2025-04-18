
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X } from "lucide-react";
import EcoBadge from "@/components/EcoBadge";

import type { Product } from "@/data/products";

interface ProductComparisonProps {
  originalProduct: Product;
  alternatives: Product[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ originalProduct, alternatives }) => {
  if (!originalProduct) return null;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Product Comparison</CardTitle>
        <p className="text-muted-foreground">
          Compare {originalProduct.name} with greener alternatives
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="space-y-2">
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
              <img 
                src={originalProduct.image} 
                alt={originalProduct.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-medium line-clamp-1">{originalProduct.name}</h3>
              <p className="text-muted-foreground text-sm">{originalProduct.brand}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold">{originalProduct.price}</span>
                <div className="flex items-center">
                  <span className="mr-1 text-sm">Eco-Score:</span>
                  <span className="font-bold">{originalProduct.ecoScore}/10</span>
                </div>
              </div>
            </div>
          </div>
          
          {alternatives.slice(0, 2).map((alt) => (
            <div key={alt.id} className="space-y-2">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative">
                <img 
                  src={alt.image} 
                  alt={alt.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-green-500/10 border-2 border-green-500 rounded-md"></div>
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                  Recommended
                </div>
              </div>
              <div>
                <h3 className="font-medium line-clamp-1">{alt.name}</h3>
                <p className="text-muted-foreground text-sm">{alt.brand}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">{alt.price}</span>
                  <div className="flex items-center">
                    <span className="mr-1 text-sm">Eco-Score:</span>
                    <span className="font-bold text-green-500">{alt.ecoScore}/10</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Features</TableHead>
                <TableHead>{originalProduct.name}</TableHead>
                {alternatives.slice(0, 2).map((alt) => (
                  <TableHead key={alt.id}>{alt.name}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Price</TableCell>
                <TableCell>{originalProduct.price}</TableCell>
                {alternatives.slice(0, 2).map((alt) => (
                  <TableCell key={`price-${alt.id}`}>{alt.price}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Materials</TableCell>
                <TableCell>{originalProduct.materials}</TableCell>
                {alternatives.slice(0, 2).map((alt) => (
                  <TableCell key={`materials-${alt.id}`}>{alt.materials}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>
            View All Alternatives <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductComparison;
