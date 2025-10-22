import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react"
import { SellerVerificationList } from "@/components/seller-verification-list"
import { ProductVerificationList } from "@/components/product-verification-list"

export default async function AdminDashboard() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: adminRole } = await supabase.from("admin_roles").select("*").eq("user_id", user.id).single()

  if (!adminRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </div>
    )
  }

  // Get pending sellers
  const { data: pendingSellers } = await supabase
    .from("sellers")
    .select("*")
    .eq("verification_status", "pending")
    .order("created_at", { ascending: false })

  // Get pending products
  const { data: pendingProducts } = await supabase
    .from("products")
    .select("*, sellers(business_name)")
    .eq("verification_status", "pending")
    .order("created_at", { ascending: false })

  // Get stats
  const { count: totalSellers } = await supabase.from("sellers").select("*", { count: "exact", head: true })

  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true })

  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { data: orders } = await supabase.from("orders").select("total_amount")
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage sellers, products, and marketplace operations</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSellers || 0}</div>
              <p className="text-xs text-muted-foreground">{pendingSellers?.length || 0} pending verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts || 0}</div>
              <p className="text-xs text-muted-foreground">{pendingProducts?.length || 0} pending verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders || 0}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} LMC</div>
              <p className="text-xs text-muted-foreground">${(totalRevenue * 2).toFixed(2)} USD</p>
            </CardContent>
          </Card>
        </div>

        {/* Verification Tabs */}
        <Tabs defaultValue="sellers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sellers">
              Pending Sellers
              {pendingSellers && pendingSellers.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingSellers.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="products">
              Pending Products
              {pendingProducts && pendingProducts.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingProducts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sellers">
            <Card>
              <CardHeader>
                <CardTitle>Seller Verification</CardTitle>
                <CardDescription>Review and approve seller applications</CardDescription>
              </CardHeader>
              <CardContent>
                <SellerVerificationList sellers={pendingSellers || []} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Product Verification</CardTitle>
                <CardDescription>Review and approve product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductVerificationList products={pendingProducts || []} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
