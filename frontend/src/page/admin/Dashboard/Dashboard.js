import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Dashboard</h2>
        <nav>
          <ul>
            <li><Link to="/admin/products">Quản lý sản phẩm</Link></li>
            <li><Link to="/admin/orders">Quản lý đơn hàng</Link></li>
            <li><Link to="/admin/inventory">Quản lý kho</Link></li>
            <li><Link to="/admin/revenue">Theo dõi doanh thu</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-main">
        <h1>Chào mừng đến với bảng điều khiển Admin</h1>
        <p>Chọn một danh mục từ menu bên trái để quản lý.</p>
      </main>
    </div>
  );
};

export default Dashboard;
