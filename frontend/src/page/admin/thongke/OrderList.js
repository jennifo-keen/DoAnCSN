import React, { useState, useEffect } from 'react';
import './OrderList.scss';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Hàm định dạng giá với dấu chấm
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Lấy danh sách đơn hàng từ backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/orders?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data.orders) ? data.orders : []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setOrders([]);
        setTotalPages(1);
      });
  }, [page]);

  // Xóa đơn hàng
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Đơn hàng này đã được thanh toán ?')) {
      fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then(() => {
          setOrders(orders.filter((order) => order.order_id !== orderId));
          if (orders.length === 1 && page > 1) {
            setPage(page - 1);
          }
        })
        .catch((err) => console.error('Lỗi khi xóa đơn hàng:', err));
    }
  };

  // Chuyển trang trước
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Chuyển trang sau
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="apl-container">
      {/* Menu bên trái */}
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

      {/* Nội dung chính */}
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
                    <button
                      className="apl-delete-btn"
                      onClick={() => handleDeleteOrder(order.order_id)}
                    >
                      Đã thanh toán
                    </button>
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