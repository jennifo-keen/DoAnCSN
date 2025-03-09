import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./style.scss";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Tính tổng giá trị giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      let price = item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // Hàm để format giá với dấu phân cách
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN'); // Định dạng theo kiểu tiền tệ Việt Nam
  };

  // Tính giá trị giảm giá và tổng giỏ hàng
  const totalAmount = calculateTotal();
  const discount = 0.2; // Giảm giá 20%
  const discountAmount = totalAmount * discount;
  const shipping = 9.99; // Phí vận chuyển cố định

  const finalTotal = totalAmount - discountAmount + shipping;

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1 style={{ textAlign: "center" }}>Giỏ hàng</h1>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Giỏ hàng trống</p>
        ) : (
          cart.map((item) => (
            <div key={item.product_id} className="cart-item">
              <img src={item.image_url} alt={item.name} width="50" />
              <h3>{item.name}</h3>
              <p>Giá: {formatPrice(item.price)} VNĐ</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product_id, parseInt(e.target.value))
                }
              />
              <button onClick={() => removeFromCart(item.product_id)}>Xóa</button>
            </div>
          ))
        )}
      </div>

      <div className="cart-right">
        <h2>Tổng Giỏ Hàng</h2>
        <div className="summary-item">
          <p>Subtotal</p>
          <span>{formatPrice(totalAmount)} VNĐ</span> {/* Hiển thị subtotal */}
        </div>
        <div className="summary-item">
          <p>Giảm giá (20%)</p>
          <span>- {formatPrice(discountAmount)} VNĐ</span> {/* Hiển thị giảm giá */}
        </div>
        <div className="summary-item">
          <p>Phí vận chuyển</p>
          <span>{formatPrice(shipping)} VNĐ</span> {/* Hiển thị phí vận chuyển */}
        </div>
        <div className="total summary-item">
          <p>Tổng cộng</p>
          <span>{formatPrice(finalTotal)} VNĐ</span> {/* Hiển thị tổng cộng */}
        </div>
        <button className="checkout-btn">Tiến hành thanh toán</button>
        <button className="continue-btn">Tiếp tục mua hàng</button>
      </div>
    </div>
  );
};

export default Cart;
