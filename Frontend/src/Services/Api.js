const API_BASE = "https://localhost:5156/api"

export async function fetchCategories()
{
    const res = await fetch(`https://localhost:5156/api/category`);
    if (!res.ok) throw new Error("Failed to load categories");
        return res.json();
}

export async function createCategory(category)
{
    const res = await fetch(`https://localhost:5156/api/category`,
        {
            method: "POST",
            headers: { "Content-Type" : "application/json", },
            body: JSON.stringify(category)
        });
    if(!res.ok) throw new Error("Failed to create category");
        return res.json();
}

export async function updateCategory( id, category)
{
    const res = await fetch(`https://localhost:5156/api/category/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type" : "application/json", },
            body: JSON.stringify(category)
        });
    if(!res.ok) throw new Error("Failed to update category");
        return res.json();
}

export async function deleteCategory(id)
{
    const res = await fetch(`https://localhost:5156/api/category/${id}`,
        {
        method: "DELETE",
        });
    if (!res.ok) throw new Error("Failed to delete category");
}
export async function fetchProducts()
{
    const res = await fetch(`${API_BASE}/product`);
    if (!res.ok) throw new Error("Failed to load products");
        return res.json();
}

export async function createProduct (product)
{
    const res = await fetch(`https://localhost:5156/api/product`, 
        {
            method: "POST",
            headers: { "Content-Type" : "application/json", },
            body: JSON.stringify(product),
        });

    if (!res.ok) throw new Error("Failed to create product")
        return res.json();
}

export async function updateProduct( id, product)
{
    const res = await fetch(`https://localhost:5156/api/product/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type" : "application/json", },
            body: JSON.stringify(product)
        });
    if(!res.ok) throw new Error("Failed to update product");
        return res.json();
}

export async function deleteProduct(id)
{
    const res = await fetch(`https://localhost:5156/api/product/${id}`,
        {
        method: "DELETE",
        });
    if (!res.ok) throw new Error("Failed to delete product");
}