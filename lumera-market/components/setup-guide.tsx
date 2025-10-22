import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Wallet, Settings, CheckCircle2 } from "lucide-react"

export function SetupGuide() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          LMC Token Setup Guide
        </CardTitle>
        <CardDescription>Configure your marketplace to accept real LMC cryptocurrency payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Wallet className="h-4 w-4" />
          <AlertDescription>
            This marketplace is configured to accept LMC tokens via MetaMask. Follow the steps below to complete the
            setup.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Update LMC Token Contract Address</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Open <code className="bg-muted px-2 py-1 rounded text-xs">lib/web3-config.ts</code> and replace the
                placeholder with your actual LMC token contract address:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                <code>export const LMC_TOKEN_ADDRESS = '0xYourActualLMCTokenAddress'</code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Set Marketplace Wallet Address</h3>
              <p className="text-sm text-muted-foreground mb-3">
                In <code className="bg-muted px-2 py-1 rounded text-xs">app/checkout/page.tsx</code>, update the
                marketplace wallet address where payments will be received:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                <code>const MARKETPLACE_WALLET = '0xYourMarketplaceWalletAddress'</code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Configure Blockchain Network</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The marketplace supports multiple networks. If LMC is on a custom network, add it to the chains
                configuration in <code className="bg-muted px-2 py-1 rounded text-xs">lib/web3-config.ts</code>:
              </p>
              <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                <code>{`chains: [mainnet, sepolia, polygon, yourCustomChain]`}</code>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
              4
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Test the Integration</h3>
              <p className="text-sm text-muted-foreground mb-2">Before going live, test the payment flow:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Connect MetaMask wallet</li>
                <li>Add test LMC tokens to your wallet</li>
                <li>Complete a test purchase</li>
                <li>Verify transaction on blockchain explorer</li>
              </ul>
            </div>
          </div>
        </div>

        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Ready to Go:</strong> Once configured, customers can connect their MetaMask wallet and pay with LMC
            tokens directly from the checkout page.
          </AlertDescription>
        </Alert>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Additional Features</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">
                Feature
              </Badge>
              <div>
                <p className="text-sm font-medium">Real-time Balance</p>
                <p className="text-xs text-muted-foreground">Shows user's LMC balance from MetaMask</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">
                Feature
              </Badge>
              <div>
                <p className="text-sm font-medium">Transaction Tracking</p>
                <p className="text-xs text-muted-foreground">Links to blockchain explorer for verification</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">
                Feature
              </Badge>
              <div>
                <p className="text-sm font-medium">Multi-Network Support</p>
                <p className="text-xs text-muted-foreground">Works on Ethereum, Polygon, and custom chains</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="secondary" className="mt-0.5">
                Feature
              </Badge>
              <div>
                <p className="text-sm font-medium">Secure Payments</p>
                <p className="text-xs text-muted-foreground">All transactions signed via MetaMask</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
