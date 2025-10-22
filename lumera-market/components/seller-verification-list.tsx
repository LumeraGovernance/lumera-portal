"use client"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface Seller {
  id: string
  user_id: string
  business_name: string
  business_description: string
  contact_email: string
  contact_phone: string
  business_address: string
  certifications: string[]
  verification_status: string
  created_at: string
}

interface SellerVerificationListProps {
  sellers: Seller[]
}

export function SellerVerificationList({ sellers }: SellerVerificationListProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handleVerification = async (sellerId: string, status: "approved" | "rejected") => {
    setLoading(sellerId)

    try {
      const supabase = createBrowserClient()

      const { error } = await supabase.from("sellers").update({ verification_status: status }).eq("id", sellerId)

      if (error) throw error

      toast({
        title: status === "approved" ? "Seller approved" : "Seller rejected",
        description: `The seller has been ${status}.`,
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating seller:", error)
      toast({
        title: "Error",
        description: "Failed to update seller status.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  if (sellers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pending seller verifications</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sellers.map((seller) => (
        <div key={seller.id} className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{seller.business_name}</h3>
              <p className="text-sm text-muted-foreground">
                Applied {new Date(seller.created_at).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="secondary">{seller.verification_status}</Badge>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm">
              <span className="font-medium">Description:</span> {seller.business_description}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {seller.contact_email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span> {seller.contact_phone}
            </p>
            <p className="text-sm">
              <span className="font-medium">Address:</span> {seller.business_address}
            </p>
            {seller.certifications && seller.certifications.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">Certifications:</span>
                {seller.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleVerification(seller.id, "approved")}
              disabled={loading === seller.id}
            >
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleVerification(seller.id, "rejected")}
              disabled={loading === seller.id}
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
