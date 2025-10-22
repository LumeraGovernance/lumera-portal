"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

// LMC Token ABI (ERC-20 standard functions we need)
const LMC_TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
]

interface Web3ContextType {
  account: string | null
  balance: string
  isConnecting: boolean
  error: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  sendTransaction: (to: string, amount: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

function extractTokenAddress(value: string): string {
  // If it's a URL, extract the address from the end
  if (value.startsWith("http://") || value.startsWith("https://")) {
    const parts = value.split("/")
    return parts[parts.length - 1]
  }
  // Otherwise return as-is (should be just the address)
  return value
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>("0")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const LMC_TOKEN_ADDRESS = extractTokenAddress(
    process.env.NEXT_PUBLIC_LMC_TOKEN_ADDRESS || "0x169925844ffA87C9C8Fb87505D8a8bf7c0B03b7F",
  )
  const MARKETPLACE_WALLET = extractTokenAddress(
    process.env.NEXT_PUBLIC_MARKETPLACE_WALLET || "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  )

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", () => window.location.reload())

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  // Update balance when account changes
  useEffect(() => {
    if (account) {
      fetchBalance()
    }
  }, [account])

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setAccount(accounts[0])
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        return
      }

      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        setAccount(accounts[0])
      }
    } catch (err) {
      console.error("Error checking wallet connection:", err)
    }
  }

  const fetchBalance = async () => {
    try {
      if (!account || typeof window === "undefined" || !window.ethereum) return

      const provider = new ethers.BrowserProvider(window.ethereum)
      const contract = new ethers.Contract(LMC_TOKEN_ADDRESS, LMC_TOKEN_ABI, provider)

      const balanceWei = await contract.balanceOf(account)
      const decimals = await contract.decimals()
      const formattedBalance = ethers.formatUnits(balanceWei, decimals)

      setBalance(formattedBalance)
    } catch (err) {
      console.error("Error fetching balance:", err)
      // If token contract doesn't exist, show 0 balance
      setBalance("0")
    }
  }

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      setError(null)

      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.")
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      setAccount(accounts[0])
    } catch (err: any) {
      console.error("Error connecting wallet:", err)
      setError(err.message || "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance("0")
    setError(null)
  }

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    try {
      if (!account || typeof window === "undefined" || !window.ethereum) {
        throw new Error("Wallet not connected")
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(LMC_TOKEN_ADDRESS, LMC_TOKEN_ABI, signer)

      const decimals = await contract.decimals()
      const amountWei = ethers.parseUnits(amount, decimals)

      const tx = await contract.transfer(to, amountWei)
      await tx.wait()

      // Refresh balance after transaction
      await fetchBalance()

      return tx.hash
    } catch (err: any) {
      console.error("Error sending transaction:", err)
      throw new Error(err.message || "Transaction failed")
    }
  }

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        sendTransaction,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
