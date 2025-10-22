"use client"

import Link from "next/link"
import {
  Wallet,
  Package,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Plus,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { Progress } from "@/components/ui/progress"

// Mock data
const userData = {
  name: "Alex Rivera",
  citizenId: "LMC-2024-00142",
  memberSince: "January 2024",
  walletBalance: 1250,
  inheritanceFund: 342,
  totalSpent: 4580,
  ordersCount: 23,
}

const recentOrders = [
  {
    id: "LMC-ORD-001",
    date: "2025-10-18",
    status: "Delivered",
    total: 145,
    items: 3,
  },
  {
    id: "LMC-ORD-002",
    date: "2025-10-15",
    status: "In Transit",
    total: 89,
    items: 2,
  },
  {
    id: "LMC-ORD-003",
    date: "2025-10-12",
    status: "Delivered",
    total: 234,
    items: 5,
  },
]

const walletTransactions = [
  {
    id: "1",
    type: "purchase",
    description: "Order #LMC-ORD-001",
    amount: -145,
    date: "2025-10-18",
  },
  {
    id: "2",
    type: "deposit",
    description: "Wallet Top-up",
    amount: 500,
    date: "2025-10-17",
  },
  {
    id: "3",
    type: "purchase",
    description: "Order #LMC-ORD-002",
    amount: -89,
    date: "2025-10-15",
  },
  {
    id: "4",
    type: "inheritance",
    description: "Inheritance Fund Contribution",
    amount: -7.25,
    date: "2025-10-15",
  },
]

const inheritanceContributions = [
  { month: "Oct 2025", amount: 23.5 },
  { month: "Sep 2025", amount: 18.2 },
  { month: "Aug 2025", amount: 31.8 },
  { month: "Jul 2025", amount: 15.6 },
  { month: "Jun 2025", amount: 28.4 },
  { month: "May 2025", amount: 22.1 },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}</h1>
            <p className="text-muted-foreground">Citizen ID: {userData.citizenId}</p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-8">
          <div className="container">
            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#wallet">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">{userData.walletBalance} LMC</div>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <TrendingUp className="h-5 w-5 text-secondary" />
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#inheritance">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">{userData.inheritanceFund} LMC</div>
                  <p className="text-sm text-muted-foreground">Inheritance Fund</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Package className="h-5 w-5 text-accent" />
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="#orders">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">{userData.ordersCount}</div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{userData.totalSpent} LMC</div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="inheritance">Inheritance Fund</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#orders">
                            View All
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{order.total} LMC</p>
                            <Badge variant={order.status === "Delivered" ? "secondary" : "outline"} className="text-xs">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Inheritance Fund Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Inheritance Fund Growth</CardTitle>
                      <CardDescription>Your contribution to collective wealth</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Current Balance</span>
                        <span className="text-2xl font-bold text-primary">{userData.inheritanceFund} LMC</span>
                      </div>
                      <Progress value={68} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        You've contributed {inheritanceContributions.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}{" "}
                        LMC over the last 6 months
                      </p>
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="#inheritance">View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
                        <Link href="/products">
                          <Package className="h-6 w-6" />
                          <span>Browse Products</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
                        <Link href="/producers">
                          <Users className="h-6 w-6" />
                          <span>View Producers</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                        <Wallet className="h-6 w-6" />
                        <span>Add Funds</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
                        <Download className="h-6 w-6" />
                        <span>Download Report</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" id="orders" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and track all your orders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-semibold">{order.id}</p>
                              <Badge variant={order.status === "Delivered" ? "secondary" : "outline"}>
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total} LMC</p>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full bg-transparent">
                      Load More Orders
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Wallet Tab */}
              <TabsContent value="wallet" id="wallet" className="mt-6 space-y-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Wallet Balance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center py-6">
                        <div className="text-4xl font-bold text-primary mb-2">{userData.walletBalance} LMC</div>
                        <p className="text-sm text-muted-foreground">≈ ${userData.walletBalance} USD</p>
                      </div>
                      <Button className="w-full gap-2">
                        <Plus className="h-4 w-4" />
                        Add Funds
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {walletTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                transaction.amount > 0 ? "bg-green-100" : "bg-muted"
                              }`}
                            >
                              {transaction.amount > 0 ? (
                                <ArrowDownRight className="h-5 w-5 text-green-600" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <p
                            className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-foreground"}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount} LMC
                          </p>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Transactions
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              {/* Inheritance Fund Tab */}
              <TabsContent value="inheritance" id="inheritance" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Inheritance Fund</CardTitle>
                    <CardDescription>
                      Building collective wealth for all Lumera citizens and future generations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                        <p className="text-3xl font-bold text-primary">{userData.inheritanceFund} LMC</p>
                        <p className="text-sm text-muted-foreground">≈ ${userData.inheritanceFund} USD</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Total Contributions</p>
                        <p className="text-3xl font-bold">
                          {inheritanceContributions.reduce((sum, c) => sum + c.amount, 0).toFixed(2)} LMC
                        </p>
                        <p className="text-sm text-muted-foreground">Over 6 months</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-4">Monthly Contributions</h3>
                      <div className="space-y-3">
                        {inheritanceContributions.map((contribution) => (
                          <div key={contribution.month} className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{contribution.month}</span>
                            <span className="font-semibold">{contribution.amount.toFixed(2)} LMC</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">How It Works</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        5% of every purchase you make is automatically contributed to your inheritance fund. This fund
                        builds collective wealth that benefits all citizens and ensures economic security for future
                        generations. Your contributions are invested in community infrastructure, education, and
                        sustainable development projects.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
