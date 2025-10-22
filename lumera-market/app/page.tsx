import Link from "next/link"
import { ArrowRight, Leaf, Users, TrendingUp, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-6">
                Cooperative Marketplace
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-balance">
                Ethical Exchange for a Better Tomorrow
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
                Shop from verified ethical producers. Pay with LMC. Build collective wealth. Every purchase strengthens
                our community and supports fair trade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Lumera Market?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                More than a marketplace—an economic system designed for community resilience and ethical exchange.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ethical Sourcing</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every product traced to its origin. Fair pay for producers. No exploitative labor.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold mb-2">Collective Ownership</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Owned by all citizens equally. No shareholders. Surplus flows to community funds.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Value Circulation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    5% of every purchase builds inheritance funds and infrastructure for future generations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Full Transparency</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    See the cost breakdown of every product. Audit all financial reports. Participate in governance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground">Discover ethically sourced products from local producers</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Fresh Produce",
                  image: "/fresh-organic-vegetables-and-fruits.jpg",
                  count: "120+ items",
                },
                {
                  name: "Dry Goods",
                  image: "/grains-legumes-and-dry-goods-in-jars.jpg",
                  count: "85+ items",
                },
                {
                  name: "Craft & Tools",
                  image: "/handmade-crafts-and-tools.jpg",
                  count: "60+ items",
                },
                {
                  name: "Household",
                  image: "/household-items-and-supplies.jpg",
                  count: "95+ items",
                },
              ].map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Join the Cooperative Economy?</h2>
              <p className="text-lg mb-8 text-primary-foreground/90 text-pretty leading-relaxed">
                Become a Lumera citizen and gain access to ethical products, LMC wallet, and collective ownership
                benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/citizenship">Apply for Citizenship</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/products">Browse as Guest</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
