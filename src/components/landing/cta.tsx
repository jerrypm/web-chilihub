"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";

export function CTA() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-leaf-600/10 to-emerald-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("cta.heading")}
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <Link
              href="/sign-up"
              className="btn-primary text-lg px-10 py-4 inline-block"
            >
              {t("cta.button")}
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              {t("cta.note")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
