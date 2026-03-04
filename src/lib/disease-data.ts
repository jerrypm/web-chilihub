export interface DiseaseInfo {
  name: string;
  severity: "healthy" | "mild" | "moderate" | "severe";
  treatment: string;
  symptoms: string;
  prevention: string;
}

export const DISEASE_INFO: Record<string, DiseaseInfo> = {
  healthy: {
    name: "Healthy",
    severity: "healthy",
    treatment: "No treatment needed. Your chili plant looks healthy!",
    symptoms: "No visible symptoms of disease.",
    prevention: "Continue good practices: proper watering, spacing, and fertilization.",
  },
  anthracnose: {
    name: "Anthracnose",
    severity: "severe",
    treatment: "Apply fungicide containing mancozeb or chlorothalonil. Remove and destroy infected fruits immediately. Spray every 7-10 days during wet season.",
    symptoms: "Dark, sunken, circular lesions on fruits. Lesions may have concentric rings with black dots (spore masses). Fruits may shrivel and rot.",
    prevention: "Use disease-free seeds, avoid overhead irrigation, ensure good air circulation, rotate crops every 2-3 years.",
  },
  bacterial_wilt: {
    name: "Bacterial Wilt",
    severity: "severe",
    treatment: "No chemical cure available. Remove and destroy infected plants immediately. Solarize soil before replanting. Apply Trichoderma-based biocontrol agents.",
    symptoms: "Sudden wilting of entire plant without yellowing. Plants remain green while wilting. Cut stem shows brown discoloration in vascular tissue.",
    prevention: "Use resistant varieties, improve drainage, avoid injuries to roots, rotate with non-solanaceous crops for 3+ years.",
  },
  leaf_curl: {
    name: "Leaf Curl (TYLCV)",
    severity: "moderate",
    treatment: "No cure for viral infection. Control whitefly vectors with neem oil or imidacloprid. Remove infected plants to prevent spread.",
    symptoms: "Upward curling of leaves, yellowing, stunted growth. Leaves become thick and leathery. Severely reduced fruit production.",
    prevention: "Use reflective mulch to repel whiteflies, install yellow sticky traps, use resistant varieties, remove weeds that harbor whiteflies.",
  },
  cercospora_leaf_spot: {
    name: "Cercospora Leaf Spot",
    severity: "moderate",
    treatment: "Apply copper-based fungicide or mancozeb. Remove heavily infected leaves. Ensure proper spacing for air circulation.",
    symptoms: "Small circular spots with brown borders and gray-white centers on leaves. Spots may merge, causing leaf drop. Usually starts on lower leaves.",
    prevention: "Avoid overhead watering, ensure proper plant spacing, remove crop debris after harvest, practice crop rotation.",
  },
  powdery_mildew: {
    name: "Powdery Mildew",
    severity: "mild",
    treatment: "Apply sulfur-based fungicide or neem oil spray. Baking soda solution (1 tbsp per gallon) works as organic alternative. Spray every 7 days.",
    symptoms: "White powdery coating on upper leaf surfaces. Leaves may yellow, curl, and drop prematurely. Usually appears in dry weather with cool nights.",
    prevention: "Provide good air circulation, avoid overcrowding, water at base of plants, choose resistant varieties.",
  },
  phytophthora: {
    name: "Phytophthora Blight",
    severity: "severe",
    treatment: "Apply metalaxyl or phosphorous acid fungicide. Improve drainage immediately. Remove infected plants and surrounding soil.",
    symptoms: "Dark water-soaked lesions at stem base (collar rot). Rapid wilting. Fruits show dark, water-soaked patches. White mold may appear in humid conditions.",
    prevention: "Plant in well-drained raised beds, avoid waterlogging, use drip irrigation, apply mulch to prevent soil splash.",
  },
  fusarium_wilt: {
    name: "Fusarium Wilt",
    severity: "severe",
    treatment: "No effective chemical treatment. Remove infected plants. Apply Trichoderma harzianum as biological control. Solarize soil for 4-6 weeks.",
    symptoms: "Yellowing starting on one side of plant. Progressive wilting despite adequate water. Brown discoloration inside stem when cut lengthwise.",
    prevention: "Use resistant rootstock, solarize soil, maintain soil pH 6.5-7.0, add calcium amendments, rotate crops.",
  },
  mosaic_virus: {
    name: "Mosaic Virus",
    severity: "moderate",
    treatment: "No cure. Remove and destroy infected plants. Control aphid vectors with insecticidal soap or neem oil. Disinfect tools with 10% bleach.",
    symptoms: "Mottled light and dark green patterns on leaves. Leaf distortion and curling. Stunted growth and reduced fruit size.",
    prevention: "Use virus-free seeds, control aphids, wash hands before handling plants, remove weeds that serve as virus reservoirs.",
  },
  nutrient_deficiency: {
    name: "Nutrient Deficiency",
    severity: "mild",
    treatment: "Apply balanced NPK fertilizer. For yellowing lower leaves: add nitrogen. For purple leaves: add phosphorus. For brown leaf edges: add potassium.",
    symptoms: "Yellowing leaves, stunted growth, poor fruit set, purple or brown discoloration depending on deficient nutrient.",
    prevention: "Regular soil testing, balanced fertilization schedule, add organic compost, maintain soil pH 6.0-6.8.",
  },
};

export const CLASS_LABELS = [
  "anthracnose",
  "bacterial_wilt",
  "cercospora_leaf_spot",
  "fusarium_wilt",
  "healthy",
  "leaf_curl",
  "mosaic_virus",
  "nutrient_deficiency",
  "phytophthora",
  "powdery_mildew",
] as const;

export type DiseaseClass = typeof CLASS_LABELS[number];

export function getDiseaseInfo(className: string): DiseaseInfo {
  return (
    DISEASE_INFO[className] || {
      name: "Unknown",
      severity: "healthy" as const,
      treatment: "Could not identify disease. Please try a clearer photo or consult a local agricultural extension officer.",
      symptoms: "Unable to determine symptoms.",
      prevention: "Maintain good agricultural practices.",
    }
  );
}
