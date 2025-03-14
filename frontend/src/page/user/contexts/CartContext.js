import { createContext, useState, useContext } from "react";  // Thêm useContext vào đây
import { AuthContext } from "../contexts/login-registerContext"; // Đảm bảo đúng đường dẫn
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng từ context

  const addToCart = (product) => {
    if (!user) {
      // Nếu người dùng chưa đăng nhập, có thể hiển thị thông báo hoặc chuyển hướng đến trang đăng nhập
      console.log("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const customerId = user.id; // Lấy customer_id từ context đăng nhập
    const existingProductIndex = cart.findIndex(
      (item) => item.product_id === product.product_id
    );

    if (existingProductIndex === -1) {
      // Thêm sản phẩm mới vào giỏ
      const updatedCart = [
        ...cart,
        { ...product, quantity: 1, customer_id: customerId },
      ];
      setCart(updatedCart);
      // Gửi yêu cầu đến backend để lưu giỏ hàng vào cơ sở dữ liệu
      fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: product.product_id,
          quantity: 1,
        }),
      });
    } else {
      // Nếu sản phẩm đã có trong giỏ, tăng số lượng
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      // Cập nhật số lượng trong cơ sở dữ liệu
      fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: product.product_id,
          quantity: updatedCart[existingProductIndex].quantity,
        }),
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
