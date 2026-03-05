"use client";

import { Camera, BarChart3, CalendarDays, Calculator } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const featureKeys = [
  {
    icon: Camera,
    titleKey: "features.diseaseDetector",
    descKey: "features.diseaseDetectorDesc",
    badgeKey: "features.badgeCore",
  },
  {
    icon: BarChart3,
    titleKey: "features.priceDashboard",
    descKey: "features.priceDashboardDesc",
    badgeKey: "features.badgeSoon",
  },
  {
    icon: CalendarDays,
    titleKey: "features.growingCalendar",
    descKey: "features.growingCalendarDesc",
    badgeKey: "features.badgeSoon",
  },
  {
    icon: Calculator,
    titleKey: "features.profitCalculator",
    descKey: "features.profitCalculatorDesc",
    badgeKey: "features.badgeSoon",
  },
];

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("features.heading")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featureKeys.map((feature) => (
            <div
              key={feature.titleKey}
              className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-500/10 flex items-center justify-center group-hover:bg-leaf-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-leaf-400" />
                </div>
                <span className="text-xs font-medium text-leaf-400 glass-card px-3 py-1">
                  {t(feature.badgeKey)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
