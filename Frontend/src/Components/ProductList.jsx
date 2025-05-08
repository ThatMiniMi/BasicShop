import { useEffect, useState } from "react";
import { fetchProducts } from "../Services/api";

function ProductList()
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>
    {
        const loadProducts = async() =>
        {
            try
            {
                const data = await fetchProducts();
                setProducts(data);
            }
            catch(err)
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

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shop - Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 shadow-md">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
            </p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => alert(`View details of ${product.name}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
    );
}

export default ProductList;