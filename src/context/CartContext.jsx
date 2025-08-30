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

  const addToCart = (item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        if (prevItem.inCart) {
          return prevItem;
        }

        return prevItem.id === item.id ? { ...prevItem, inCart: true } : prevItem;
      });
    });
  };

  const removeFromCart = (item) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === item.id ? { ...prevItem, inCart: false, quantity: 1 } : prevItem;
      });
    });
  };

  const updateQuantity = (cartItem, amount) => {
    setAllItems((prevItems) => {
      return prevItems.map((prevItem) => {
        return prevItem.id === cartItem.id
          ? { ...prevItem, quantity: prevItem.quantity + amount }
          : prevItem;
      });
    });
  };

  return (
    <CartContext.Provider value={{ allItems, setItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext); // Receive data
};
