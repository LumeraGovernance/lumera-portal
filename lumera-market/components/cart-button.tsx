"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"

export function CartButton() {
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalItems = getTotalItems()

  return (
    <Button variant="outline" size="sm" className="relative gap-2 bg-transparent" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        <span className="hidden sm:inline">Cart</span>
        {totalItems > 0 && (
          <Badge
            variant="secondary"
            className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
