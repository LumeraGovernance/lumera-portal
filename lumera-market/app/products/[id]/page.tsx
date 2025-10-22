"use client"
import { ProductDetailClient } from "@/components/product-detail-client"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { MarketplaceHeader } from "@/components/marketplace-header" // Import MarketplaceHeader

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()

  const { data: product } = await supabase
    .from("products")
    .select("*, sellers(id, business_name, business_description)")
    .eq("id", params.id)
    .eq("verification_status", "approved")
    .single()

  if (!product) {
    notFound()
  }

  // Transform database product to match expected format
  const transformedProduct = {
    id: product.id,
    name: product.name,
    producer: product.sellers?.business_name || "Unknown Producer",
    producerId: product.sellers?.id || "",
    category: product.category,
    price: product.price,
    unit: product.unit,
    images: product.image_url ? [product.image_url] : ["/placeholder.svg"],
    certified: true,
    inStock: product.stock_quantity > 0,
    stockLevel: Math.min(100, (product.stock_quantity / 100) * 100),
    rating: 4.8, // TODO: Calculate from reviews
    reviews: 0, // TODO: Count from reviews table
    description: product.description,
    origin: product.origin,
    harvestDate: new Date(product.created_at).toISOString().split("T")[0],
    certifications: product.certifications || [],
    costBreakdown: {
      production: product.production_cost,
      labor: product.production_cost * 0.35,
      transport: product.transport_cost,
      packaging: product.storage_cost * 0.3,
      cooperativeFee: product.price * 0.04,
      inheritanceFund: product.price * 0.05,
    },
    producerStory: product.sellers?.business_description || "No producer story available.",
    environmentalImpact: {
      carbonFootprint: "Low",
      waterUsage: "Efficient practices",
      soilHealth: "Sustainable farming",
      biodiversity: "Supports local ecosystems",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />
      <ProductDetailClient product={transformedProduct} />
      <MarketplaceFooter />
    </div>
  )
}
