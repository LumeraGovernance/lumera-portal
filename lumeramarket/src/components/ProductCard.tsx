import { Heart, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  seller: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  category,
  seller,
  isFavorite = false,
  onToggleFavorite,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg border border-[#d4c5b0] overflow-hidden hover:shadow-xl hover:border-[#c9a961] transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f1e8]">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-[#c9a961] hover:bg-[#b8985a] text-[#1a2937] border-none">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:bg-white transition-all"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-[#c9a961] text-[#c9a961]" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <div className="text-xs text-[#c9a961] tracking-wide mb-1">{category}</div>
        <h3 className="mb-1 line-clamp-2 text-[#1a2937]">{name}</h3>
        <p className="text-xs text-gray-600 mb-3">by {seller}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-[#c9a961] text-[#c9a961]"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {rating} ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl text-[#1a2937]">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
