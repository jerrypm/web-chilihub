"use client";

import { useState } from "react";
import { Sprout, Sun, Droplets, Bug, Scissors, Home } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

type PhaseKey = "seedling" | "transplanting" | "vegetative" | "flowering" | "harvest";

interface GrowthPhase {
  phaseKey: PhaseKey;
  weeksKey: string;
  icon: typeof Sprout;
  color: string;
  bg: string;
  fieldTaskKeys: string[];
  smallSpaceTaskKeys: string[];
  diseaseKeys: string[];
}

const growthPhases: GrowthPhase[] = [
  {
    phaseKey: "seedling",
    weeksKey: "calendar.phase.seedlingWeeks",
    icon: Sprout,
    color: "text-leaf-400",
    bg: "bg-leaf-500/10",
    fieldTaskKeys: [
      "calendar.field.seedling1",
      "calendar.field.seedling2",
      "calendar.field.seedling3",
      "calendar.field.seedling4",
    ],
    smallSpaceTaskKeys: [
      "calendar.smallSpace.seedling1",
      "calendar.smallSpace.seedling2",
      "calendar.smallSpace.seedling3",
      "calendar.smallSpace.seedling4",
    ],
    diseaseKeys: ["calendar.disease.seedling1"],
  },
  {
    phaseKey: "transplanting",
    weeksKey: "calendar.phase.transplantingWeeks",
    icon: Sun,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    fieldTaskKeys: [
      "calendar.field.transplanting1",
      "calendar.field.transplanting2",
      "calendar.field.transplanting3",
      "calendar.field.transplanting4",
    ],
    smallSpaceTaskKeys: [
      "calendar.smallSpace.transplanting1",
      "calendar.smallSpace.transplanting2",
      "calendar.smallSpace.transplanting3",
      "calendar.smallSpace.transplanting4",
    ],
    diseaseKeys: ["calendar.disease.transplanting1"],
  },
  {
    phaseKey: "vegetative",
    weeksKey: "calendar.phase.vegetativeWeeks",
    icon: Droplets,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    fieldTaskKeys: [
      "calendar.field.vegetative1",
      "calendar.field.vegetative2",
      "calendar.field.vegetative3",
      "calendar.field.vegetative4",
    ],
    smallSpaceTaskKeys: [
      "calendar.smallSpace.vegetative1",
      "calendar.smallSpace.vegetative2",
      "calendar.smallSpace.vegetative3",
      "calendar.smallSpace.vegetative4",
    ],
    diseaseKeys: [
      "calendar.disease.vegetative1",
      "calendar.disease.vegetative2",
    ],
  },
  {
    phaseKey: "flowering",
    weeksKey: "calendar.phase.floweringWeeks",
    icon: Bug,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    fieldTaskKeys: [
      "calendar.field.flowering1",
      "calendar.field.flowering2",
      "calendar.field.flowering3",
      "calendar.field.flowering4",
    ],
    smallSpaceTaskKeys: [
      "calendar.smallSpace.flowering1",
      "calendar.smallSpace.flowering2",
      "calendar.smallSpace.flowering3",
      "calendar.smallSpace.flowering4",
    ],
    diseaseKeys: [
      "calendar.disease.flowering1",
      "calendar.disease.flowering2",
      "calendar.disease.flowering3",
    ],
  },
  {
    phaseKey: "harvest",
    weeksKey: "calendar.phase.harvestWeeks",
    icon: Scissors,
    color: "text-chili-400",
    bg: "bg-chili-500/10",
    fieldTaskKeys: [
      "calendar.field.harvest1",
      "calendar.field.harvest2",
      "calendar.field.harvest3",
      "calendar.field.harvest4",
    ],
    smallSpaceTaskKeys: [
      "calendar.smallSpace.harvest1",
      "calendar.smallSpace.harvest2",
      "calendar.smallSpace.harvest3",
      "calendar.smallSpace.harvest4",
    ],
    diseaseKeys: [
      "calendar.disease.harvest1",
      "calendar.disease.harvest2",
    ],
  },
];

export default function CalendarPage() {
  const { t } = useI18n();
  const [smallSpaceMode, setSmallSpaceMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("calendar.title")}</h1>
        <p className="text-gray-400 mt-2">{t("calendar.subtitle")}</p>
      </div>

      {/* Small Space Mode Toggle */}
      <div className="glass-card p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${smallSpaceMode ? "bg-leaf-500/10" : "bg-white/5"}`}>
            <Home className={`w-5 h-5 ${smallSpaceMode ? "text-leaf-400" : "text-gray-500"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold">{t("calendar.smallSpaceMode")}</p>
            <p className="text-xs text-gray-500">
              {smallSpaceMode ? t("calendar.smallSpaceBadge") : t("calendar.fieldBadge")}
            </p>
          </div>
        </div>
        <button
          onClick={() => setSmallSpaceMode(!smallSpaceMode)}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            smallSpaceMode ? "bg-leaf-500" : "bg-white/10"
          }`}
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              smallSpaceMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-8">
          {growthPhases.map((phase) => {
            const taskKeys = smallSpaceMode ? phase.smallSpaceTaskKeys : phase.fieldTaskKeys;
            return (
              <div key={phase.phaseKey} className="relative pl-20">
                {/* Timeline dot */}
                <div
                  className={`absolute left-6 w-5 h-5 rounded-full border-2 border-gray-950 ${phase.bg} ring-2 ${phase.color.replace("text-", "ring-")}/30`}
                />

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${phase.bg} flex items-center justify-center`}>
                      <phase.icon className={`w-5 h-5 ${phase.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        {t(`calendar.phase.${phase.phaseKey}`)}
                      </h3>
                      <p className="text-sm text-gray-500">{t(phase.weeksKey)}</p>
                    </div>
                    {smallSpaceMode && (
                      <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider bg-leaf-500/10 text-leaf-400 px-2 py-1 rounded-full">
                        {t("calendar.smallSpaceBadge")}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        {t("calendar.tasks")}
                      </h4>
                      <ul className="space-y-1">
                        {taskKeys.map((key) => (
                          <li key={key} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-leaf-400 mt-1">&#8226;</span>
                            {t(key)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <h4 className="text-sm font-semibold text-chili-300 uppercase tracking-wider mb-2">
                        {t("calendar.diseaseWatch")}
                      </h4>
                      <ul className="space-y-1">
                        {phase.diseaseKeys.map((key) => (
                          <li key={key} className="text-sm text-gray-400 flex items-start gap-2">
                            <span className="text-chili-400 mt-1">!</span>
                            {t(key)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
