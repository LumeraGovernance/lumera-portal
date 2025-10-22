"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface AddProductFormProps {
  sellerId: string
}

export function AddProductForm({ sellerId }: AddProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
    unit: "",
    origin: "",
    certifications: "",
    image_url: "",
    production_cost: "",
    transport_cost: "",
    storage_cost: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createBrowserClient()

      const { error } = await supabase.from("products").insert({
        seller_id: sellerId,
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        stock_quantity: Number.parseInt(formData.stock_quantity),
        unit: formData.unit,
        origin: formData.origin,
        certifications: formData.certifications.split(",").map((c) => c.trim()),
        image_url: formData.image_url,
        production_cost: Number.parseFloat(formData.production_cost),
        transport_cost: Number.parseFloat(formData.transport_cost),
        storage_cost: Number.parseFloat(formData.storage_cost),
        verification_status: "pending",
      })

      if (error) throw error

      toast({
        title: "Product submitted",
        description: "Your product has been submitted for verification.",
      })

      router.push("/seller/dashboard")
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Add your product information. It will be reviewed by admins before appearing on the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Organic Tomatoes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Fresh, locally grown organic tomatoes..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (LMC)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="2.50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresh">Fresh Produce</SelectItem>
                  <SelectItem value="grains">Grains & Legumes</SelectItem>
                  <SelectItem value="dairy">Dairy & Eggs</SelectItem>
                  <SelectItem value="crafts">Crafts & Tools</SelectItem>
                  <SelectItem value="household">Household Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                required
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                required
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="kg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="origin">Origin</Label>
            <Input
              id="origin"
              required
              value={formData.origin}
              onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              placeholder="Green Valley Farm, 15km from hub"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certifications">Certifications (comma-separated)</Label>
            <Input
              id="certifications"
              value={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
              placeholder="Organic Certified, Fair Trade, Non-GMO"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Cost Breakdown (for transparency)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="production_cost">Production Cost (LMC)</Label>
                <Input
                  id="production_cost"
                  type="number"
                  step="0.01"
                  required
                  value={formData.production_cost}
                  onChange={(e) => setFormData({ ...formData, production_cost: e.target.value })}
                  placeholder="1.50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="transport_cost">Transport Cost (LMC)</Label>
                <Input
                  id="transport_cost"
                  type="number"
                  step="0.01"
                  required
                  value={formData.transport_cost}
                  onChange={(e) => setFormData({ ...formData, transport_cost: e.target.value })}
                  placeholder="0.30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage_cost">Storage Cost (LMC)</Label>
                <Input
                  id="storage_cost"
                  type="number"
                  step="0.01"
                  required
                  value={formData.storage_cost}
                  onChange={(e) => setFormData({ ...formData, storage_cost: e.target.value })}
                  placeholder="0.20"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit for Verification"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/seller/dashboard")}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
