import { useEffect, useState } from "react";
import { fetchProducts } from "../Services/Api";

function ProductList()
{
    const [products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(() =>
    {
        fetchProducts()
            .then(setProducts)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, 
    []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {
                products.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-semibold">${product.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductList;