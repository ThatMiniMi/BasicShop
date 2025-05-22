import { useEffect, useState } from "react";
import { fetchProducts, updateProduct, deleteProduct } from "../Services/api";

function AdminProductList()
{
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() =>
    {
    loadProducts();
    }, []);

  const loadProducts = async () =>
    {
      try
      {
      const data = await fetchProducts();
      const normalized = data.map((p) => (
        {
          id: p.Id,
          name: p.Name,
          price: p.Price,
          stock: p.Stock,
          categoryId: p.CategoryID,
        }));
      setProducts(normalized);
      }
      catch (err) 
      {
      console.error("Error loading products:", err);
      alert("Failed to load products. Please try again.");
      }
    };

  const handleEdit = (product) =>
    {
    setEditingId(product.id);
    setEditedProduct(
      {
        name: product.name || "",
        price: product.price || 0,
        stock: product.stock || 0,
        categoryId: product.categoryId || 0,
      });
    };

  const handleChange = (e) =>
    {
    const { name, value } = e.target;
    setEditedProduct((prev) => (
      {
        ...prev,
        [name]: name === "price" || name === "stock" || name === "categoryId" ? Number(value) : value,
      }));
    };

  const handleUpdate = async () =>
    {
      try
      {
        const updateData =
        {
          ...editedProduct,
          id: editingId,
        }
        await updatedProduct(editingId, editedProduct );
        setProducts((prev) =>
          prev.map((product) => (product.id === editingId ? updateData : product))
        );
        setEditingId(null);
      } catch (err) {
        console.error("Error updating product:", err);
        alert("Failed to update product. Please try again.");
      }
    };

  const handleDelete = async (id) =>
    {
      if (!confirm("Are you sure you want to delete this product?")) return;
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Failed to delete product. Please try again.");
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded shadow flex flex-col gap-2"
            >
              {editingId === product.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                  <input
                    type="number"
                    name="stock"
                    value={editedProduct.stock}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                  <input
                    type="number"
                    name="categoryId"
                    value={editedProduct.categoryId}
                    onChange={handleChange}
                    className="border px-2 py-1"
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <strong>{product.name}</strong> — ${product.price} — Stock: {product.stock}
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminProductList;