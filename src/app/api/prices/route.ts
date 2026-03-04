import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Seed data for MVP — replace with real API/scraping later
const SEED_PRICES = [
  { region: "Central Java", variety: "Cayenne (Keriting)", price_per_kg: 45000, currency: "IDR", source: "market_data" },
  { region: "West Java", variety: "Cayenne (Keriting)", price_per_kg: 52000, currency: "IDR", source: "market_data" },
  { region: "East Java", variety: "Bird's Eye (Rawit)", price_per_kg: 65000, currency: "IDR", source: "market_data" },
  { region: "Central Java", variety: "Bird's Eye (Rawit)", price_per_kg: 58000, currency: "IDR", source: "market_data" },
  { region: "India - Andhra Pradesh", variety: "Guntur Sannam", price_per_kg: 180, currency: "INR", source: "market_data" },
  { region: "India - Karnataka", variety: "Byadgi", price_per_kg: 250, currency: "INR", source: "market_data" },
  { region: "Mexico - Sinaloa", variety: "Serrano", price_per_kg: 35, currency: "MXN", source: "market_data" },
  { region: "Thailand", variety: "Bird's Eye", price_per_kg: 120, currency: "THB", source: "market_data" },
];

export async function GET() {
  const supabase = await createClient();

  // Check if prices exist, seed if empty
  const { data: existing } = await supabase
    .from("chili_prices")
    .select("id")
    .limit(1);

  if (!existing?.length) {
    await supabase.from("chili_prices").insert(SEED_PRICES);
  }

  const { data: prices } = await supabase
    .from("chili_prices")
    .select("*")
    .order("recorded_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ prices: prices || [] });
}
