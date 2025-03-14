import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./Cart.scss";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Function to calculate the total value of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmount = calculateTotal();
  const discount = 0.2; // 20% discount
  const discountAmount = totalAmount * discount;
  const shipping = 9.99; // Fixed shipping fee

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
              <p>Giá: {item.price} VNĐ</p>
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
          <span>{totalAmount.toFixed(2)} VNĐ</span>
        </div>
        <div className="summary-item">
          <p>Giảm giá (20%)</p>
          <span>- {discountAmount.toFixed(2)} VNĐ</span>
        </div>
        <div className="summary-item">
          <p>Phí vận chuyển</p>
          <span>{shipping.toFixed(2)} VNĐ</span>
        </div>
        <div className="total summary-item">
          <p>Tổng cộng</p>
          <span>{finalTotal.toFixed(2)} VNĐ</span>
        </div>
        <button className="checkout-btn">Tiến hành thanh toán</button>
        <button className="continue-btn">Tiếp tục mua hàng</button>
      </div>
    </div>
  );
};

export default Cart;
