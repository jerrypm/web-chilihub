import Link from "next/link";
import { Check, Leaf } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic disease detection",
    features: [
      "3 disease scans per month",
      "Basic price view",
      "Growing tips",
    ],
    cta: "Start Free",
    href: "/sign-up",
    popular: false,
  },
  {
    name: "Pro",
    price: "$6.99",
    period: "per month",
    description: "Unlimited scanning and full dashboard access",
    features: [
      "Unlimited disease scans",
      "Full price dashboard with alerts",
      "Complete growing calendar",
      "Disease history & trends",
      "Priority support",
    ],
    cta: "Go Pro",
    href: "/sign-up?plan=pro",
    popular: true,
  },
  {
    name: "Business",
    price: "$14.99",
    period: "per month",
    description: "For commercial growers and farm managers",
    features: [
      "Everything in Pro",
      "Profitability calculator",
      "Multi-farm management",
      "Export reports (PDF/CSV)",
      "Team access (up to 5)",
      "API access",
    ],
    cta: "Start Business",
    href: "/sign-up?plan=business",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Leaf className="w-7 h-7 text-leaf-400" />
            <span className="text-xl font-bold">ChiliHub</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col relative ${
                plan.popular
                  ? "border-leaf-500/30 bg-leaf-500/5 ring-1 ring-leaf-500/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-leaf-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-leaf-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={plan.popular
                  ? "bg-gradient-to-r from-leaf-500 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-leaf-600 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-leaf-500/25 text-center"
                  : "bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-gray-200 font-semibold px-6 py-3 hover:bg-white/10 transition-all duration-200 text-center"
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
