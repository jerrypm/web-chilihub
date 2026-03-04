import Link from "next/link";
import { Leaf, Scan, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-leaf-900/20 via-gray-950 to-gray-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-leaf-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-leaf-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">
            The first platform built for chili farmers
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Grow Better Chili with{" "}
          <span className="gradient-text">AI Power</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Identify diseases instantly, track market prices in real-time, and
          maximize your chili farm profitability — all in one platform.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/sign-up" className="btn-primary text-lg px-8 py-4">
            Start Free — 3 Scans/Month
          </Link>
          <Link href="#features" className="btn-secondary text-lg px-8 py-4">
            See How It Works
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <Scan className="w-6 h-6 text-leaf-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">AI</div>
            <div className="text-sm text-gray-500">Disease Detection</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-leaf-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">Live</div>
            <div className="text-sm text-gray-500">Price Tracking</div>
          </div>
          <div className="text-center">
            <Leaf className="w-6 h-6 text-leaf-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">Smart</div>
            <div className="text-sm text-gray-500">Growing Guides</div>
          </div>
        </div>
      </div>
    </section>
  );
}
