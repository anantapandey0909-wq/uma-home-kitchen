import React, { createContext, useState } from 'react';
import { message } from 'antd';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item or increase quantity if already in cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.menuItemId === item.id
      );

      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        message.success(`Increased ${item.name} quantity in cart`);
        return newCart;
      } else {
        // Item does not exist, append with quantity 1
        const newCart = [
          ...prevCart,
          {
            menuItemId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
          }
        ];
        message.success(`${item.name} added to cart`);
        return newCart;
      }
    });
  };

  // Remove item completely from cart
  const removeFromCart = (menuItemId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.menuItemId === menuItemId);
      if (itemToRemove) {
        message.info(`Removed ${itemToRemove.name} from cart`);
      }
      return prevCart.filter((item) => item.menuItemId !== menuItemId);
    });
  };

  // Update item quantity
  const updateQuantity = (menuItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Reset cart
  const clearCart = () => {
    setCart([]);
  };

  // Computed total price
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Computed count of items in cart
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
