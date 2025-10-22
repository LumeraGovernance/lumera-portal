"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import {
  MapPin,
  CheckCircle2,
  Calendar,
  Users,
  Package,
  Star,
  TrendingUp,
  Leaf,
  Award,
  ChevronLeft,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { ProductCard } from "@/components/product-card"
import { Progress } from "@/components/ui/progress"

// Mock producer data
const producerData: Record<string, any> = {
  "green-valley-farm": {
    id: "green-valley-farm",
    name: "Green Valley Farm",
    category: "Agriculture",
    location: "Green Valley, Region 3",
    coordinates: "42.3601° N, 71.0589° W",
    image: "/organic-farm-landscape.jpg",
    coverImage: "/farm-aerial-view.jpg",
    verified: true,
    memberSince: "2023",
    productCount: 24,
    rating: 4.9,
    totalReviews: 342,
    description:
      "Green Valley Farm has been a cornerstone of sustainable agriculture in Region 3 for over 75 years. Now in its third generation of family ownership, the farm has transitioned to fully organic and regenerative practices, focusing on soil health, biodiversity, and community engagement.",
    story:
      "Founded in 1950 by the Martinez family, Green Valley Farm began as a small vegetable operation. Today, under the leadership of Maria Martinez, the farm has become a model for regenerative agriculture, hosting educational workshops and partnering with local schools to teach sustainable farming practices.",
    certifications: ["Organic Certified", "Fair Trade", "Regenerative Agriculture", "B Corporation", "Carbon Neutral"],
    team: {
      size: 12,
      description: "Our team includes 8 full-time farmers, 2 agricultural specialists, and 2 administrative staff.",
    },
    practices: [
      {
        title: "Regenerative Agriculture",
        description:
          "We use cover cropping, crop rotation, and minimal tillage to improve soil health and sequester carbon.",
      },
      {
        title: "Water Conservation",
        description:
          "Drip irrigation and rainwater harvesting reduce water usage by 60% compared to conventional farms.",
      },
      {
        title: "Biodiversity",
        description: "We maintain hedgerows, pollinator gardens, and wildlife corridors to support local ecosystems.",
      },
      {
        title: "Zero Waste",
        description: "All organic waste is composted and returned to the soil, creating a closed-loop system.",
      },
    ],
    impact: {
      carbonSequestered: "45 tons/year",
      waterSaved: "2.5 million liters/year",
      biodiversityScore: "Excellent",
      soilHealthImprovement: "35% over 5 years",
    },
    financialTransparency: {
      averageWage: "125 LMC/day",
      wageComparison: "45% above regional average",
      benefitsProvided: ["Health insurance", "Paid leave", "Retirement contributions", "Education stipends"],
      revenueDistribution: {
        labor: 45,
        materials: 25,
        operations: 15,
        reinvestment: 10,
        cooperative: 5,
      },
    },
    products: [
      {
        id: "1",
        name: "Organic Tomatoes",
        producer: "Green Valley Farm",
        category: "Fresh Produce",
        price: 45,
        unit: "kg",
        image: "/fresh-organic-tomatoes.jpg",
        certified: true,
        inStock: true,
        rating: 4.8,
        reviews: 124,
      },
      {
        id: "7",
        name: "Fresh Spinach",
        producer: "Green Valley Farm",
        category: "Fresh Produce",
        price: 38,
        unit: "kg",
        image: "/fresh-spinach-leaves.jpg",
        certified: true,
        inStock: true,
        rating: 4.5,
        reviews: 92,
      },
    ],
  },
}

export default function ProducerProfilePage() {
  const params = useParams()
  const producerId = params.id as string
  const producer = producerData[producerId] || producerData["green-valley-farm"]

  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1">
        {/* Cover Image */}
        <section className="relative h-64 md:h-80 bg-muted overflow-hidden">
          <img
            src={producer.coverImage || `/placeholder.svg?height=400&width=1200&query=${producer.name} farm`}
            alt={producer.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </section>

        {/* Producer Header */}
        <section className="border-b">
          <div className="container">
            <div className="relative -mt-16 pb-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Profile Image */}
                <div className="h-32 w-32 rounded-lg border-4 border-background bg-muted overflow-hidden flex-shrink-0">
                  <img
                    src={producer.image || `/placeholder.svg?height=128&width=128&query=${producer.name} logo`}
                    alt={producer.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Producer Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{producer.name}</h1>
                        {producer.verified && (
                          <Badge variant="secondary" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{producer.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Member since {producer.memberSince}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/products">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back
                      </Link>
                    </Button>
                  </div>

                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-primary text-primary" />
                      <span className="font-semibold">{producer.rating}</span>
                      <span className="text-sm text-muted-foreground">({producer.totalReviews} reviews)</span>
                    </div>
                    <Badge variant="outline">{producer.category}</Badge>
                    <span className="text-sm text-muted-foreground">{producer.productCount} products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {producer.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{producer.description}</p>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-2">Our Story</h3>
                      <p className="text-muted-foreground leading-relaxed">{producer.story}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="practices" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="practices">Practices</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                    <TabsTrigger value="transparency">Transparency</TabsTrigger>
                  </TabsList>

                  <TabsContent value="practices" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Leaf className="h-5 w-5" />
                          Sustainable Practices
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {producer.practices.map((practice: any, index: number) => (
                          <div key={index}>
                            <h4 className="font-semibold mb-1">{practice.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{practice.description}</p>
                            {index < producer.practices.length - 1 && <Separator className="mt-4" />}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="impact" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Environmental Impact
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(producer.impact).map(([key, value]) => {
                          const labels: Record<string, string> = {
                            carbonSequestered: "Carbon Sequestered",
                            waterSaved: "Water Saved",
                            biodiversityScore: "Biodiversity Score",
                            soilHealthImprovement: "Soil Health Improvement",
                          }
                          return (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm font-medium">{labels[key]}</span>
                              <span className="text-sm font-bold text-primary">{value as string}</span>
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="transparency" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Financial Transparency
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Fair Wages</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Average Daily Wage</span>
                              <span className="font-bold">{producer.financialTransparency.averageWage}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">vs. Regional Average</span>
                              <span className="font-bold text-green-600">
                                +{producer.financialTransparency.wageComparison}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-3">Benefits Provided</h4>
                          <div className="flex flex-wrap gap-2">
                            {producer.financialTransparency.benefitsProvided.map((benefit: string) => (
                              <Badge key={benefit} variant="secondary">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h4 className="font-semibold mb-3">Revenue Distribution</h4>
                          <div className="space-y-3">
                            {Object.entries(producer.financialTransparency.revenueDistribution).map(([key, value]) => {
                              const labels: Record<string, string> = {
                                labor: "Labor & Wages",
                                materials: "Materials & Supplies",
                                operations: "Operations",
                                reinvestment: "Reinvestment",
                                cooperative: "Cooperative Fee",
                              }
                              return (
                                <div key={key}>
                                  <div className="flex items-center justify-between mb-1 text-sm">
                                    <span className="font-medium">{labels[key]}</span>
                                    <span className="font-bold">{value}%</span>
                                  </div>
                                  <Progress value={value as number} className="h-2" />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Products */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Products from {producer.name}</h2>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products?producer=${producer.id}`}>
                        View All
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {producer.products.map((product: any) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{producer.team.size} Team Members</div>
                        <div className="text-xs text-muted-foreground">{producer.team.description}</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{producer.productCount} Products</div>
                        <div className="text-xs text-muted-foreground">Available on marketplace</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">Location</div>
                        <div className="text-xs text-muted-foreground">{producer.coordinates}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {producer.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-transparent" variant="outline">
                      Visit Website
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      Send Message
                    </Button>
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
