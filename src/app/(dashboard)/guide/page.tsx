"use client";

import { useState } from "react";
import {
  Box,
  Flower2,
  Sun,
  Droplets,
  ArrowUpFromLine,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

interface GuideSection {
  id: string;
  icon: typeof Box;
  color: string;
  bg: string;
  titleKey: string;
  descKey: string;
  tips: { titleKey: string; descKey: string }[];
}

export default function GuidePage() {
  const { t } = useI18n();
  const [openSection, setOpenSection] = useState<string | null>("containerSelection");

  const sections: GuideSection[] = [
    {
      id: "containerSelection",
      icon: Box,
      color: "text-leaf-400",
      bg: "bg-leaf-500/10",
      titleKey: "guide.containerSelection.title",
      descKey: "guide.containerSelection.description",
      tips: [
        { titleKey: "guide.containerSelection.tip1Title", descKey: "guide.containerSelection.tip1Desc" },
        { titleKey: "guide.containerSelection.tip2Title", descKey: "guide.containerSelection.tip2Desc" },
        { titleKey: "guide.containerSelection.tip3Title", descKey: "guide.containerSelection.tip3Desc" },
      ],
    },
    {
      id: "soilMedia",
      icon: Flower2,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      titleKey: "guide.soilMedia.title",
      descKey: "guide.soilMedia.description",
      tips: [
        { titleKey: "guide.soilMedia.tip1Title", descKey: "guide.soilMedia.tip1Desc" },
        { titleKey: "guide.soilMedia.tip2Title", descKey: "guide.soilMedia.tip2Desc" },
        { titleKey: "guide.soilMedia.tip3Title", descKey: "guide.soilMedia.tip3Desc" },
      ],
    },
    {
      id: "indoorLighting",
      icon: Sun,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      titleKey: "guide.indoorLighting.title",
      descKey: "guide.indoorLighting.description",
      tips: [
        { titleKey: "guide.indoorLighting.tip1Title", descKey: "guide.indoorLighting.tip1Desc" },
        { titleKey: "guide.indoorLighting.tip2Title", descKey: "guide.indoorLighting.tip2Desc" },
        { titleKey: "guide.indoorLighting.tip3Title", descKey: "guide.indoorLighting.tip3Desc" },
      ],
    },
    {
      id: "wateringPots",
      icon: Droplets,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      titleKey: "guide.wateringPots.title",
      descKey: "guide.wateringPots.description",
      tips: [
        { titleKey: "guide.wateringPots.tip1Title", descKey: "guide.wateringPots.tip1Desc" },
        { titleKey: "guide.wateringPots.tip2Title", descKey: "guide.wateringPots.tip2Desc" },
        { titleKey: "guide.wateringPots.tip3Title", descKey: "guide.wateringPots.tip3Desc" },
      ],
    },
    {
      id: "verticalGrowing",
      icon: ArrowUpFromLine,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      titleKey: "guide.verticalGrowing.title",
      descKey: "guide.verticalGrowing.description",
      tips: [
        { titleKey: "guide.verticalGrowing.tip1Title", descKey: "guide.verticalGrowing.tip1Desc" },
        { titleKey: "guide.verticalGrowing.tip2Title", descKey: "guide.verticalGrowing.tip2Desc" },
        { titleKey: "guide.verticalGrowing.tip3Title", descKey: "guide.verticalGrowing.tip3Desc" },
      ],
    },
    {
      id: "bestVarieties",
      icon: Flame,
      color: "text-chili-400",
      bg: "bg-chili-500/10",
      titleKey: "guide.bestVarieties.title",
      descKey: "guide.bestVarieties.description",
      tips: [
        { titleKey: "guide.bestVarieties.variety1Title", descKey: "guide.bestVarieties.variety1Desc" },
        { titleKey: "guide.bestVarieties.variety2Title", descKey: "guide.bestVarieties.variety2Desc" },
        { titleKey: "guide.bestVarieties.variety3Title", descKey: "guide.bestVarieties.variety3Desc" },
        { titleKey: "guide.bestVarieties.variety4Title", descKey: "guide.bestVarieties.variety4Desc" },
      ],
    },
  ];

  function toggleSection(id: string) {
    setOpenSection(openSection === id ? null : id);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("guide.title")}</h1>
        <p className="text-gray-400 mt-2">{t("guide.subtitle")}</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className="glass-card overflow-hidden">
              {/* Section header — clickable */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center`}>
                    <section.icon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{t(section.titleKey)}</h2>
                    <p className="text-sm text-gray-500">{t(section.descKey)}</p>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                )}
              </button>

              {/* Section content */}
              {isOpen && (
                <div className="px-6 pb-6 space-y-4">
                  <div className="border-t border-white/5" />
                  {section.tips.map((tip, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <h3 className={`font-semibold mb-1 ${section.color}`}>
                        {t(tip.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t(tip.descKey)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
