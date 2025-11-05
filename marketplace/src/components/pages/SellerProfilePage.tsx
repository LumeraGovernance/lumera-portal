import { ArrowLeft, MapPin, Phone, Mail, MessageCircle, Star, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ProductCard } from "../ProductCard";
import { Avatar, AvatarFallback } from "../ui/avatar";

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

interface SellerProfilePageProps {
  seller: SellerInfo;
  products: Product[];
  onBack: () => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (id: number) => void;
  favoriteIds: number[];
}

export function SellerProfilePage({ 
  seller, 
  products, 
  onBack, 
  onProductClick,
  onToggleFavorite,
  favoriteIds 
}: SellerProfilePageProps) {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(`Hello ${seller.name}, I'm interested in your products on Lumera Market.`);
    window.open(`https://wa.me/${seller.contact.whatsapp}?text=${message}`, '_blank');
  };

  const initials = seller.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

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
        {/* Seller Info Card */}
        <div className="bg-white rounded-lg border border-[#d4c5b0] p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Avatar className="w-32 h-32 border-4 border-[#c9a961]">
              <AvatarFallback className="bg-[#c9a961] text-white text-3xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-[#1a2937] mb-2">{seller.name}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#c9a961] hover:bg-[#c9a961] text-[#1a2937]">
                      Verified Seller
                    </Badge>
                    <Badge variant="outline" className="border-[#d4c5b0]">
                      Member since {seller.joinedDate}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#c9a961] text-[#c9a961]" />
                      <span>{seller.rating} Rating</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Package className="w-5 h-5 text-[#c9a961]" />
                      <span>{seller.totalProducts} Products</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{seller.description}</p>

              <Separator className="my-6 bg-[#e8dcc8]" />

              <div className="space-y-3">
                <h3 className="text-[#1a2937] mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-[#c9a961]" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="w-5 h-5 text-[#c9a961]" />
                    <a href={`tel:${seller.contact.phone}`} className="hover:text-[#c9a961]">
                      {seller.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-[#c9a961]" />
                    <a href={`mailto:${seller.contact.email}`} className="hover:text-[#c9a961]">
                      {seller.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleWhatsAppContact}
                  className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact on WhatsApp
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${seller.contact.email}`}
                  className="border-[#d4c5b0] hover:bg-[#c9a961] hover:text-white"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl text-[#1a2937] mb-6">Products by {seller.name}</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
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
              <p className="text-gray-500">This seller hasn't listed any products yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
