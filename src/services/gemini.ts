// Gemini API integration for EcoCart chatbot
export async function askGemini(message: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: message }] }]
    })
  });
  if (!res.ok) return "Sorry, Gemini could not answer your question.";
  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Sorry, Gemini did not return a response."
  );
}
