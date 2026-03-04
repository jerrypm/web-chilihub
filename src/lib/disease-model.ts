import * as tf from "@tensorflow/tfjs";
import { CLASS_LABELS, getDiseaseInfo } from "./disease-data";

let model: tf.LayersModel | null = null;

export interface ScanResult {
  disease_name: string;
  display_name: string;
  confidence: number;
  severity: "healthy" | "mild" | "moderate" | "severe";
  treatment: string;
  symptoms: string;
  prevention: string;
}

export async function loadModel(): Promise<void> {
  if (model) return;
  model = await tf.loadLayersModel("/model/model.json");
}

export function isModelLoaded(): boolean {
  return model !== null;
}

export async function classifyImage(imageElement: HTMLImageElement): Promise<ScanResult> {
  if (!model) {
    await loadModel();
  }

  const tensor = tf.browser
    .fromPixels(imageElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .div(255.0)
    .expandDims(0);

  const predictions = model!.predict(tensor) as tf.Tensor;
  const probabilities = await predictions.data();

  let maxIdx = 0;
  let maxProb = 0;
  for (let i = 0; i < probabilities.length; i++) {
    if (probabilities[i] > maxProb) {
      maxProb = probabilities[i];
      maxIdx = i;
    }
  }

  const className = CLASS_LABELS[maxIdx] || "healthy";
  const info = getDiseaseInfo(className);

  tensor.dispose();
  predictions.dispose();

  return {
    disease_name: className,
    display_name: info.name,
    confidence: maxProb,
    severity: info.severity,
    treatment: info.treatment,
    symptoms: info.symptoms,
    prevention: info.prevention,
  };
}
