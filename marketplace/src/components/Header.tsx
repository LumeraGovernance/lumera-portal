import { Search, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import lumeraFlag from "figma:asset/34de52e363ebf3fbe545fc9815077d6e87a58c23.png";

interface HeaderProps {
  favoritesCount: number;
  onSearchChange: (value: string) => void;
}

export function Header({ favoritesCount, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1a2937] border-[#2d3e50]">
      {/* Top Banner */}
      <div className="bg-[#151f2b] border-b border-[#2d3e50]">
        <div className="container mx-auto px-4 py-2">
          <p className="text-center text-[#c9a961] text-sm tracking-wide">
            Truth • Virtue • Liberty • Prosperity
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={lumeraFlag} 
              alt="Lumera Flag" 
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-[#c9a961] tracking-wider">
                LUMERA
              </div>
              <div className="text-[#c9a961] text-xs tracking-widest -mt-1">
                MARKET
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Lumeran products and services..."
                className="w-full pl-10 pr-4 py-2 bg-[#0f1922] border-[#2d3e50] text-white placeholder:text-gray-500 focus:border-[#c9a961]"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:text-[#c9a961] hover:bg-[#0f1922]"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'favorites' }))}
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-[#c9a961] hover:bg-[#c9a961] text-[#1a2937]">
                  {favoritesCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
