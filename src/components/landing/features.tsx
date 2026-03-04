import { Camera, BarChart3, CalendarDays, Calculator } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI Disease Detector",
    description:
      "Upload a photo of your chili plant and get instant disease identification with treatment recommendations. Powered by advanced AI vision.",
    badge: "Core Feature",
  },
  {
    icon: BarChart3,
    title: "Price Dashboard",
    description:
      "Track chili prices across regions in real-time. Get alerts when prices spike or drop. Never sell at the wrong time again.",
    badge: "Coming Soon",
  },
  {
    icon: CalendarDays,
    title: "Growing Calendar",
    description:
      "Personalized planting schedules by variety and location. Step-by-step guides from seedling to harvest with disease prevention tips.",
    badge: "Coming Soon",
  },
  {
    icon: Calculator,
    title: "Profit Calculator",
    description:
      "Calculate your expected profit before planting. Input costs, estimate yields, and see if this season is worth it.",
    badge: "Coming Soon",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything a Chili Farmer Needs
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Purpose-built tools for the $10.88 billion chili pepper industry.
            No generic farm software — this is made for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-leaf-500/10 flex items-center justify-center group-hover:bg-leaf-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-leaf-400" />
                </div>
                <span className="text-xs font-medium text-leaf-400 glass-card px-3 py-1">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
