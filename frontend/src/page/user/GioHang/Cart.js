import React, { useContext } from "react";
import { CartContext } from "../../../utils/CartContext";
import "./style.scss";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  return (
    <div>
      <h1>Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng không có gì</p>
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
              onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value))}
            />
            <button onClick={() => removeFromCart(item.product_id)}>Xóa</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
