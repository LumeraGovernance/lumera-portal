// LMC to fiat conversion rates: 1 LMC = 2 USD
export const LMC_CONVERSION_RATES = {
  USD: 2.0, // US Dollar
  EUR: 1.85, // Euro
  GBP: 1.58, // British Pound
  JPY: 290, // Japanese Yen
  CAD: 2.75, // Canadian Dollar
  AUD: 3.05, // Australian Dollar
  CHF: 1.75, // Swiss Franc
  CNY: 14.2, // Chinese Yuan
} as const

export type FiatCurrency = keyof typeof LMC_CONVERSION_RATES

export const CURRENCY_SYMBOLS: Record<FiatCurrency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
  AUD: "A$",
  CHF: "CHF",
  CNY: "¥",
}

export function lmcToFiat(lmcAmount: number, currency: FiatCurrency): number {
  return lmcAmount * LMC_CONVERSION_RATES[currency]
}

export function formatLmcWithFiat(lmcAmount: number, currencies: FiatCurrency[] = ["USD", "EUR", "GBP"]): string {
  const conversions = currencies.map((currency) => {
    const amount = lmcToFiat(lmcAmount, currency)
    const symbol = CURRENCY_SYMBOLS[currency]
    // Format JPY without decimals, others with 2 decimals
    const formatted = currency === "JPY" ? amount.toFixed(0) : amount.toFixed(2)
    return `${symbol}${formatted}`
  })
  return conversions.join(" / ")
}

// Legacy function for backward compatibility
export function lmcToUsd(lmcAmount: number): number {
  return lmcToFiat(lmcAmount, "USD")
}

export const formatMultiCurrency = formatLmcWithFiat
