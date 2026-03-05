"use client";

import { useI18n } from "@/lib/i18n/context";
import { Globe } from "lucide-react";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();

  function toggle() {
    setLocale(locale === "en" ? "id" : "en");
  }

  if (compact) {
    return (
      <button
        onClick={toggle}
        className="flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-200 transition-colors"
        title={locale === "en" ? "Switch to Indonesian" : "Ganti ke Inggris"}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{locale.toUpperCase()}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
      title={locale === "en" ? "Switch to Indonesian" : "Ganti ke Inggris"}
    >
      <Globe className="w-4 h-4 text-leaf-400" />
      <span className="font-medium">{locale === "en" ? "EN" : "ID"}</span>
    </button>
  );
}
