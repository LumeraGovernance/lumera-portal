"use client"

import { Button } from "@/components/ui/button"
import { Wallet, LogOut, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWeb3 } from "@/lib/web3-context"

export function WalletConnectButton() {
  const { account, balance, isConnecting, connectWallet, disconnectWallet } = useWeb3()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (account) {
    const formattedBalance = Number.parseFloat(balance).toFixed(2)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">{formatAddress(account)}</span>
            <span className="font-semibold text-primary">{formattedBalance} LMC</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-2">
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="text-sm font-mono">{formatAddress(account)}</p>
          </div>
          <div className="px-2 py-2">
            <p className="text-sm text-muted-foreground">LMC Balance</p>
            <p className="text-lg font-bold text-primary">{formattedBalance} LMC</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button className="gap-2" onClick={connectWallet} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}
