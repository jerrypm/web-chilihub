# ChiliHub — AI-Powered Chili Farming Platform

The first platform built specifically for chili farmers. Detect diseases with AI, track market prices, follow growing guides, and calculate profitability — all in one place.

**Live:** https://web-chilihub.vercel.app

## Features

- **AI Disease Scanner** — Upload a photo of your chili plant, get instant disease detection powered by TensorFlow.js (runs in browser, zero API cost)
- **Price Dashboard** — Real-time chili prices across regions (Indonesia, India, Mexico, Thailand)
- **Growing Calendar** — Phase-by-phase guide from seed to harvest with disease prevention tips
- **Profitability Calculator** — Input your costs and yields, get instant profit/ROI analysis
- **Urban Growing Guide** — Tips for growing chili in small spaces (apartments, balconies, pots)
- **Multi-language** — Available in English and Bahasa Indonesia

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **AI Model:** TensorFlow.js with MobileNetV2 transfer learning
- **Payments:** Stripe (subscriptions)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- Stripe account (for payments)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/jerrypm/web-chilihub.git
   cd web-chilihub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` with your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   STRIPE_SECRET_KEY=your_stripe_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   STRIPE_PRO_PRICE_ID=price_xxx
   STRIPE_BUSINESS_PRICE_ID=price_xxx
   ```

4. Run the database migration in Supabase SQL Editor:
   ```bash
   # Copy and run: supabase/migrations/001_initial_schema.sql
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Sign in/up pages
│   ├── (dashboard)/     # Protected dashboard pages
│   │   ├── scan/        # Disease scanner + history
│   │   ├── prices/      # Price dashboard
│   │   ├── calendar/    # Growing calendar
│   │   └── calculator/  # Profitability calculator
│   ├── api/             # API routes (scan, prices, stripe)
│   └── pricing/         # Public pricing page
├── components/          # Reusable UI components
├── lib/                 # Supabase clients, Stripe, AI model
└── types/               # TypeScript interfaces
```

## License

MIT
