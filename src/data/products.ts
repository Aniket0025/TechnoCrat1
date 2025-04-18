// Example product data for EcoCart
export interface Product {
  badges?: string[];
  sustainabilityTags?: string[];
  id: string;
  name: string;
  image: string;
  price: number;
  materials: string[];
  brand: string;
  certifications: string[];
  ecoScore: number; // 0-100
}

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Cotton T-Shirt",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    price: 799,
    materials: ["organic cotton"],
    brand: "GreenWear",
    certifications: ["GOTS", "Fair Trade"],
    ecoScore: 92,
  },
  {
    id: "2",
    name: "Recycled Plastic Water Bottle",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    price: 299,
    materials: ["recycled plastic"],
    brand: "EcoSip",
    certifications: ["BPA-Free"],
    ecoScore: 85,
  },
  {
    id: "3",
    name: "Bamboo Toothbrush",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b",
    price: 99,
    materials: ["bamboo"],
    brand: "NatureSmile",
    certifications: ["FSC Certified"],
    ecoScore: 78,
  },
  {
    id: "4",
    name: "Conventional Plastic Bag",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
    price: 10,
    materials: ["plastic"],
    brand: "Generic",
    certifications: [],
    ecoScore: 15,
  },
  {
    id: "5",
    name: "Fair Trade Coffee Beans",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    price: 499,
    materials: ["arabica beans"],
    brand: "Ethical Beans",
    certifications: ["Fair Trade", "Rainforest Alliance"],
    ecoScore: 88,
  },
];
