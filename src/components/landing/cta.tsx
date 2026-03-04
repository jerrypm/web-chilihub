import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-card p-12 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-leaf-600/10 to-emerald-600/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop Losing Harvest to Disease
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join ChiliHub today. Upload a photo of your sick chili plant and
              get AI-powered diagnosis in seconds. Free to start.
            </p>
            <Link
              href="/sign-up"
              className="btn-primary text-lg px-10 py-4 inline-block"
            >
              Get Started Free
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required. 3 free scans every month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
