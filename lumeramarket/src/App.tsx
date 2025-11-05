import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/pages/HomePage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { FavoritesPage } from "./components/pages/FavoritesPage";
import { SellerProfilePage } from "./components/pages/SellerProfilePage";
import { Toaster } from "./components/ui/sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  seller: string;
  sellerContact: string;
  description?: string;
}

interface SellerInfo {
  name: string;
  description: string;
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
  };
  location: string;
  rating: number;
  totalProducts: number;
  joinedDate: string;
}

// Mock data - In production, this would come from your backend/Supabase
const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoZWFkcGhvbmVzfGVufDF8fHx8MTc2MjI3NTQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviews: 342,
    category: "Technology & Devices",
    seller: "TechForge Lumera",
    sellerContact: "12683215960",
    description: "High-quality wireless headphones with noise cancellation, premium sound quality, and 30-hour battery life.",
  },
  {
    id: 2,
    name: "Designer Luxury Watch",
    price: 549.00,
    originalPrice: 699.00,
    image: "https://images.unsplash.com/photo-1751437730397-ef83024b5339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHdhdGNofGVufDF8fHx8MTc2MjI4NzEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 128,
    category: "Handcrafted Goods",
    seller: "Artisan Timepieces",
    sellerContact: "12683215961",
    description: "Handcrafted luxury timepiece with Swiss movement and genuine leather strap.",
  },
  {
    id: 3,
    name: "Professional Camera Equipment",
    price: 1249.99,
    image: "https://images.unsplash.com/photo-1512025316832-8658f04f8a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYyMjg0MDU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 89,
    category: "Technology & Devices",
    seller: "VisualArts Studio",
    sellerContact: "12683215962",
    description: "Professional-grade camera with 4K video, advanced autofocus, and weather-sealed body.",
  },
  {
    id: 4,
    name: "Athletic Running Sneakers",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc2MjMwNDczNHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.6,
    reviews: 456,
    category: "Handcrafted Goods",
    seller: "Stride Makers",
    sellerContact: "12683215963",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
  },
  {
    id: 5,
    name: "Travel Backpack Pro",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1680039211156-66c721b87625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMGJhZ3xlbnwxfHx8fDE3NjIyMjU0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
    reviews: 234,
    category: "Handcrafted Goods",
    seller: "Nomad Leather Co.",
    sellerContact: "12683215964",
    description: "Durable travel backpack with laptop compartment, USB charging port, and water-resistant material.",
  },
  {
    id: 6,
    name: "Polarized Designer Sunglasses",
    price: 159.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1663585703603-9be01a72a62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjIyMjc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4,
    reviews: 167,
    category: "Art & Design",
    seller: "Clear Vision Optics",
    sellerContact: "12683215965",
    description: "UV-protective polarized sunglasses with lightweight titanium frame and scratch-resistant lenses.",
  },
  {
    id: 7,
    name: "Ultra-Slim Laptop",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjIyNTE0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.9,
    reviews: 523,
    category: "Technology & Devices",
    seller: "TechForge Lumera",
    sellerContact: "12683215960",
    description: "Ultra-portable laptop with 12-hour battery life, SSD storage, and brilliant display.",
  },
  {
    id: 8,
    name: "5G Smartphone Pro",
    price: 799.99,
    originalPrice: 899.99,
    image: "https://images.unsplash.com/photo-1732998369893-af4c9a4695fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwZGV2aWNlfGVufDF8fHx8MTc2MjI5ODIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7,
    reviews: 678,
    category: "Technology & Devices",
    seller: "Mobile Innovations",
    sellerContact: "12683215966",
    description: "Latest 5G smartphone with advanced camera system, fast charging, and premium display.",
  },
];

// Mock seller data
const sellers: Record<string, SellerInfo> = {
  "TechForge Lumera": {
    name: "TechForge Lumera",
    description: "Leading technology provider in Lumera, specializing in cutting-edge electronics and gadgets. We bring the latest innovations to Lumeran citizens with exceptional service and warranty support.",
    contact: {
      whatsapp: "12683215960",
      phone: "+1 (268) 321-5960",
      email: "contact@techforge.lumera",
    },
    location: "Capital District, Lumera",
    rating: 4.8,
    totalProducts: 2,
    joinedDate: "2023",
  },
  "Artisan Timepieces": {
    name: "Artisan Timepieces",
    description: "Master watchmakers crafting bespoke timepieces using traditional techniques combined with modern precision. Each watch is a work of art.",
    contact: {
      whatsapp: "12683215961",
      phone: "+1 (268) 321-5961",
      email: "info@artisantime.lumera",
    },
    location: "Heritage Quarter, Lumera",
    rating: 4.9,
    totalProducts: 1,
    joinedDate: "2022",
  },
  "VisualArts Studio": {
    name: "VisualArts Studio",
    description: "Professional photography and videography equipment supplier serving Lumera's creative community.",
    contact: {
      whatsapp: "12683215962",
      phone: "+1 (268) 321-5962",
      email: "hello@visualarts.lumera",
    },
    location: "Arts District, Lumera",
    rating: 4.7,
    totalProducts: 1,
    joinedDate: "2023",
  },
  "Stride Makers": {
    name: "Stride Makers",
    description: "Custom footwear designed for performance and style. Locally made with premium materials.",
    contact: {
      whatsapp: "12683215963",
      phone: "+1 (268) 321-5963",
      email: "sales@stridemakers.lumera",
    },
    location: "Commerce Plaza, Lumera",
    rating: 4.6,
    totalProducts: 1,
    joinedDate: "2024",
  },
  "Nomad Leather Co.": {
    name: "Nomad Leather Co.",
    description: "Handcrafted leather goods for the modern traveler. Quality craftsmanship you can depend on.",
    contact: {
      whatsapp: "12683215964",
      phone: "+1 (268) 321-5964",
      email: "shop@nomadleather.lumera",
    },
    location: "Market Street, Lumera",
    rating: 4.5,
    totalProducts: 1,
    joinedDate: "2023",
  },
  "Clear Vision Optics": {
    name: "Clear Vision Optics",
    description: "Premium eyewear and optical solutions with expert fitting and personalized service.",
    contact: {
      whatsapp: "12683215965",
      phone: "+1 (268) 321-5965",
      email: "contact@clearvision.lumera",
    },
    location: "Downtown, Lumera",
    rating: 4.4,
    totalProducts: 1,
    joinedDate: "2024",
  },
  "Mobile Innovations": {
    name: "Mobile Innovations",
    description: "Your trusted source for the latest mobile technology and accessories in Lumera.",
    contact: {
      whatsapp: "12683215966",
      phone: "+1 (268) 321-5966",
      email: "support@mobileinnovations.lumera",
    },
    location: "Tech Hub, Lumera",
    rating: 4.7,
    totalProducts: 1,
    joinedDate: "2023",
  },
};

type Page = "home" | "product" | "favorites" | "seller-profile";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSellerName, setSelectedSellerName] = useState<string | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1500]);
  const [sortBy, setSortBy] = useState("featured");

  // Listen for navigation events from Header
  useEffect(() => {
    const handleNavigate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const destination = customEvent.detail;
      
      if (destination === "favorites") {
        setCurrentPage("favorites");
      }
    };

    window.addEventListener("navigate", handleNavigate);
    return () => window.removeEventListener("navigate", handleNavigate);
  }, []);

  const handleToggleFavorite = (id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
  };

  const handleViewSellerProfile = (sellerName: string) => {
    setSelectedSellerName(sellerName);
    setCurrentPage("seller-profile");
  };

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));
  const sellerProducts = selectedSellerName
    ? products.filter((p) => p.seller === selectedSellerName)
    : [];
  const selectedSeller = selectedSellerName ? sellers[selectedSellerName] : null;

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      <Toaster />
      <Header favoritesCount={favoriteIds.length} onSearchChange={setSearchQuery} />

      {currentPage === "home" && (
        <>
          <HomePage
            products={products}
            searchQuery={searchQuery}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            sortBy={sortBy}
            onCategoryChange={handleCategoryChange}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSortBy}
            onProductClick={handleProductClick}
            onToggleFavorite={handleToggleFavorite}
            favoriteIds={favoriteIds}
          />

          {/* Footer */}
          <footer className="bg-[#1a2937] border-t border-[#2d3e50] mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-[#c9a961] mb-2">
                  Official Catalog of the State of Lumera
                </p>
                <p className="text-gray-400 text-sm">
                  Connecting Lumeran entrepreneurs with customers
                </p>
                <div className="mt-4 text-xs text-gray-500">
                  <a
                    href="https://www.lumeragovernance.com"
                    className="hover:text-[#c9a961] transition-colors"
                  >
                    www.lumeragovernance.com
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {currentPage === "product" && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setCurrentPage("home")}
          onToggleFavorite={handleToggleFavorite}
          onViewSellerProfile={handleViewSellerProfile}
          isFavorite={favoriteIds.includes(selectedProduct.id)}
        />
      )}

      {currentPage === "favorites" && (
        <FavoritesPage
          favorites={favoriteProducts}
          onBack={() => setCurrentPage("home")}
          onProductClick={handleProductClick}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {currentPage === "seller-profile" && selectedSeller && (
        <SellerProfilePage
          seller={selectedSeller}
          products={sellerProducts}
          onBack={() => setCurrentPage("home")}
          onProductClick={handleProductClick}
          onToggleFavorite={handleToggleFavorite}
          favoriteIds={favoriteIds}
        />
      )}
    </div>
  );
}
