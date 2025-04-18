export async function fetchEcoProducts() {
  const response = await fetch("http://localhost:5000/api/products");
  if (!response.ok) throw new Error("Failed to fetch eco products");
  return response.json();
}
