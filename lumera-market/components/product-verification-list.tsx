"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { formatMultiCurrency } from "@/lib/currency-utils"

interface Product {
  id: string
  seller_id: string
  name: string
  description: string
  price: number
  category: string
  stock_quantity: number
  unit: string
  origin: string
  certifications: string[]
  image_url: string
  production_cost: number
  transport_cost: number
  storage_cost: number
  verification_status: string
  created_at: string
  sellers: {
    business_name: string
  }
}

interface ProductVerificationListProps {
  products: Product[]
}

export function ProductVerificationList({ products }: ProductVerificationListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handleVerification = async (productId: string, status: "approved" | "rejected") => {
    setLoading(productId)

    try {
      const supabase = createBrowserClient()

      const { error } = await supabase.from("products").update({ verification_status: status }).eq("id", productId)

      if (error) throw error

      toast({
        title: status === "approved" ? "Product approved" : "Product rejected",
        description: `The product has been ${status}.`,
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: "Error",
        description: "Failed to update product status.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pending product verifications</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-6">
          <div className="flex gap-6">
            {product.image_url && (
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-32 h-32 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {product.sellers.business_name} • {new Date(product.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary">{product.verification_status}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm">{product.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <span className="font-medium">Price:</span> {product.price} LMC
                  </span>
                  <span className="text-muted-foreground">{formatMultiCurrency(product.price)}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    <span className="font-medium">Category:</span> {product.category}
                  </span>
                  <span>
                    <span className="font-medium">Stock:</span> {product.stock_quantity} {product.unit}
                  </span>
                </div>
                <p className="text-sm">
                  <span className="font-medium">Origin:</span> {product.origin}
                </p>

                {product.certifications && product.certifications.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium">Certifications:</span>
                    {product.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="border-t pt-2 mt-2">
                  <p className="text-sm font-medium mb-1">Cost Breakdown:</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <span>Production: {product.production_cost} LMC</span>
                    <span>Transport: {product.transport_cost} LMC</span>
                    <span>Storage: {product.storage_cost} LMC</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleVerification(product.id, "approved")}
                  disabled={loading === product.id}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleVerification(product.id, "rejected")}
                  disabled={loading === product.id}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
