export interface Profile {
  id: string
  email: string
  full_name: string | null
  subscription_tier: 'free' | 'pro' | 'business'
  stripe_customer_id: string | null
  scans_this_month: number
  created_at: string
}

export interface Scan {
  id: string
  user_id: string
  image_url: string
  disease_name: string | null
  confidence: number
  severity: 'healthy' | 'mild' | 'moderate' | 'severe'
  treatment: string | null
  details: string | null
  created_at: string
}

export interface ChiliPrice {
  id: string
  region: string
  variety: string
  price_per_kg: number
  currency: string
  source: string
  recorded_at: string
}

export const SCAN_LIMITS = {
  free: 3,
  pro: Infinity,
  business: Infinity,
} as const

export const CHILI_DISEASES = [
  'anthracnose',
  'bacterial_wilt',
  'phytophthora',
  'tylcv',
  'leaf_curl',
  'powdery_mildew',
  'cercospora_leaf_spot',
  'fusarium_wilt',
  'healthy',
] as const

export type ChiliDisease = typeof CHILI_DISEASES[number]
