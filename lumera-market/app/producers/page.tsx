"use client"

import Link from "next/link"
import { Search, MapPin, CheckCircle2, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const producers = [
  {
    id: "green-valley-farm",
    name: "Green Valley Farm",
    category: "Agriculture",
    location: "Green Valley, Region 3",
    image: "/organic-farm-landscape.jpg",
    verified: true,
    memberSince: "2023",
    productCount: 24,
    rating: 4.9,
    description: "Family-owned organic farm practicing regenerative agriculture for three generations.",
  },
  {
    id: "heritage-mills",
    name: "Heritage Mills",
    category: "Food Processing",
    location: "Mill Town, Region 2",
    image: "/traditional-grain-mill.jpg",
    verified: true,
    memberSince: "2022",
    productCount: 12,
    rating: 4.8,
    description: "Traditional stone-ground flour mill preserving ancient grain varieties.",
  },
  {
    id: "artisan-collective",
    name: "Artisan Collective",
    category: "Crafts",
    location: "Craft District, Region 1",
    image: "/artisan-workshop.jpg",
    verified: true,
    memberSince: "2023",
    productCount: 35,
    rating: 5.0,
    description: "Cooperative of skilled artisans creating handmade goods using traditional techniques.",
  },
  {
    id: "meadow-bee-farm",
    name: "Meadow Bee Farm",
    category: "Agriculture",
    location: "Meadow Hills, Region 3",
    image: "/beekeeping-farm.jpg",
    verified: true,
    memberSince: "2024",
    productCount: 8,
    rating: 4.7,
    description: "Sustainable beekeeping operation supporting local pollinator populations.",
  },
  {
    id: "clay-and-fire-studio",
    name: "Clay & Fire Studio",
    category: "Crafts",
    location: "Pottery Village, Region 2",
    image: "/pottery-studio.jpg",
    verified: true,
    memberSince: "2023",
    productCount: 18,
    rating: 4.9,
    description: "Ceramic studio creating functional pottery from locally sourced clay.",
  },
  {
    id: "valley-grains-coop",
    name: "Valley Grains Co-op",
    category: "Agriculture",
    location: "Valley Plains, Region 3",
    image: "/grain-cooperative.jpg",
    verified: true,
    memberSince: "2022",
    productCount: 15,
    rating: 4.6,
    description: "Farmer cooperative growing diverse legumes and grains using organic methods.",
  },
]

export default function ProducersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducers = producers.filter(
    (producer) =>
      searchQuery === "" ||
      producer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producer.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b bg-muted/30 py-8">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Our Producers</h1>
            <p className="text-muted-foreground">Meet the verified ethical producers who make Lumera Market possible</p>
          </div>
        </section>

        {/* Search Bar */}
        <section className="border-b bg-background py-4">
          <div className="container">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search producers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 bg-primary/5">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{producers.length}</div>
                      <div className="text-sm text-muted-foreground">Verified Producers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                      <TrendingUp className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm text-muted-foreground">Fair Trade Certified</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.8</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Producers Grid */}
        <section className="py-8">
          <div className="container">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducers.length} of {producers.length} producers
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducers.map((producer) => (
                <Card key={producer.id} className="group overflow-hidden transition-all hover:shadow-lg">
                  <Link href={`/producers/${producer.id}`}>
                    <div className="aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={producer.image || `/placeholder.svg?height=300&width=400&query=${producer.name}`}
                        alt={producer.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Link href={`/producers/${producer.id}`} className="flex-1">
                        <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">
                          {producer.name}
                        </h3>
                      </Link>
                      {producer.verified && (
                        <Badge variant="secondary" className="flex-shrink-0 gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{producer.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{producer.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{producer.category}</Badge>
                      <span className="text-muted-foreground">{producer.productCount} products</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href={`/producers/${producer.id}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
