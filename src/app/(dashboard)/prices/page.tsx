"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, MapPin } from "lucide-react";

interface Price {
  id: string;
  region: string;
  variety: string;
  price_per_kg: number;
  currency: string;
  recorded_at: string;
}

export default function PricesPage() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data) => {
        setPrices(data.prices);
        setLoading(false);
      });
  }, []);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "IDR" ? "IDR" : currency === "INR" ? "INR" : currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Price Dashboard</h1>
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/3 mb-2" />
              <div className="h-6 bg-white/10 rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Group by region
  const byRegion = prices.reduce((acc, p) => {
    if (!acc[p.region]) acc[p.region] = [];
    acc[p.region].push(p);
    return acc;
  }, {} as Record<string, Price[]>);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Chili Price Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Real-time chili prices across regions
        </p>
      </div>

      <div className="grid gap-4">
        {Object.entries(byRegion).map(([region, regionPrices]) => (
          <div key={region} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-leaf-400" />
              <h3 className="font-semibold text-lg">{region}</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {regionPrices.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div>
                    <p className="text-sm text-gray-400">{p.variety}</p>
                    <p className="text-xl font-bold">
                      {formatPrice(p.price_per_kg, p.currency)}
                      <span className="text-sm text-gray-500 font-normal">
                        /kg
                      </span>
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-leaf-400" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
