import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/login-registerContext"; // Import AuthContext để lấy thông tin người dùng
import "./Cart.scss"
const Cart = () => {
  const { user } = useContext(AuthContext); // Lấy thông tin người dùng
  const [cartItems, setCartItems] = useState([]); // Lưu trữ sản phẩm trong giỏ hàng
  const [loading, setLoading] = useState(true); // Để hiển thị trạng thái đang tải dữ liệu

  // Hàm để format giá với dấu phân cách
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng theo kiểu tiền tệ Việt Nam
  };

  useEffect(() => {
    if (user && user.id) {
      // Gọi API lấy giỏ hàng của người dùng
      fetch(`http://localhost:5000/api/cart/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data); // Cập nhật sản phẩm vào giỏ hàng
          setLoading(false); // Dừng trạng thái loading
        })
        .catch((error) => {
          console.error("Lỗi khi lấy giỏ hàng:", error);
          setLoading(false); // Dừng trạng thái loading khi có lỗi
        });
    }
  }, [user]);

  const handleQuantityChange = (productId, quantity) => {
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (productId) => {
    // Xóa sản phẩm khỏi giỏ hàng
    setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: user.id })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        window.location.href = `/payment?orderId=${data.orderId}`;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Có lỗi xảy ra khi thanh toán.");
    }
  };
  
  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-content">
        {/* Left side: Cart items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img src={item.image_url} alt={item.name} width="100" />
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>Giá: {formatPrice(item.price)} VND</p>
              </div>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
              />
              <button onClick={() => handleRemove(item.product_id)}>Xóa</button>
            </div>
          ))}
        </div>

        {/* Right side: Cart summary */}
        <div className="cart-summary">
          <h3>Tổng Giỏ Hàng</h3>
          <p>Tổng cộng: {formatPrice(calculateTotal())} VND</p>
          <button onClick={handleCheckout} className="checkout-button">Tiến hành thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
