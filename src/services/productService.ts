export async function fetchEcoProducts() {
  // TODO: Replace with your real backend URL when deployed
  const response = await fetch("https://example.com/api/products");
  if (!response.ok) throw new Error("Failed to fetch eco products");
  return response.json();
}
