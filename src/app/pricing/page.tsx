"use client";

import Link from "next/link";
import { Check, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function PricingPage() {
  const { t } = useI18n();

  const plans = [
    {
      nameKey: "pricing.free",
      price: "$0",
      periodKey: "pricing.freePeriod",
      descKey: "pricing.freeDesc",
      featureKeys: [
        "pricing.freeFeature1",
        "pricing.freeFeature2",
        "pricing.freeFeature3",
      ],
      ctaKey: "pricing.freeCta",
      href: "/sign-up",
      popular: false,
    },
    {
      nameKey: "pricing.pro",
      price: "$6.99",
      periodKey: "pricing.proPeriod",
      descKey: "pricing.proDesc",
      featureKeys: [
        "pricing.proFeature1",
        "pricing.proFeature2",
        "pricing.proFeature3",
        "pricing.proFeature4",
        "pricing.proFeature5",
      ],
      ctaKey: "pricing.proCta",
      href: "/sign-up?plan=pro",
      popular: true,
    },
    {
      nameKey: "pricing.business",
      price: "$14.99",
      periodKey: "pricing.businessPeriod",
      descKey: "pricing.businessDesc",
      featureKeys: [
        "pricing.businessFeature1",
        "pricing.businessFeature2",
        "pricing.businessFeature3",
        "pricing.businessFeature4",
        "pricing.businessFeature5",
        "pricing.businessFeature6",
      ],
      ctaKey: "pricing.businessCta",
      href: "/sign-up?plan=business",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Leaf className="w-7 h-7 text-leaf-400" />
              <span className="text-xl font-bold">ChiliHub</span>
            </Link>
            <LanguageSwitcher />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pricing.title")}
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.nameKey}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col relative ${
                plan.popular
                  ? "border-leaf-500/30 bg-leaf-500/5 ring-1 ring-leaf-500/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-leaf-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  {t("pricing.mostPopular")}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{t(plan.nameKey)}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{t(plan.periodKey)}</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">{t(plan.descKey)}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.featureKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-leaf-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{t(featureKey)}</span>
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
                {t(plan.ctaKey)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
