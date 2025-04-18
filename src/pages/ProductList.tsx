import React, { useState } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { askGemini } from "@/services/gemini";
import LanguageSelector from "@/components/LanguageSelector";
import WishlistDrawer from "@/components/WishlistDrawer";
import EcoGuideChat from "@/components/EcoGuideChat";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const ProductList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [alternative, setAlternative] = useState<Product | null>(null);
  const [aiReason, setAiReason] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [, setCartOpen] = useState(false);
  const { user } = useAuth();
  const userId = user?.uid || "guest";
  const { wishlist, addToWishlist } = useWishlist();

  // Filter products by search
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.materials.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  // Find greener alternative (highest ecoScore, not the same product)
  const findGreenerAlternative = (product: Product) => {
    return products
      .filter((p) => p.id !== product.id && p.ecoScore > product.ecoScore)
      .sort((a, b) => b.ecoScore - a.ecoScore)[0] || null;
  };

  const handleShowAlternative = async (product: Product) => {
    setSelectedProduct(product);
    const alt = findGreenerAlternative(product);
    setAlternative(alt);
    setAiReason("");
    if (alt) {
      setLoading(true);
      // Ask Gemini why the alternative is greener
      const prompt = `Compare these two products for eco-friendliness and explain why the second is a greener choice.\nProduct 1: ${product.name}, Materials: ${product.materials.join(", ")}, Certifications: ${product.certifications.join(", ")}, EcoScore: ${product.ecoScore}.\nProduct 2: ${alt.name}, Materials: ${alt.materials.join(", ")}, Certifications: ${alt.certifications.join(", ")}, EcoScore: ${alt.ecoScore}.`;
      const reason = await askGemini(prompt);
      setAiReason(reason);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 relative">
      <h1 className="text-3xl font-bold mb-6">EcoCart Product Catalog</h1>
      <input
        type="text"
        className="form-control mb-6 w-full max-w-lg border border-gray-300 rounded px-3 py-2"
        placeholder="Search products, brands, or materials..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="flex flex-col">
            <ProductCard
              product={product}
              onShowAlternative={handleShowAlternative}
            />
            {/* Multi-field Language selector for full product details */}
            <div className="mt-2">
              <LanguageSelector
                name={product.name}
                description={product.brand}
                materials={product.materials}
                certifications={product.certifications}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Floating AI Chatbot Button */}
      <EcoGuideChat />
      
      {/* Google Pay Button at the bottom, only if cart is not empty */}
      {wishlist.length > 0 && (
        <div className="mt-8 flex justify-center">
  
        </div>
      )}
      {/* Modal for greener alternative explanation */}
      {selectedProduct && alternative && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => {
                setSelectedProduct(null);
                setAlternative(null);
                setAiReason("");
              }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">Greener Alternative</h2>
            <div className="mb-2">
              <b>{selectedProduct.name}</b> <span className="text-gray-500">vs</span> <b>{alternative.name}</b>
            </div>
            {loading ? (
              <div className="py-6 text-center">Loading explanation from Gemini...</div>
            ) : (
              <div className="text-sm text-gray-700 whitespace-pre-line">{aiReason}</div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductList;
