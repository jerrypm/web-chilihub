"use client";

import { useState } from "react";
import { Calculator, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface Inputs {
  landArea: number;        // hectares
  seedCost: number;        // per hectare
  fertilizerCost: number;  // per hectare
  pesticideCost: number;   // per hectare
  laborCost: number;       // per hectare
  otherCost: number;       // per hectare
  expectedYield: number;   // kg per hectare
  sellingPrice: number;    // per kg
  currency: string;
}

const defaultInputs: Inputs = {
  landArea: 1,
  seedCost: 500000,
  fertilizerCost: 2000000,
  pesticideCost: 1000000,
  laborCost: 3000000,
  otherCost: 500000,
  expectedYield: 8000,
  sellingPrice: 40000,
  currency: "IDR",
};

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [calculated, setCalculated] = useState(false);

  const totalCost =
    (inputs.seedCost +
      inputs.fertilizerCost +
      inputs.pesticideCost +
      inputs.laborCost +
      inputs.otherCost) *
    inputs.landArea;

  const totalRevenue = inputs.expectedYield * inputs.landArea * inputs.sellingPrice;
  const profit = totalRevenue - totalCost;
  const roi = totalCost > 0 ? ((profit / totalCost) * 100) : 0;
  const isProfitable = profit > 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID").format(Math.round(n));

  function update(field: keyof Inputs, value: string) {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
    setCalculated(true);
  }

  const inputFields = [
    { key: "landArea" as const, label: "Land Area (hectares)", step: "0.1" },
    { key: "seedCost" as const, label: "Seed Cost (per hectare)", step: "1000" },
    { key: "fertilizerCost" as const, label: "Fertilizer Cost (per hectare)", step: "1000" },
    { key: "pesticideCost" as const, label: "Pesticide Cost (per hectare)", step: "1000" },
    { key: "laborCost" as const, label: "Labor Cost (per hectare)", step: "1000" },
    { key: "otherCost" as const, label: "Other Costs (per hectare)", step: "1000" },
    { key: "expectedYield" as const, label: "Expected Yield (kg/hectare)", step: "100" },
    { key: "sellingPrice" as const, label: "Selling Price (per kg)", step: "1000" },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profitability Calculator</h1>
        <p className="text-gray-400 mt-2">
          Calculate if chili farming is profitable this season
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5 text-leaf-400" />
            Input Your Numbers
          </h2>
          <p className="text-sm text-gray-500">
            Default values in IDR (Indonesian Rupiah). Adjust to your local costs.
          </p>

          {inputFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm text-gray-400 mb-1">
                {field.label}
              </label>
              <input
                type="number"
                value={inputs[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                step={field.step}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-leaf-500/50"
              />
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Verdict */}
          <div
            className={`glass-card p-6 text-center ${
              isProfitable ? "bg-leaf-500/5 border-leaf-500/20" : "bg-chili-500/5 border-chili-500/20"
            }`}
          >
            {isProfitable ? (
              <TrendingUp className="w-12 h-12 text-leaf-400 mx-auto mb-2" />
            ) : (
              <TrendingDown className="w-12 h-12 text-chili-400 mx-auto mb-2" />
            )}
            <h3 className="text-2xl font-bold mb-1">
              {isProfitable ? "PROFITABLE" : "NOT PROFITABLE"}
            </h3>
            <p className="text-gray-400 text-sm">
              ROI: {roi.toFixed(1)}%
            </p>
          </div>

          {/* Breakdown */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-leaf-400" />
              Financial Breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Cost</span>
                <span className="text-chili-400 font-semibold">
                  Rp {fmt(totalCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Expected Revenue</span>
                <span className="text-leaf-400 font-semibold">
                  Rp {fmt(totalRevenue)}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between">
                <span className="font-semibold">
                  {isProfitable ? "Net Profit" : "Net Loss"}
                </span>
                <span
                  className={`text-xl font-bold ${
                    isProfitable ? "text-leaf-400" : "text-chili-400"
                  }`}
                >
                  Rp {fmt(Math.abs(profit))}
                </span>
              </div>
            </div>
          </div>

          {/* Cost per kg */}
          <div className="glass-card p-6">
            <p className="text-sm text-gray-400 mb-1">Your cost per kg</p>
            <p className="text-2xl font-bold">
              Rp{" "}
              {fmt(
                inputs.expectedYield * inputs.landArea > 0
                  ? totalCost / (inputs.expectedYield * inputs.landArea)
                  : 0
              )}
              <span className="text-sm text-gray-500 font-normal">/kg</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Selling at Rp {fmt(inputs.sellingPrice)}/kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
