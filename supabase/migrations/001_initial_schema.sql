-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'business')),
  stripe_customer_id TEXT,
  scans_this_month INTEGER NOT NULL DEFAULT 0,
  scans_reset_at TIMESTAMPTZ NOT NULL DEFAULT date_trunc('month', now()) + interval '1 month',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Scans table
CREATE TABLE scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  disease_name TEXT,
  confidence REAL DEFAULT 0,
  severity TEXT DEFAULT 'healthy' CHECK (severity IN ('healthy', 'mild', 'moderate', 'severe')),
  treatment TEXT,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Chili prices table
CREATE TABLE chili_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT NOT NULL,
  variety TEXT NOT NULL,
  price_per_kg REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'IDR',
  source TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE chili_prices ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Scans: users can CRUD their own scans
CREATE POLICY "Users can view own scans" ON scans FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create scans" ON scans FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own scans" ON scans FOR DELETE USING (auth.uid() = user_id);

-- Prices: anyone can read
CREATE POLICY "Anyone can view prices" ON chili_prices FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anon can view prices" ON chili_prices FOR SELECT TO anon USING (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Indexes
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX idx_chili_prices_recorded ON chili_prices(recorded_at DESC);
