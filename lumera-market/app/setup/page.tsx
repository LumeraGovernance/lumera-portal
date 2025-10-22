import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFooter } from "@/components/marketplace-footer"
import { SetupGuide } from "@/components/setup-guide"

export default function SetupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketplaceHeader />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Setup Guide</h1>
            <p className="text-muted-foreground">
              Configure your Lumera Market to accept real LMC cryptocurrency payments
            </p>
          </div>

          <SetupGuide />
        </div>
      </main>

      <MarketplaceFooter />
    </div>
  )
}
