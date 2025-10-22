"use client"

import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { useCartStore } from "@/lib/cart-store"
import { Badge } from "@/components/ui/badge"
import { formatLmcWithFiat } from "@/lib/currency-utils"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()

  const subtotal = getTotalPrice()
  const inheritanceFund = subtotal * 0.05
  const total = subtotal

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <MarketplaceHeader />

        <main className="flex-1">
          <section className="py-20">
            <div className="container">
              <Card className="max-w-md mx-auto text-center">
                <CardContent className="pt-12 pb-8">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                  <p className="text-muted-foreground mb-6">
                    Start shopping to add items to your cart and support ethical producers.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/products">Browse Products</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <MarketplaceFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/products/${item.id}`} className="flex-shrink-0">
                          <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={item.image || `/placeholder.svg?height=96&width=96&query=${item.name}`}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-semibold hover:text-primary transition-colors truncate">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground">by {item.producer}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between gap-4 mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)} LMC</div>
                              <div className="text-xs text-muted-foreground">
                                ≈ {formatLmcWithFiat(item.price * item.quantity)}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.price} LMC / {item.unit}
                              </div>
                            </div>
                          </div>

                          {!item.inStock && (
                            <Badge variant="destructive" className="mt-2">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">{subtotal.toFixed(2)} LMC</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span></span>
                      <span>≈ {formatLmcWithFiat(subtotal)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Inheritance Fund (5%)</span>
                      <span className="font-semibold text-primary">{inheritanceFund.toFixed(2)} LMC</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span></span>
                      <span>≈ {formatLmcWithFiat(inheritanceFund)}</span>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        5% of your purchase builds collective wealth for all Lumera citizens and future generations.
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-primary">{total.toFixed(2)} LMC</span>
                    </div>
                    <div className="text-xs text-muted-foreground text-center">≈ {formatLmcWithFiat(total)}</div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <Button size="lg" className="w-full gap-2" asChild>
                      <Link href="/checkout">
                        Proceed to Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                      <Link href="/products">Continue Shopping</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
