import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Order = () => {
  const { orderId } = useParams();  // Lấy orderId từ URL
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    if (orderId) {
      // Lấy thông tin tổng quan đơn hàng từ API
      fetch(`http://localhost:5000/api/order/${orderId}`)
        .then((response) => response.json())
        .then((data) => setOrderInfo(data))
        .catch((error) => console.error("Lỗi khi lấy thông tin đơn hàng:", error));
    }
  }, [orderId]);

  return (
    <div>
      <h2>Chi tiết đơn hàng #{orderId}</h2>

      {/* Hiển thị thông tin tổng quan của đơn hàng */}
      {orderInfo ? (
        <div>
          <h3>Thông tin đơn hàng</h3>
          <p><strong>Order ID:</strong> {orderInfo.order_id}</p>
          <p><strong>Tình trạng:</strong> {orderInfo.status}</p>
          <p><strong>Tổng giá trị:</strong> {orderInfo.total_price} VND</p>
          <p><strong>Ngày tạo:</strong> {new Date(orderInfo.created_at).toLocaleString()}</p>
          <p><strong>Địa chỉ giao hàng:</strong> {orderInfo.shipping_address}</p>
          <p><strong>Phương thức thanh toán:</strong> {orderInfo.payment_method}</p>
          <p><strong>Trạng thái thanh toán:</strong> {orderInfo.payment_status}</p>
        </div>
      ) : (
        <p>Không tìm thấy thông tin đơn hàng.</p>
      )}
    </div>
  );
};

export default Order;
