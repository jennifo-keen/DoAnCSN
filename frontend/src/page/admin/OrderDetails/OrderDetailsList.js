import React, { useState, useEffect } from 'react';
import './OrderDetailsList.scss';

function OrderDetailsList() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  // Lấy danh sách chi tiết đơn hàng từ backend
  useEffect(() => {
    fetch(`http://localhost:5000/api/order-details?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderDetails(Array.isArray(data.orderDetails) ? data.orderDetails : []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setOrderDetails([]);
        setTotalPages(1);
      });
  }, [page]);

  // Xóa chi tiết đơn hàng
  const handleDeleteOrderDetail = (orderDetailId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chi tiết đơn hàng này?')) {
      fetch(`http://localhost:5000/api/order-details/${orderDetailId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Không thể xóa chi tiết đơn hàng');
          }
          return res.json();
        })
        .then((data) => {
          console.log(data.message);
          setOrderDetails(orderDetails.filter((detail) => detail.order_detail_id !== orderDetailId));
          if (orderDetails.length === 1 && page > 1) {
            setPage(page - 1);
          }
        })
        .catch((err) => {
          console.error('Lỗi khi xóa chi tiết đơn hàng:', err);
          alert('Xóa chi tiết đơn hàng thất bại. Vui lòng thử lại.');
        });
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

  // Hàm định dạng giá với dấu chấm
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="apl-container">
      {/* Menu bên trái */}
      <div className="apl-menu">
        <div className="apl-logo">Admin Dashboard</div>
        <a href="/admin/dashboard" className="apl-menu-item">
          <span className="apl-icon">📦</span> Danh sách sản phẩm
        </a>
        <a href="/admin/orderlist" className="apl-menu-item">
          <span className="apl-icon">🛒</span> Thống kê đơn hàng
        </a>
        <a href="/admin/order-details-list" className="apl-menu-item apl-active">
          <span className="apl-icon">📋</span> Chi tiết đơn hàng
        </a>
        <a href="/doimk" className="apl-menu-item apl-logout">
          <span className="apl-icon">✏️</span> Đổi mật khẩu
        </a>
      </div>

      {/* Nội dung chính */}
      <div className="apl-content">
        <div className="apl-header">
          <h2>Chi Tiết Đơn Hàng</h2>
        </div>

        <div className="apl-stats">
          <span>Chúng tôi tìm thấy {orderDetails.length} chi tiết đơn hàng</span>
        </div>

        {orderDetails.length === 0 ? (
          <p>Không có chi tiết đơn hàng nào để hiển thị.</p>
        ) : (
          <>
            <div className="apl-order-list">
              {orderDetails.map((detail) => (
                <div className="apl-product-card" key={detail.order_detail_id}>
                  <div className="apl-product-info">
                    <h4>Mã chi tiết: {detail.order_detail_id}</h4>
                    <p className="apl-description">Mã đơn hàng: {detail.order_id}</p>
                    <p className="apl-description">Mã sản phẩm: {detail.product_id}</p>
                    <p className="apl-price">{formatPrice(detail.price)} VND</p>
                    <div className="apl-tags">
                      <span className="apl-tag">Số lượng: {detail.quantity}</span>
                    </div>
                  </div>
                  <div className="apl-product-actions">
                    <button
                      className="apl-delete-btn"
                      onClick={() => handleDeleteOrderDetail(detail.order_detail_id)}
                    >
                      Xóa
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

export default OrderDetailsList;    