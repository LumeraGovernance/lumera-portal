import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";

interface FiltersProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
}

const categories = [
  { id: "technology", label: "Technology & Devices", count: 234 },
  { id: "handcrafted", label: "Handcrafted Goods", count: 567 },
  { id: "services", label: "Professional Services", count: 189 },
  { id: "art", label: "Art & Design", count: 145 },
  { id: "education", label: "Education & Training", count: 123 },
  { id: "wellness", label: "Health & Wellness", count: 98 },
];

export function Filters({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
}: FiltersProps) {
  return (
    <aside className="w-64 shrink-0">
      <div className="bg-white rounded-lg border border-[#d4c5b0] p-6 sticky top-32">
        <h2 className="mb-4 text-[#1a2937] tracking-wide">FILTERS</h2>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3 text-[#c9a961] text-sm tracking-wide">CATEGORIES</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => onCategoryChange(category.id)}
                  className="border-[#c9a961] data-[state=checked]:bg-[#c9a961] data-[state=checked]:border-[#c9a961]"
                />
                <Label
                  htmlFor={category.id}
                  className="flex-1 cursor-pointer text-sm text-[#1a2937]"
                >
                  {category.label}
                </Label>
                <span className="text-sm text-gray-400">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6 bg-[#e8dcc8]" />

        {/* Price Range */}
        <div>
          <h3 className="mb-3 text-[#c9a961] text-sm tracking-wide">PRICE RANGE</h3>
          <div className="px-2">
            <Slider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={onPriceRangeChange}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm text-[#1a2937]">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-[#e8dcc8]" />

        {/* Rating Filter */}
        <div>
          <h3 className="mb-3 text-[#c9a961] text-sm tracking-wide">RATING</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((stars) => (
              <Label
                key={stars}
                className="flex items-center gap-2 cursor-pointer text-sm text-[#1a2937]"
              >
                <Checkbox className="border-[#c9a961] data-[state=checked]:bg-[#c9a961] data-[state=checked]:border-[#c9a961]" />
                <span>{stars}★ & up</span>
              </Label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
