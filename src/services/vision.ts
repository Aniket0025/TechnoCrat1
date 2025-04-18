// Google Vision API integration for EcoCart
// Usage: import { analyzeImageLabels } from "@/services/vision";

const VISION_API_KEY = "AIzaSyD0ysOLiDjQLhFB1aD6Sh1EMGvZGmy8PLE";
const VISION_ENDPOINT = `https://vision.googleapis.com/v1/images:annotate?key=${VISION_API_KEY}`;

// Takes a base64-encoded image string (no data:image/... prefix)
export async function analyzeImageLabels(base64: string): Promise<string[]> {
  const body = {
    requests: [
      {
        image: { content: base64 },
        features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
      },
    ],
  };
  const res = await fetch(VISION_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Vision API error");
  const data = await res.json();
  return (
    data?.responses?.[0]?.labelAnnotations?.map((l: { description: string }) => l.description) || []
  );
}
