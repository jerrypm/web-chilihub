import { CalendarDays, Sprout, Sun, Droplets, Bug, Scissors } from "lucide-react";

const growthPhases = [
  {
    phase: "Seedling",
    weeks: "Week 1-3",
    icon: Sprout,
    color: "text-leaf-400",
    bg: "bg-leaf-500/10",
    tasks: [
      "Sow seeds in seed trays with fine, moist potting mix",
      "Keep temperature 25-30°C for optimal germination",
      "Provide 12-16 hours of light daily",
      "Mist gently — do not overwater",
    ],
    diseases: ["Damping off — avoid overwatering"],
  },
  {
    phase: "Transplanting",
    weeks: "Week 4-5",
    icon: Sun,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    tasks: [
      "Transplant when seedlings have 4-6 true leaves",
      "Harden off plants for 5-7 days before transplanting",
      "Space plants 45-60cm apart in rows",
      "Apply base fertilizer (NPK 15-15-15)",
    ],
    diseases: ["Bacterial wilt — ensure good drainage"],
  },
  {
    phase: "Vegetative Growth",
    weeks: "Week 6-10",
    icon: Droplets,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    tasks: [
      "Water consistently — 2.5cm per week",
      "Apply nitrogen-rich fertilizer every 2 weeks",
      "Stake tall varieties for support",
      "Mulch to retain moisture and suppress weeds",
    ],
    diseases: [
      "Cercospora leaf spot — apply fungicide if spotted",
      "Aphids — use neem oil spray",
    ],
  },
  {
    phase: "Flowering & Fruiting",
    weeks: "Week 11-16",
    icon: Bug,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    tasks: [
      "Switch to potassium-rich fertilizer for fruit development",
      "Reduce nitrogen to prevent excessive foliage",
      "Monitor for fruit set — hand-pollinate if needed",
      "Watch for anthracnose on developing fruits",
    ],
    diseases: [
      "Anthracnose — the #1 chili threat, apply mancozeb preventively",
      "TYLCV — watch for leaf curl, remove infected plants",
      "Phytophthora — avoid waterlogging",
    ],
  },
  {
    phase: "Harvest",
    weeks: "Week 17-24+",
    icon: Scissors,
    color: "text-chili-400",
    bg: "bg-chili-500/10",
    tasks: [
      "Harvest when fruits reach desired color and firmness",
      "Pick every 3-5 days to encourage continued production",
      "Use clean, sharp scissors — don't pull fruits",
      "Store at 7-10°C for maximum shelf life",
    ],
    diseases: [
      "Post-harvest anthracnose — dry fruits properly",
      "Fruit rot — sort and remove damaged fruits immediately",
    ],
  },
];

export default function CalendarPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Chili Growing Calendar</h1>
        <p className="text-gray-400 mt-2">
          Step-by-step guide from seed to harvest with disease prevention
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />

        <div className="space-y-8">
          {growthPhases.map((phase, i) => (
            <div key={phase.phase} className="relative pl-20">
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
                    <h3 className="text-lg font-bold">{phase.phase}</h3>
                    <p className="text-sm text-gray-500">{phase.weeks}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Tasks
                    </h4>
                    <ul className="space-y-1">
                      {phase.tasks.map((task) => (
                        <li key={task} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-leaf-400 mt-1">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <h4 className="text-sm font-semibold text-chili-300 uppercase tracking-wider mb-2">
                      Disease Watch
                    </h4>
                    <ul className="space-y-1">
                      {phase.diseases.map((disease) => (
                        <li key={disease} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-chili-400 mt-1">!</span>
                          {disease}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
