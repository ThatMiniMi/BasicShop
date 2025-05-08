const API_BASE = "https://localhost:5156/api"

export async function fetchProducts()
{
    const res = await fetch(`${API_BASE}/product`);
    if (!res.ok) throw new Error("Failed to load products");
        return res.json();
}

export async function createProduct (product)
{
    const res = await fetch("https://localhost:5156/api/product", 
        {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(product),
        });
    if (!res.ok) throw new Error("Failed to create product")
        return res.json();
}