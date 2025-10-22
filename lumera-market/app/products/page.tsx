"use client"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { createServerClient } from "@/lib/supabase/server"

export default async function ProductsPage() {
  const supabase = await createServerClient()

  const { data: products } = await supabase
    .from("products")
    .select("*, sellers(business_name)")
    .eq("verification_status", "approved")
    .gt("stock_quantity", 0)
    .order("created_at", { ascending: false })

  // Transform database products to match expected format
  const transformedProducts =
    products?.map((product) => ({
      id: product.id,
      name: product.name,
      producer: product.sellers?.business_name || "Unknown Producer",
      category: product.category,
      price: product.price,
      unit: product.unit,
      image: product.image_url || "/placeholder.svg",
      certified: true,
      inStock: product.stock_quantity > 0,
      rating: 4.8, // TODO: Calculate from reviews
      reviews: 0, // TODO: Count from reviews table
    })) || []

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState("featured")

  // Filter products
  const filteredProducts = transformedProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.producer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    const matchesStock = !showInStockOnly || product.inStock

    return matchesSearch && matchesCategory && matchesPrice && matchesStock
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 50])
    setShowInStockOnly(false)
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 50

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
            <p className="text-muted-foreground">
              Discover ethically sourced products from verified cooperative producers
            </p>
          </div>
        </section>

        {/* Search and Filters Bar */}
        <section className="border-b bg-background py-4">
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products or producers..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort and Filter Controls */}
              <div className="flex items-center gap-2">
                <select
                  className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {hasActiveFilters && (
                        <Badge variant="secondary" className="ml-2">
                          Active
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your product search</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <ProductFilters
                        selectedCategories={selectedCategories}
                        onCategoriesChange={setSelectedCategories}
                        priceRange={priceRange}
                        onPriceRangeChange={setPriceRange}
                        showInStockOnly={showInStockOnly}
                        onInStockChange={setShowInStockOnly}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="gap-1">
                    {category}
                    <button
                      onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(priceRange[0] > 0 || priceRange[1] < 50) && (
                  <Badge variant="secondary" className="gap-1">
                    {priceRange[0]} - {priceRange[1]} LMC
                    <button onClick={() => setPriceRange([0, 50])} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {showInStockOnly && (
                  <Badge variant="secondary" className="gap-1">
                    In Stock Only
                    <button onClick={() => setShowInStockOnly(false)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7">
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Products Grid with Sidebar */}
        <section className="py-8">
          <div className="container">
            <div className="flex gap-8">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden md:block w-64 flex-shrink-0">
                <div className="sticky top-20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold">Filters</h2>
                    {hasActiveFilters && (
                      <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                        Clear all
                      </Button>
                    )}
                  </div>
                  <ProductFilters
                    selectedCategories={selectedCategories}
                    onCategoriesChange={setSelectedCategories}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    showInStockOnly={showInStockOnly}
                    onInStockChange={setShowInStockOnly}
                  />
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {sortedProducts.length} of {transformedProducts.length} products
                  </p>
                </div>

                {sortedProducts.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                      <Button onClick={clearFilters}>Clear Filters</Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
