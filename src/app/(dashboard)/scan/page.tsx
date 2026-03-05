"use client";

import { useState, useEffect } from "react";
import { ImageUploader } from "@/components/scan/image-uploader";
import { ScanResult } from "@/components/scan/scan-result";
import { loadModel, classifyImage, type ScanResult as ScanResultType } from "@/lib/disease-model";
import { Loader2 } from "lucide-react";

export default function ScanPage() {
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [result, setResult] = useState<ScanResultType | null>(null);
  const [scansRemaining, setScansRemaining] = useState<number | string>(3);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadModel()
      .then(() => setModelLoading(false))
      .catch(() => {
        setModelLoading(false);
        // Model not available yet (needs training) - show graceful message
      });
  }, []);

  async function handleUpload(file: File) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Check scan limit first
      const limitRes = await fetch("/api/scan");
      const limitData = await limitRes.json();
      if (!limitRes.ok) {
        setError(limitData.error);
        return;
      }
      if (limitData.remaining !== Infinity && limitData.remaining <= 0) {
        setError("Scan limit reached. Upgrade to Pro for unlimited scans.");
        return;
      }

      // Create image element for TF.js
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.crossOrigin = "anonymous";

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
      });

      // Run classification in browser
      const scanResult = await classifyImage(img);

      // Save result to server
      const saveRes = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disease_name: scanResult.disease_name,
          confidence: scanResult.confidence,
          severity: scanResult.severity,
          treatment: scanResult.treatment,
          details: scanResult.symptoms,
          image_url: "",
        }),
      });

      const saveData = await saveRes.json();
      setResult(scanResult);
      setScansRemaining(saveData.remaining ?? limitData.remaining);
      URL.revokeObjectURL(imageUrl);
    } catch {
      setError("Analysis failed. Please try again with a clearer photo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">AI Disease Scanner</h1>
        <p className="text-gray-400 mt-2">
          Upload a photo of your chili plant to detect diseases instantly
        </p>
      </div>

      {modelLoading && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-leaf-400 animate-spin" />
          <span className="text-gray-300">Loading AI model...</span>
        </div>
      )}

      <div className="space-y-6">
        <ImageUploader onUpload={handleUpload} loading={loading} />

        {error && (
          <div className="bg-chili-500/5 backdrop-blur-xl border border-chili-500/20 rounded-2xl p-4">
            <p className="text-chili-400">{error}</p>
          </div>
        )}

        {result && (
          <ScanResult result={result} scansRemaining={scansRemaining} />
        )}
      </div>
    </div>
  );
}
