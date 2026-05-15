import { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [transactionId, setTransactionId] = useState(0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const incrementQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const decrementQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const PPN = 0.11;
  const pajak = Math.round(subtotal * PPN);
  const total = subtotal + pajak;

  return (
    <TransactionContext.Provider
      value={{
        cart,
        subtotal,
        pajak,
        total,
        transactionId,
        setTransactionId,
        setCart,
        addToCart,
        incrementQty,
        decrementQty,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
