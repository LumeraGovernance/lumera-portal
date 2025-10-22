"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ShoppingCart,
  Star,
  CheckCircle2,
  Minus,
  Plus,
  Heart,
  Share2,
  MapPin,
  TrendingUp,
  Users,
  Leaf,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { formatMultiCurrency } from "@/lib/currency-utils"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailClientProps {
  product: any
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const totalPrice = product.price * quantity
  const totalCostBreakdown = Object.entries(product.costBreakdown).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: (value as number) * quantity,
    }),
    {} as Record<string, number>,
  )

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      producer: product.producer,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.unit} of ${product.name} added to your cart.`,
    })
  }

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <section className="border-b bg-muted/30 py-4">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Link
                  href={`/producers/${product.producerId}`}
                  className="text-lg text-primary hover:underline inline-flex items-center gap-2"
                >
                  by {product.producer}
                  <ChevronRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">({product.reviews} reviews)</span>
                  </div>
                  {product.certified && (
                    <Badge variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Producer
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              {/* Price and Stock */}
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-primary">{product.price}</span>
                  <span className="text-lg text-muted-foreground">LMC / {product.unit}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  ≈ {formatMultiCurrency(product.price)} / {product.unit}
                </div>

                {product.inStock ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">In Stock</span>
                      <span className="text-muted-foreground">({product.stockLevel}% available)</span>
                    </div>
                    <Progress value={product.stockLevel} className="h-2" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total: <span className="font-bold text-foreground text-lg">{totalPrice.toFixed(2)} LMC</span>
                    <div className="text-xs">≈ {formatMultiCurrency(totalPrice)}</div>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button size="lg" className="flex-1 gap-2" disabled={!product.inStock} onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" disabled={!product.inStock}>
                  Buy Now
                </Button>
              </div>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Origin:</span> {product.origin}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Leaf className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Listed:</span> {product.harvestDate}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {product.certifications.map((cert: string) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="transparency">Cost Breakdown</TabsTrigger>
                <TabsTrigger value="producer">Producer Story</TabsTrigger>
                <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transparency" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Full Cost Transparency
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      See exactly where your {totalPrice.toFixed(2)} LMC goes when you purchase {quantity}{" "}
                      {product.unit}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(totalCostBreakdown).map(([key, value]) => {
                      const percentage = ((value as number) / totalPrice) * 100
                      const labels: Record<string, string> = {
                        production: "Production Costs",
                        labor: "Fair Labor Wages",
                        transport: "Transportation",
                        packaging: "Sustainable Packaging",
                        cooperativeFee: "Cooperative Operations",
                        inheritanceFund: "Inheritance Fund (5%)",
                      }
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{labels[key]}</span>
                            <span className="text-sm font-bold">
                              {(value as number).toFixed(2)} LMC ({percentage.toFixed(1)}%)
                              <span className="block text-xs text-muted-foreground font-normal">
                                ≈ {formatMultiCurrency(value as number)}
                              </span>
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                    <Separator className="my-4" />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong>Inheritance Fund:</strong> 5% of every purchase goes directly to the collective
                        inheritance fund, building long-term wealth for all Lumera citizens and future generations.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="producer" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      About {product.producer}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{product.producerStory}</p>
                    <Separator />
                    <div>
                      <Link href={`/producers/${product.producerId}`}>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          View Full Producer Profile
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5" />
                      Environmental Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(product.environmentalImpact).map(([key, value]) => {
                      const labels: Record<string, string> = {
                        carbonFootprint: "Carbon Footprint",
                        waterUsage: "Water Usage",
                        soilHealth: "Soil Health",
                        biodiversity: "Biodiversity",
                      }
                      return (
                        <div key={key} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{labels[key]}</p>
                            <p className="text-sm text-muted-foreground">{value as string}</p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </main>
  )
}
