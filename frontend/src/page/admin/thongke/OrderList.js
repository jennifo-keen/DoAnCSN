import React, { useState, useEffect, useCallback } from 'react';
import './OrderList.scss';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const fetchOrders = useCallback(() => {
    console.log('Bắt đầu fetchOrders');
    fetch(`http://localhost:5000/api/orders?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Dữ liệu từ server:', data);
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setOrders([]);
        setTotalPages(1);
      })
      .finally(() => {
        console.log('fetchOrders hoàn tất');
      });
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      console.log('Thay đổi trạng thái:', { orderId, newStatus });
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        console.log('Phản hồi từ server:', updatedOrder);

        // Hiển thị thông báo đơn giản bằng window.alert
        if (window.confirm('Thay đổi trạng thái thành công!')) {
          console.log('Người dùng nhấn OK để về trang chủ');
          // Sử dụng window.location.href để điều hướng
          setTimeout(() => {
            window.location.href = '/admin/orderlist';
          }, 100);
        }
      } else {
        console.error('Cập nhật thất bại, status:', response.status);
        alert('Cập nhật trạng thái thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      console.error('Lỗi khi cập nhật trạng thái:', err);
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="apl-container">
      <div className="apl-menu">
        <div className="apl-logo">Admin Dashboard</div>
        <a href="/admin/dashboard" className="apl-menu-item">
          <span className="apl-icon">📦</span> Danh sách sản phẩm
        </a>
        <a href="/admin/orderlist" className="apl-menu-item apl-active">
          <span className="apl-icon">🛒</span> Thống kê đơn hàng
        </a>
        <a href="/doimk" className="apl-menu-item apl-logout">
          <span className="apl-icon">✏️</span> Đổi mật khẩu
        </a>
      </div>

      <div className="apl-content">
        <div className="apl-header">
          <h2>Thống Kê Đơn Hàng</h2>
        </div>

        <div className="apl-stats">
          <span>Chúng tôi tìm thấy {orders.length} đơn hàng</span>
        </div>

        {orders.length === 0 ? (
          <p>Không có đơn hàng nào để hiển thị.</p>
        ) : (
          <>
            <div className="apl-order-list">
              {orders.map((order) => (
                <div className="apl-product-card" key={order.order_id}>
                  <div className="apl-product-info">
                    <h4>Mã đơn hàng: {order.order_id}</h4>
                    <p className="apl-description">
                      Ngày tạo: {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p className="apl-price">{formatPrice(order.total_price)} VND</p>
                    <div className="apl-tags">
                      <span className="apl-tag">Trạng thái: {order.payment_status}</span>
                    </div>
                  </div>
                  <div className="apl-product-actions">
                    <select
                      value={order.payment_status}
                      onChange={(e) => handlePaymentStatusChange(order.order_id, e.target.value)}
                      className="apl-status-select"
                    >
                      <option value="Chưa thanh toán">Chưa thanh toán</option>
                      <option value="Đã thanh toán">Đã thanh toán</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="apl-pagination">
              <button onClick={handlePreviousPage} disabled={page === 1}>
                Trang trước
              </button>
              <span>Trang {page} / {totalPages}</span>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                Trang sau
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderList;