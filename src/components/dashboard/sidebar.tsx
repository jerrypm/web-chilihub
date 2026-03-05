"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Leaf,
  Camera,
  History,
  BarChart3,
  CalendarDays,
  Calculator,
  Sprout,
  LogOut,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "@/components/language-switcher";

const navItems = [
  { href: "/scan", icon: Camera, labelKey: "nav.diseaseScanner", shortLabelKey: "nav.scan" },
  { href: "/scan/history", icon: History, labelKey: "nav.scanHistory", shortLabelKey: "nav.history" },
  { href: "/prices", icon: BarChart3, labelKey: "nav.priceDashboard", shortLabelKey: "nav.prices" },
  { href: "/calendar", icon: CalendarDays, labelKey: "nav.growingCalendar", shortLabelKey: "nav.calendar" },
  { href: "/calculator", icon: Calculator, labelKey: "nav.profitCalculator", shortLabelKey: "nav.calc" },
  { href: "/guide", icon: Sprout, labelKey: "nav.urbanGuide", shortLabelKey: "nav.guide" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { t } = useI18n();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex-col">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <Leaf className="w-7 h-7 text-leaf-400" />
          <span className="text-xl font-bold">ChiliHub</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-leaf-500/10 text-leaf-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2">
          <LanguageSwitcher />
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">{t("nav.signOut")}</span>
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-xl border-t border-white/10 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-3 px-2 min-w-0 ${
                  isActive ? "text-leaf-400" : "text-gray-500"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium truncate">{t(item.shortLabelKey)}</span>
              </Link>
            );
          })}
          <LanguageSwitcher compact />
        </div>
      </nav>
    </>
  );
}
