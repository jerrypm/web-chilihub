"use client";

import { type ScanResult as ScanResultType } from "@/lib/disease-model";
import { ShieldCheck, AlertTriangle, AlertCircle, Skull, Pill, Eye, ShieldPlus } from "lucide-react";

interface ScanResultProps {
  result: ScanResultType;
  scansRemaining: number | string;
}

const severityConfig = {
  healthy: {
    label: "Healthy",
    color: "text-leaf-400",
    bg: "bg-leaf-500/10",
    border: "border-leaf-500/20",
    icon: ShieldCheck,
  },
  mild: {
    label: "Mild",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: AlertTriangle,
  },
  moderate: {
    label: "Moderate",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    icon: AlertCircle,
  },
  severe: {
    label: "Severe",
    color: "text-chili-400",
    bg: "bg-chili-500/10",
    border: "border-chili-500/20",
    icon: Skull,
  },
};

export function ScanResult({ result, scansRemaining }: ScanResultProps) {
  const config = severityConfig[result.severity];
  const SeverityIcon = config.icon;
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{result.display_name}</h2>
          <p className="text-gray-400 text-sm mt-1">
            Confidence: {confidencePercent}%
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.color} ${config.border} border`}
        >
          <SeverityIcon className="w-4 h-4" />
          {config.label}
        </span>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-400">AI Confidence</span>
          <span className={config.color}>{confidencePercent}%</span>
        </div>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              result.severity === "healthy"
                ? "bg-leaf-500"
                : result.severity === "mild"
                ? "bg-yellow-500"
                : result.severity === "moderate"
                ? "bg-orange-500"
                : "bg-chili-500"
            }`}
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>

      {/* Details sections */}
      <div className="space-y-4">
        {/* Symptoms */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Symptoms</h3>
            <p className="text-sm text-gray-400 mt-1">{result.symptoms}</p>
          </div>
        </div>

        {/* Treatment */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <Pill className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Treatment</h3>
            <p className="text-sm text-gray-400 mt-1">{result.treatment}</p>
          </div>
        </div>

        {/* Prevention */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
            <ShieldPlus className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Prevention</h3>
            <p className="text-sm text-gray-400 mt-1">{result.prevention}</p>
          </div>
        </div>
      </div>

      {/* Scans remaining */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-sm text-gray-500">
          Scans remaining:{" "}
          <span className="text-gray-300">
            {scansRemaining === Infinity || scansRemaining === "unlimited"
              ? "Unlimited"
              : scansRemaining}
          </span>
        </p>
      </div>
    </div>
  );
}
