import { ArrowLeft, Heart, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { ProductCard } from "../ProductCard";

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

interface FavoritesPageProps {
  favorites: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
}

export function FavoritesPage({ favorites, onBack, onProductClick, onToggleFavorite }: FavoritesPageProps) {
  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Header */}
      <div className="bg-white border-b border-[#d4c5b0]">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-[#1a2937] hover:text-[#c9a961]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Market
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-[#c9a961] fill-[#c9a961]" />
          <div>
            <h1 className="text-3xl text-[#1a2937]">Saved Products</h1>
            <p className="text-gray-600">Products you're interested in</p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-[#d4c5b0]">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-4">You haven't saved any products yet</p>
            <Button
              onClick={onBack}
              className="bg-[#1a2937] hover:bg-[#c9a961] text-white hover:text-[#1a2937]"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div key={product.id} onClick={() => onProductClick(product)} className="cursor-pointer">
                <ProductCard
                  {...product}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
