# Lumera Coin (LMC) – Buyer + Admin Frontend

This bundle gives you two pages:

- `index.html` — Buyer page. Connects Phantom, quotes SOL for a given LMC amount (1 LMC = $1), sends SOL to the treasury, shows buyer's LMC balance.
- `admin.html` — Admin sender. Connect Phantom **as the treasury**; then send LMC to any buyer address. It automatically creates the buyer's token account if needed.

## Configure

Edit `config.js`:

```js
export const CLUSTER_RPC = "https://api.mainnet-beta.solana.com";
export const TREASURY_ADDRESS = "23iGqnDQQeTHqxbrXt5N1pbVXZxCvJdn52KHQrkng97r";
export const LMC_MINT = "F6eET2ipLrqSMnpoZfqoLYn7bWxRTwgs8SwNUf7YtVTp";
export const LMC_USD_PRICE = 1.0;
```

## Deploy

1. Upload all files to your web host (e.g., `lumeragovernance.com/lmc/`).
2. Open `index.html` for buyers.
3. Open `admin.html` (treasury only) to fulfil purchases after SOL payment.
   - Connect the Phantom wallet that **owns the treasury address** in `config.js`.
   - Enter buyer’s address and LMC amount and click **Send LMC**.

## Notes

- The buyer page uses CoinGecko to fetch real-time SOL/USD price.
- The admin sender runs entirely client-side with Phantom signing. It is **not minting**; it transfers LMC from the treasury’s token account to the buyer.
- For a fully automatic flow (send LMC immediately after SOL payment), you’ll want a small backend that watches treasury deposits and triggers a token transfer. This frontend gives you a safe manual path in the meantime.
