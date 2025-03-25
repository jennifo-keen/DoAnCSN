import React, { useState, useEffect } from 'react';
import './OrderList.scss';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

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
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then(() => {
          // Cập nhật danh sách đơn hàng sau khi xóa
          setOrders(orders.filter((order) => order.order_id !== orderId));
          // Nếu trang hiện tại không còn đơn hàng, chuyển về trang trước (nếu không phải trang 1)
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
    <div className="app">
      <h1>Thống Kê Đơn Hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào để hiển thị.</p>
      ) : (
        <>
          <table className="order-table">
            <thead>
              <tr>
                <th>ID Đơn Hàng</th>
                <th>Ngày Tạo</th>
                <th>Tổng Giá (VND)</th>
                <th>Trạng Thái Thanh Toán</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{new Date(order.order_date).toLocaleString()}</td>
                  <td>{order.total_price.toLocaleString()}</td>
                  <td>{order.payment_status}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteOrder(order.order_id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
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
  );
}

export default OrderList;