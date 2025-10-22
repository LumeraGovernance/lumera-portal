"use client"

import Link from "next/link"
import { ShoppingCart, Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"
import { formatLmcWithFiat } from "@/lib/currency-utils"

interface Product {
  id: string
  name: string
  producer: string
  category: string
  price: number
  unit: string
  image: string
  certified: boolean
  inStock: boolean
  rating: number
  reviews: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      producer: product.producer,
      price: product.price,
      unit: product.unit,
      image: product.image,
      inStock: product.inStock,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || `/placeholder.svg?height=400&width=400&query=${product.name}`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          {product.certified && (
            <Badge variant="secondary" className="flex-shrink-0 gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        <Link href={`/producers/${product.producer.toLowerCase().replace(/\s+/g, "-")}`}>
          <p className="text-sm text-muted-foreground hover:text-primary transition-colors mb-3">
            by {product.producer}
          </p>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{product.price}</span>
          <span className="text-sm text-muted-foreground">LMC / {product.unit}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          ≈ {formatLmcWithFiat(product.price)} / {product.unit}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {product.inStock ? (
          <Button className="w-full gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        ) : (
          <Button className="w-full" variant="secondary" disabled>
            Out of Stock
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
