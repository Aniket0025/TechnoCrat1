export async function fetchEcoProducts() {
  const response = await fetch("[https://your-backend.onrender.com/api/products");](https://your-backend.onrender.com/api/products");)
  if (!response.ok) throw new Error("Failed to fetch eco products");
  return response.json();
}
