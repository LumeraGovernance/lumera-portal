import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddProductForm } from "@/components/add-product-form"

export default async function NewProductPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get seller profile
  const { data: seller } = await supabase.from("sellers").select("*").eq("user_id", user.id).single()

  if (!seller) {
    redirect("/seller/onboarding")
  }

  if (seller.verification_status !== "approved") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Seller Verification Pending</h1>
          <p className="text-muted-foreground">
            Your seller account is pending verification. You'll be able to add products once approved.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
        <AddProductForm sellerId={seller.id} />
      </div>
    </div>
  )
}
