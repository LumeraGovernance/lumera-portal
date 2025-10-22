"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Package, Home, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { Separator } from "@/components/ui/separator"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const txHash = searchParams.get("tx")

  const orderNumber = "LMC-" + Math.random().toString(36).substring(2, 10).toUpperCase()
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        <section className="py-20">
          <div className="container">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-12 pb-8">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                  <p className="text-muted-foreground">
                    Thank you for supporting ethical producers and building collective wealth.
                  </p>
                </div>

                <Separator className="mb-6" />

                {/* Order Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order Number</span>
                    <span className="font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order Date</span>
                    <span className="font-semibold">{orderDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-semibold">LMC Cryptocurrency</span>
                  </div>
                  {txHash && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Transaction Hash</span>
                      <a
                        href={`https://etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {txHash.slice(0, 6)}...{txHash.slice(-4)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                <Separator className="mb-6" />

                {/* Next Steps */}
                <div className="space-y-4 mb-8">
                  <h2 className="font-semibold text-lg">What's Next?</h2>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-sm text-muted-foreground">
                        You'll receive an email confirmation with your order details shortly.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Track Your Order</p>
                      <p className="text-sm text-muted-foreground">
                        Monitor your order status and delivery updates from your dashboard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Message */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-primary">Your Impact:</strong> This purchase contributed to the collective
                    inheritance fund and supported fair wages for ethical producers. Together, we're building a more
                    equitable economy.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1 gap-2" asChild>
                    <Link href="/dashboard">
                      View Order Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
