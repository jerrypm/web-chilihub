import { createClient } from "@/lib/supabase/server";
import { History, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function ScanHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: scans } = await supabase
    .from("scans")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const severityColors = {
    healthy: "text-leaf-400 bg-leaf-500/10",
    mild: "text-yellow-400 bg-yellow-500/10",
    moderate: "text-orange-400 bg-orange-500/10",
    severe: "text-chili-400 bg-chili-500/10",
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Scan History</h1>
          <p className="text-gray-400 mt-2">
            {scans?.length || 0} scans recorded
          </p>
        </div>
        <Link href="/scan" className="btn-primary">
          New Scan
        </Link>
      </div>

      {!scans?.length ? (
        <div className="glass-card p-12 text-center">
          <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No scans yet. Upload your first chili photo!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scans.map((scan) => (
            <div key={scan.id} className="glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
              {scan.image_url && (
                <img
                  src={scan.image_url}
                  alt="Scan"
                  className="w-16 h-16 rounded-xl object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold capitalize">
                  {(scan.disease_name || "unknown").replace(/_/g, " ")}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(scan.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  severityColors[scan.severity as keyof typeof severityColors] || severityColors.healthy
                }`}
              >
                {scan.severity}
              </span>
              <span className="text-sm text-gray-400">
                {Math.round((scan.confidence || 0) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
