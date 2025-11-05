import { useState } from "react";
import { ArrowLeft, Heart, Star, MessageCircle, Mail, Phone, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

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

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onToggleFavorite: (id: number) => void;
  onViewSellerProfile: (sellerName: string) => void;
  isFavorite: boolean;
}

export function ProductDetailPage({ 
  product, 
  onBack, 
  onToggleFavorite, 
  onViewSellerProfile,
  isFavorite 
}: ProductDetailPageProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in "${product.name}" listed on Lumera Market for $${product.price}.`
    );
    window.open(`https://wa.me/${product.sellerContact}?text=${message}`, '_blank');
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(product.id);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* Back Button */}
      <div className="bg-white border-b border-[#d4c5b0]">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-[#1a2937] hover:text-[#c9a961]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg border border-[#d4c5b0] overflow-hidden">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-[#c9a961] hover:bg-[#c9a961] text-[#1a2937]">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-[#c9a961] tracking-wide mb-2">{product.category}</div>
              <h1 className="text-3xl text-[#1a2937] mb-2">{product.name}</h1>
              <button
                onClick={() => onViewSellerProfile(product.seller)}
                className="text-gray-600 hover:text-[#c9a961] transition-colors"
              >
                Sold by <span className="text-[#c9a961]">{product.seller}</span>
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-[#c9a961] text-[#c9a961]"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#1a2937]">{product.rating}</span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            <Separator className="bg-[#e8dcc8]" />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl text-[#1a2937]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <Separator className="bg-[#e8dcc8]" />

            {/* Contact Actions */}
            <div className="space-y-4">
              <h3 className="text-[#1a2937]">Interested in this product?</h3>
              <p className="text-sm text-gray-600">
                Contact the seller directly to inquire about availability, pricing, or to make a purchase.
              </p>

              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white h-12"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Seller on WhatsApp
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => onViewSellerProfile(product.seller)}
                    className="border-[#d4c5b0] hover:bg-[#c9a961] hover:text-white"
                  >
                    <User className="w-5 h-5 mr-2" />
                    View Seller
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleToggleFavorite}
                    className={`border-[#d4c5b0] ${
                      isFavorite 
                        ? "bg-[#c9a961] text-white hover:bg-[#b39851]" 
                        : "hover:bg-[#c9a961] hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${isFavorite ? "fill-current" : ""}`}
                    />
                    {isFavorite ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Info Notice */}
            <div className="bg-[#f5f1e8] border border-[#d4c5b0] rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong className="text-[#1a2937]">Note:</strong> All transactions are conducted directly 
                between buyer and seller. Lumera Market serves as a catalog to connect Lumeran entrepreneurs 
                with potential customers.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="bg-white border border-[#d4c5b0]">
              <TabsTrigger value="description" className="data-[state=active]:bg-[#c9a961] data-[state=active]:text-white">
                Description
              </TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-[#c9a961] data-[state=active]:text-white">
                Reviews ({product.reviews})
              </TabsTrigger>
              <TabsTrigger value="seller" className="data-[state=active]:bg-[#c9a961] data-[state=active]:text-white">
                Seller Info
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-white rounded-lg border border-[#d4c5b0] p-6">
                <h3 className="text-xl text-[#1a2937] mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || `This premium product represents the finest craftsmanship from Lumeran artisans. 
                  Each item is carefully curated to meet our high standards of quality and excellence. 
                  Built to last and designed with both form and function in mind, this product exemplifies 
                  the values of Truth, Virtue, Liberty, and Prosperity that define the Lumeran spirit.`}
                </p>
                <ul className="mt-4 space-y-2 text-gray-700">
                  <li>• Premium quality materials</li>
                  <li>• Crafted by verified Lumeran citizens</li>
                  <li>• Meets all Lumera quality standards</li>
                  <li>• Supports local economy and artisans</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg border border-[#d4c5b0] p-6">
                <h3 className="text-xl text-[#1a2937] mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-[#e8dcc8] pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-[#c9a961] text-[#c9a961]"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#1a2937]">Verified Customer</span>
                      </div>
                      <p className="text-gray-700 text-sm mb-1">
                        Excellent product! The seller was very responsive and helpful.
                      </p>
                      <p className="text-xs text-gray-500">- Lumeran Citizen, 2 weeks ago</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="seller" className="mt-6">
              <div className="bg-white rounded-lg border border-[#d4c5b0] p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl text-[#1a2937] mb-2">About {product.seller}</h3>
                    <p className="text-gray-700">
                      A verified Lumeran business committed to providing quality products and exceptional service 
                      to fellow citizens. Operating in accordance with Lumera's principles of commerce and integrity.
                    </p>
                  </div>
                  <Button
                    onClick={() => onViewSellerProfile(product.seller)}
                    variant="outline"
                    className="border-[#d4c5b0] hover:bg-[#c9a961] hover:text-white"
                  >
                    View Profile
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div>
                    <div className="text-2xl text-[#c9a961]">4.8</div>
                    <div className="text-sm text-gray-600">Seller Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl text-[#c9a961]">98%</div>
                    <div className="text-sm text-gray-600">Positive Reviews</div>
                  </div>
                  <div>
                    <div className="text-2xl text-[#c9a961]">500+</div>
                    <div className="text-sm text-gray-600">Products Listed</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
