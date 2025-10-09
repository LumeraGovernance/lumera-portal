# Lumera Market

Full-stack Next.js + Supabase + Stripe + LMC setup for Vercel.
Deployed under https://lumeragovernance.com/market/

## Setup
1. `npm install`
2. Add your `.env` values from Supabase & Stripe.
3. `npm run dev`
4. Deploy to Vercel (Root Directory = /)

## Notes
- Empty database schema ready.
- Add product logic in `/pages/api/products.ts`.
- Payments handled by `/api/checkout/stripe.ts` and `/api/checkout/lmc.ts`.
