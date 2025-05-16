import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart()
{
  return useContext(CartContext);
}

export function CartProvider({ children })
{
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) =>
{
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;