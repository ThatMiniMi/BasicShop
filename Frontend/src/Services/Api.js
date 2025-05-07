const API_BASE = "https://localhost:5156/api"
export async function fetchProducts()
{
    const res = await fetch(`${API_BASE}/product`);
    if (!res.ok) throw new Error("Failed to load products");
        return res.json();
}