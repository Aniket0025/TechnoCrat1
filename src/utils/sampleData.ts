import type { Product } from "@/data/products";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Organic Cotton T-Shirt",
    brand: "EcoWear",
    price: 2499,
    ecoScore: 90,
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&q=80",
    materials: ["100% organic cotton", "water-based dyes"],
    certifications: ["Fair Trade"],
  },
  {
    id: "2",
    name: "Reusable Glass Water Bottle",
    brand: "GreenHydro",
    price: 2850,
    ecoScore: 80,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    materials: ["Sustainable glass", "silicone grip"],
    certifications: ["Carbon Neutral"],
  },
  {
    id: "3",
    name: "Bamboo Kitchen Utensil Set",
    brand: "NatureCook",
    price: 3295,
    ecoScore: 90,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80",
    materials: ["100% sustainable bamboo", "natural oils"],
    certifications: ["Sustainable"],
  },
  {
    id: "4",
    name: "Merino Wool Sweater",
    brand: "PureComfort",
    price: 8900,
    ecoScore: 70,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
    materials: ["100% Merino wool", "free-range sheep"],
    certifications: ["Ethical Wool"],
  },
  {
    id: "5",
    name: "Reusable Produce Bags Set",
    brand: "ZeroWaste",
    price: 1699,
    ecoScore: 80,
    image: "https://images.unsplash.com/photo-1610720685091-777eba31b47d?w=500&q=80",
    materials: ["Organic cotton mesh"],
    certifications: ["Zero Waste"],
  },
  {
    id: "6",
    name: "Biodegradable Phone Case",
    brand: "EcoTech",
    price: 2750,
    ecoScore: 90,
    image: "https://images.unsplash.com/photo-1609252924198-30b8cb324d2f?w=500&q=80",
    materials: ["Biodegradable bioplastic", "plant fibers"],
    certifications: ["Plastic Free"],
  }
];

export const sampleAlternatives = [
  {
    id: "7",
    name: "Hemp Blend T-Shirt",
    brand: "GreenThreads",
    price: 29.99,
    ecoScore: 10,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    materials: ["55% hemp", "45% organic cotton"],
    certifications: [],
  },
  {
    id: "8",
    name: "Stainless Steel Water Bottle",
    brand: "EverGreen",
    price: 24.95,
    ecoScore: 10,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    materials: ["100% recycled stainless steel"],
    certifications: [],
  },
  {
    id: "9",
    name: "Reclaimed Wood Cutting Board",
    brand: "OliveEco",
    price: 42.0,
    ecoScore: 9,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80",
    materials: ["Reclaimed olivewood"],
    certifications: [],
  }
];

export const ecoImpact = {
  carbon_saved: "27.4 kg CO2",
  plastic_avoided: "2.3 kg",
  water_conserved: "1,240 liters",
  trees_planted: "5",
  sustainable_purchases: "14"
};
