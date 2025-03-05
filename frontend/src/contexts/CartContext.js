import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./login-registerContext"; // Lấy thông tin người dùng
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Load giỏ hàng từ localStorage khi user thay đổi
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
      setCart(storedCart);
    } else {
      setCart([]); // Nếu chưa đăng nhập, không hiển thị giỏ hàng
    }
  }, [user]);

  // Cập nhật giỏ hàng vào localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product_id === product.product_id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map((item) => (item.product_id === productId ? { ...item, quantity } : item)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
