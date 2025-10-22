"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Wallet, CheckCircle2, Lock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { useCartStore } from "@/lib/cart-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWeb3 } from "@/lib/web3-context"
import { useToast } from "@/hooks/use-toast"
import { formatLmcWithFiat } from "@/lib/currency-utils"

const MARKETPLACE_WALLET = "0x1234567890abcdef1234567890abcdef12345678" // Declare MARKETPLACE_WALLET variable

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const { account, balance, sendTransaction } = useWeb3()

  const subtotal = getTotalPrice()
  const inheritanceFund = subtotal * 0.05
  const deliveryFee = deliveryMethod === "delivery" ? 15 : 0
  const total = subtotal + deliveryFee

  const walletBalance = Number.parseFloat(balance)
  const hasEnoughBalance = walletBalance >= total
  const isConnected = !!account

  const handleCheckout = async () => {
    console.log("[v0] Checkout initiated")

    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your MetaMask wallet first",
        variant: "destructive",
      })
      return
    }

    if (!hasEnoughBalance) {
      toast({
        title: "Insufficient balance",
        description: "Please add more LMC to your wallet",
        variant: "destructive",
      })
      return
    }

    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      console.log("[v0] Initiating LMC transfer", {
        to: MARKETPLACE_WALLET,
        amount: total.toFixed(2),
      })

      // Send LMC tokens to marketplace wallet
      const txHash = await sendTransaction(MARKETPLACE_WALLET, total.toFixed(2))

      console.log("[v0] Transaction successful:", txHash)

      toast({
        title: "Payment successful!",
        description: "Your order has been placed",
      })

      // Clear cart and redirect to success page
      clearCart()
      router.push(`/checkout/success?tx=${txHash}`)
    } catch (error: any) {
      console.error("[v0] Checkout error:", error)
      toast({
        title: "Transaction failed",
        description: error.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <MarketplaceHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
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
                <Link href="/cart">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Cart
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase with LMC cryptocurrency</p>
          </div>
        </section>

        {/* Checkout Content */}
        <section className="py-8">
          <div className="container">
            {!isConnected && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please connect your MetaMask wallet to complete the checkout process.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Delivery Method</Label>
                      <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="pickup" id="pickup" />
                          <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                            <div className="font-medium">Pickup at Distribution Center</div>
                            <div className="text-sm text-muted-foreground">Free - Available within 24 hours</div>
                          </Label>
                          <Badge variant="secondary">Free</Badge>
                        </div>

                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                          <RadioGroupItem value="delivery" id="delivery" />
                          <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                            <div className="font-medium">Home Delivery</div>
                            <div className="text-sm text-muted-foreground">Delivered within 2-3 days</div>
                          </Label>
                          <Badge variant="outline">15 LMC</Badge>
                        </div>
                      </RadioGroup>
                    </div>

                    {deliveryMethod === "delivery" && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <Label htmlFor="address">Delivery Address</Label>
                          <Input id="address" placeholder="123 Main Street" />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="City" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Input id="region" placeholder="Region" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postal">Postal Code</Label>
                            <Input id="postal" placeholder="12345" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Textarea id="notes" placeholder="Any special instructions for delivery..." rows={3} />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-primary" />
                          <span className="font-semibold">LMC Wallet (MetaMask)</span>
                        </div>
                        {isConnected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                      </div>
                      {isConnected ? (
                        <>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">Current Balance</span>
                            <span className="text-lg font-bold">{walletBalance.toFixed(2)} LMC</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Wallet: {account?.slice(0, 6)}...{account?.slice(-4)}
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Please connect your wallet to continue</p>
                      )}
                    </div>

                    {isConnected && !hasEnoughBalance && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-sm text-destructive font-medium mb-2">Insufficient Balance</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          You need {(total - walletBalance).toFixed(2)} more LMC to complete this purchase.
                        </p>
                        <p className="text-xs text-muted-foreground">Please add LMC tokens to your MetaMask wallet.</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          privacy policy
                        </Link>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <img
                              src={item.image || `/placeholder.svg?height=64&width=64&query=${item.name}`}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">{(item.price * item.quantity).toFixed(2)} LMC</p>
                            <p className="text-xs text-muted-foreground">
                              ≈ {formatLmcWithFiat(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-semibold">{subtotal.toFixed(2)} LMC</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span></span>
                        <span>≈ {formatLmcWithFiat(subtotal)}</span>
                      </div>

                      {deliveryMethod === "delivery" && (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Delivery Fee</span>
                            <span className="font-semibold">{deliveryFee.toFixed(2)} LMC</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span></span>
                            <span>≈ {formatLmcWithFiat(deliveryFee)}</span>
                          </div>
                        </>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Inheritance Fund (5%)</span>
                        <span className="font-semibold text-primary">{inheritanceFund.toFixed(2)} LMC</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span></span>
                        <span>≈ {formatLmcWithFiat(inheritanceFund)}</span>
                      </div>
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
                    <div className="text-xs text-muted-foreground text-center mb-4">≈ {formatLmcWithFiat(total)}</div>

                    <Button
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleCheckout}
                      disabled={!isConnected || !hasEnoughBalance || !agreedToTerms || isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing Transaction...</>
                      ) : (
                        <>
                          <Lock className="h-4 w-4" />
                          Complete Purchase
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      <span>Secure blockchain transaction via MetaMask</span>
                    </div>
                  </CardContent>
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
