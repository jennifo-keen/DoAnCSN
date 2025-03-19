import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();

  // Kiểm tra xem có dữ liệu adminInfo trong localStorage không, nếu có thì parse, nếu không thì gán giá trị mặc định
  const adminInfo = localStorage.getItem("adminInfo");
  const admin = adminInfo ? JSON.parse(adminInfo) : null;
  const adminName = admin ? admin.name : "Guest";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo"); // Xóa thông tin admin khỏi localStorage
    navigate("/admin/login"); // Điều hướng đến trang login sau khi đăng xuất
  };

  return (
    <header className="dashboard-header">
      <div className="user-info"> 
        <span className="profile">🪄 {adminName} (Admin)</span>
        <button onClick={handleLogout}>Đăng xuất</button> {/* Thêm nút đăng xuất */}
      </div>
    </header>
  );
};

export default Header;
