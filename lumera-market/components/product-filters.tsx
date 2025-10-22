"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

interface ProductFiltersProps {
  selectedCategories: string[]
  onCategoriesChange: (categories: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  showInStockOnly: boolean
  onInStockChange: (value: boolean) => void
}

const categories = ["Fresh Produce", "Dry Goods", "Craft & Tools", "Household"]

export function ProductFilters({
  selectedCategories,
  onCategoriesChange,
  priceRange,
  onPriceRangeChange,
  showInStockOnly,
  onInStockChange,
}: ProductFiltersProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoriesChange([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Price Range</h3>
          <span className="text-sm text-muted-foreground">
            {priceRange[0]} - {priceRange[1]} LMC
          </span>
        </div>
        <Slider
          min={0}
          max={50}
          step={0.5}
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>0 LMC</span>
          <span>50 LMC</span>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-medium mb-3">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="in-stock" checked={showInStockOnly} onCheckedChange={(checked) => onInStockChange(!!checked)} />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            In stock only
          </Label>
        </div>
      </div>
    </div>
  )
}
