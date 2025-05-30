import { useContext, useEffect, useState } from "react";
import { fetchProducts } from "../Services/api";
import CartContext from "./CartContext";

function ProductList()
{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
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
          imageUrl: p.ImageUrl,
        }));
        setProducts(normalized);
      }
      catch (err)
      {
        console.error("Failed to load products:", err);
      }
      finally
      {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const resolveImageUrl = (url) =>
  {
    if (!url) return "https://via.placeholder.com/150";
    if (url.startsWith("http")) return url;
    return `http://localhost:5156/${url}`;
  };

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shop - Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow-md">
            <img
              src={resolveImageUrl(product.imageUrl)}
              alt={product.name || "Product"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150";
              }}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">
              ${typeof product.price === "number" ? product.price.toFixed(2) : "N/A"}
            </p>
            <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
            </p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => alert(`View details of ${product.name}`)}
            >
              View Details
            </button>
            <button
              disabled={product.stock === 0}
              className={`mt-2 px-4 py-2 rounded text-white w-full ${
                product.stock > 0 ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;