import { useCart } from "./CartContext";
import { useState } from "react";
import { updateProduct, fetchProducts } from "../Services/api";

function Cart()
{
  const { cart, removeFromCart, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () =>
  {
    try
    {
      const allProducts = await fetchProducts();

      for (const product of cart)
      {
        const current = allProducts.find(
          (p) => p.Id === product.id || p.id === product.id
        );

        if (!current)
        {
          throw new Error(`Product ${product.name} not found`);
        }

        const currentStock = current.Stock ?? current.stock ?? 0;
        const updatedStock = currentStock - 1;

        if (updatedStock < 0)
        {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        await updateProduct(current.Id || current.id,
        {
          ...current,
          stock: updatedStock,
        });
      }

      clearCart();
      setCheckedOut(true);
    } 
    catch (err)
    {
      console.error("Checkout error:", err);
      setError("Checkout failed. Please try again.");
    }
  };

  if (checkedOut)
    return (
      <p className="text-center text-green-600 text-xl">
        Thanks for your purchase!
      </p>
    );

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((product, index) => (
              <li
                key={index}
                className="border p-2 rounded flex justify-between"
              >
                <span>
                  {product.name} - ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;