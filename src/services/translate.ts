// Google Translate API integration for EcoCart
// Usage: import { translateText } from "@/services/translate";

const TRANSLATE_API_KEY = "AIzaSyD0ysOLiDjQLhFB1aD6Sh1EMGvZGmy8PLE";
const TRANSLATE_ENDPOINT = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API_KEY}`;

export async function translateText(text: string, target: string, source?: string): Promise<string> {
  const body = {
    q: text,
    target,
    ...(source ? { source } : {})
  };
  const res = await fetch(TRANSLATE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Translate API error");
  const data = await res.json();
  return data?.data?.translations?.[0]?.translatedText || "";
}
