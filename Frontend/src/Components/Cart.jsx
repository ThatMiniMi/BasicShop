import { useCart } from "./CartContext";
import { useState } from "react";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () =>
{
    clearCart();
    setCheckedOut(true);
  };

  if (checkedOut)
    return <p className="text-center text-green-600 text-xl">Thanks for your purchase!</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="border p-2 rounded flex justify-between">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
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
