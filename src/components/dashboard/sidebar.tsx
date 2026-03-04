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
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/scan", icon: Camera, label: "Disease Scanner" },
  { href: "/scan/history", icon: History, label: "Scan History" },
  { href: "/prices", icon: BarChart3, label: "Price Dashboard" },
  { href: "/calendar", icon: CalendarDays, label: "Growing Calendar" },
  { href: "/calculator", icon: Calculator, label: "Profit Calculator" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <aside className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col">
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
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="text-sm font-medium">Sign Out</span>
      </button>
    </aside>
  );
}
