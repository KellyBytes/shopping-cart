import { createContext, useContext, useState } from 'react';
import { allProducts } from '../assets/data';

// Create Context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [allItems, setAllItems] = useState([]); // Data to be shared

  const setItems = () => {
    setAllItems(allProducts);
  };

  return <CartContext.Provider value={{ allItems, setItems }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext); // Receive data
};
