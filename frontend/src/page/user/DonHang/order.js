import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './order.scss';

const Order = () => {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost:5000/api/order/${orderId}`)
        .then((response) => response.json())
        .then((data) => setOrderInfo(data))
        .catch((error) => console.error("Lỗi khi lấy thông tin đơn hàng:", error));
    }
  }, [orderId]);

  return (
    <div className="order-container">
      <h2>Chi tiết đơn hàng: ID {orderId}</h2>

      {orderInfo ? (
        <div className="order-info">
          <h3>Thông tin đơn hàng</h3>
          <p><strong>Order ID:</strong> {orderInfo.order_id}</p>
          <p><strong>Tổng giá trị:</strong> {orderInfo.total_price} VND</p>          
          <p><strong>Phương thức thanh toán:</strong> {orderInfo.payment_method}</p>
          <p><strong>Trạng thái thanh toán:</strong> {orderInfo.payment_status}</p>
          <p><strong>Ngày tạo:</strong> {new Date(orderInfo.created_at).toLocaleString()}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {orderInfo.shipping_address}</p>

          
        </div>
      ) : (
        <p className="not-found">Không tìm thấy thông tin đơn hàng.</p>
      )}
    </div>
  );
};

export default Order;