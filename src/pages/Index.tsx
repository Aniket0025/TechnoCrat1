
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Leaf, ArrowRight, Info, TrendingUp, User, Star, BookOpen, Sun, Moon, Sparkles, Brain } from "lucide-react";
import type { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import ProductCard from "@/components/ProductCard";
import EcoBadge from "@/components/EcoBadge";
import FeatureSection from "@/components/FeatureSection";
import ProductComparison from "@/components/ProductComparison";
import { useIsMobile } from "@/hooks/use-mobile";
import { sampleProducts, sampleAlternatives, ecoImpact } from "@/utils/sampleData";
import { fetchEcoProducts } from "@/services/productService";
import { Link } from "react-router-dom";
import EcoGuideChat from "@/components/EcoGuideChat";
import AIRecommendations from "@/components/AIRecommendations";
import { useAuth } from "@/components/ProtectedRoute";
import { useDarkMode } from "@/hooks/useDarkMode";
import UserProfileMenu from "@/components/UserProfileMenu";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchEcoProducts()
      .then((apiProducts) => {
        let mappedProducts: Product[] = [];
        if (Array.isArray(apiProducts) && apiProducts.length > 0) {
          mappedProducts = apiProducts.map((p: any, idx: number) => ({
            id: p.id || p.name || `product-${idx}`,
            name: (typeof p.title === 'string' && p.title.trim() && p.title.toLowerCase().indexOf('untitled product') === -1) ? p.title : (typeof p.name === 'string' && p.name.trim() && p.name.toLowerCase().indexOf('untitled product') === -1 ? p.name : `Eco Product ${idx+1}`),
            image: (typeof p.image === 'string' && p.image.trim() !== '' ? p.image : 'https://via.placeholder.com/300x300?text=No+Image'),
            price: typeof p.price === 'number' ? p.price : Number(p.price) || 0,
            materials: Array.isArray(p.materials) ? p.materials : [],
            brand: p.brand || '',
            certifications: Array.isArray(p.certifications) ? p.certifications : [],
            ecoScore: typeof p.ecoScore === 'number' ? p.ecoScore : 0,
            badges: Array.isArray(p.badges) ? p.badges : [],
            sustainabilityTags: Array.isArray(p.sustainabilityTags) ? p.sustainabilityTags : [],
          }));
        } else {
          mappedProducts = sampleProducts;
        }
        setAllProducts(mappedProducts);
        setProducts(mappedProducts);
      })
      .catch((err) => {
        console.error("Failed to fetch live products, falling back to sampleProducts", err);
        setAllProducts(sampleProducts);
        setProducts(sampleProducts);
      });
  }, []);
  const [alternatives, setAlternatives] = useState(sampleAlternatives);
  const [activeTab, setActiveTab] = useState("search");
  const [darkMode, handleDarkModeToggle] = useDarkMode();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Empty Search",
        description: "Please enter a product to search for.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Searching Products",
      description: `Finding sustainable options for "${searchTerm}"...`,
    });
    
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filtered);
    setAlternatives(sampleAlternatives);
    if (filtered.length === 0) {
      toast({
        title: "No exact matches found",
        description: "No products found for your search.",
      });
    }
  };

  const saveProduct = (product: Product) => {
    toast({
      title: "Product Saved",
      description: `${product.name} has been added to your favorites.`,
    });
  };

  return (
    <div className="min-h-screen transition-colors bg-background relative">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 pt-20 pb-12 px-4 md:pt-24 md:pb-20">
        <div className="max-w-6xl mx-auto">

          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Leaf className="h-10 w-10 text-green-500 mr-2 animate-pulse" />
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Eco<span className="text-green-500">Cart</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-2xl mx-auto">
              Shop sustainably. Discover eco-friendly products and make ethical purchasing decisions.
            </p>
            <div className="flex justify-center mt-6">
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <Link to="/ai-features" className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" /> Explore AI Features
                </Link>
              </Button>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex w-full items-center space-x-2 mb-12">
              <Input
                type="text"
                placeholder="Search for sustainable products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-lg"
              />
              <Button type="submit" className="h-12">
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* EcoCart Hero Section */}
      <section className="w-full bg-gradient-to-r from-green-600 to-green-400 text-white py-16 px-4 rounded-2xl shadow-lg mb-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-4">
          <Leaf size={56} className="mb-2 text-white drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">EcoCart</h1>
          <p className="text-lg md:text-xl font-medium mb-4">Shop Greener. Live Better.</p>
        </div>
        <Link to="/shop-locator" className="mt-2 inline-block bg-white text-green-700 font-bold px-8 py-3 rounded-full shadow hover:bg-green-100 transition-all text-lg">
          Find Eco Shops Near You
        </Link>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="search">Search Results</TabsTrigger>
            <TabsTrigger value="alternatives">Greener Alternatives</TabsTrigger>
            <TabsTrigger value="impact">My Eco-Impact</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Sustainable Products</h2>
              <Button variant="outline" asChild>
                <Link to="/ai-features" className="flex items-center">
                  <Brain className="mr-2 h-4 w-4" /> AI Tools
                </Link>
              </Button>
            </div>
            
            <AIRecommendations products={(products && products.length > 0 ? products : sampleProducts)} />
            
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => p.name && p.name.trim() && p.name.toLowerCase().indexOf('untitled product') === -1 && p.image && p.image !== 'https://via.placeholder.com/300x300?text=No+Image' && typeof p.price === 'number' && p.price > 0).map((product, idx) => {
                  const key = product.id || product.name || `product-${idx}`;
                  return (
                    <ProductCard 
                      key={key}
                      product={product}
                      onSave={() => saveProduct(product)}
                    />
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-lg">
                    No products found. Try another search term.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="alternatives">
            <h2 className="text-2xl font-bold mb-6">Greener Alternatives</h2>
            
            <ProductComparison 
              originalProduct={products[0]} 
              alternatives={alternatives} 
            />
          </TabsContent>
          
          <TabsContent value="impact">
            <h2 className="text-2xl font-bold mb-6">Your Eco-Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Impact Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 text-green-500" /> Your Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(ecoImpact).map(([ecoKey, value]) => (
                      <div key={ecoKey} className="flex justify-between items-center border-b pb-2">
                        <span className="font-medium capitalize">{ecoKey.replace('_', ' ')}</span>
                        <span className="text-green-500 font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    You're in the top 15% of eco-conscious shoppers!
                  </p>
                </CardFooter>
              </Card>

              {/* Saved Favorites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 text-green-500" /> Saved Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleProducts.slice(0, 3).map((product, idx) => (
                      <div key={product.id ? String(product.id) : `${product.name}-${idx}`} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md mr-3 flex-shrink-0 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-3 w-3 mr-1 text-green-500" /> 
                              {product.ecoScore}/10
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Saved Products
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="learn">
            <h2 className="text-2xl font-bold mb-6">Learn About Sustainable Shopping</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Fast Fashion vs Sustainable Brands', 'Understanding Eco Labels', 'Reducing Your Carbon Footprint'].map((title, idx) => (
                <Card key={title + '-' + idx} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-md mb-4 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Learn how making small changes to your shopping habits can have a significant
                      positive impact on the environment.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold mb-4">Common Eco-Friendly Certifications</h3>
              <div className="flex flex-wrap gap-3">
                {['Fair Trade Certified', 'USDA Organic', 'Energy Star', 'Forest Stewardship Council', 'Rainforest Alliance', 'GOTS Certified'].map((cert, i) => (
                  <div key={cert + '-' + i} className="flex items-center bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-full">
                    <Leaf className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How EcoCart Helps You Shop Sustainably</h2>
          <p className="text-center text-muted-foreground mb-8">Using AI and data-driven insights to power your sustainable shopping journey</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureSection 
              icon={<Leaf className="h-8 w-8 text-green-500" />}
              title="Eco-Friendly Ratings"
              description="Each product is rated based on materials, brand ethics, and supply chain transparency."
            />
            
            <FeatureSection 
              icon={<ArrowRight className="h-8 w-8 text-green-500" />}
              title="Find Alternatives"
              description="Discover greener alternatives to your favorite products with detailed comparisons."
            />
            
            <FeatureSection 
              icon={<Brain className="h-8 w-8 text-green-500" />}
              title="AI-Powered Tools"
              description="Use our machine learning tools to detect greenwashing and calculate carbon footprints."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-lg font-bold">EcoCart</span>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/ai-features">AI Features</Link>
              </Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Blog</Button>
              <Button variant="ghost">Contact</Button>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p> 2023 EcoCart. All rights reserved.</p>
            <p className="mt-2">Helping you make sustainable shopping choices.</p>
          </div>
        </div>
      </footer>
      
      {/* Chat component */}
      <EcoGuideChat />
    </div>
  );
};

export default Index;
