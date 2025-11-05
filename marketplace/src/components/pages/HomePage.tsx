import { useMemo } from "react";
import { Filters } from "../Filters";
import { ProductCard } from "../ProductCard";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SlidersHorizontal } from "lucide-react";

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
}

interface HomePageProps {
  products: Product[];
  searchQuery: string;
  selectedCategories: string[];
  priceRange: number[];
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onSortChange: (sort: string) => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
  favoriteIds: number[];
}

export function HomePage({
  products,
  searchQuery,
  selectedCategories,
  priceRange,
  sortBy,
  onCategoryChange,
  onPriceRangeChange,
  onSortChange,
  onProductClick,
  onToggleFavorite,
  favoriteIds,
}: HomePageProps) {
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(
          product.category.toLowerCase().replace(/\s+&\s+/g, "")
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy, products]);

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1a2937] to-[#2d3e50] border-b border-[#c9a961]">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl text-white mb-2">Supporting Lumeran Entrepreneurs</h1>
            <p className="text-[#c9a961]">
              Discover quality products and services from verified Lumeran citizens
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <Filters
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="mb-1 text-[#1a2937]">All Products & Services</h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} listings
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#c9a961] text-[#1a2937] hover:bg-[#c9a961] hover:text-white"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Select value={sortBy} onValueChange={onSortChange}>
                  <SelectTrigger className="w-48 border-[#d4c5b0] focus:ring-[#c9a961]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer">
                    <ProductCard
                      {...product}
                      isFavorite={favoriteIds.includes(product.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border border-[#d4c5b0]">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-[#c9a961] text-[#1a2937] hover:bg-[#c9a961] hover:text-white"
                  onClick={() => {
                    onCategoryChange("");
                    onPriceRangeChange([0, 1000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
