import React, { useState, useEffect } from "react";
import "./OrderList.scss";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders?page=${currentPage}&limit=${recordsPerPage}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  }, [currentPage]);

  const totalPages = Math.ceil(orders.length / recordsPerPage);

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`http://localhost:5000/api/updateOrderStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    })
      .then((res) => res.text())
      .then(() => alert("Cập nhật trạng thái thành công!"))
      .catch((err) => console.error("Lỗi cập nhật trạng thái:", err));
  };

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <h2>Nhân Viên</h2>
        <a href="/admin">👤 Admin</a>
        <a href="/logout">❕ Đăng xuất</a>

        <h2>Tổng Quan</h2>
        <a href="/admin/orders">🛒 Thống kê đơn hàng</a>

        <h2>Chức Năng</h2>
        <a href="/admin/add">➕ Thêm sản phẩm mới</a>
        <a href="/admin/products">🛍️ Danh sách sản phẩm</a>
      </div>

      <div className="admin-content">
        <h2>Thống kê đơn hàng</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mã đơn hàng</th>
              <th>Khách hàng</th>
              <th>Địa chỉ</th>
              <th>Điện thoại</th>
              <th>Ngày giao</th>
              <th>Trạng thái</th>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.phone_number}</td>
                <td>{order.delivery_date}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang gửi">Đang gửi</option>
                    <option value="Đã xong">Đã xong</option>
                  </select>
                </td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.price.toLocaleString()} VND</td>
                <td>{order.total_price.toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;
