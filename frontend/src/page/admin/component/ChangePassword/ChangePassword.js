import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.scss";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
        setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
        return;
    }

    try {
        const token = localStorage.getItem("adminToken"); // Lấy token từ localStorage
        if (!token) {
            setError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
            return;
        }

        const res = await fetch("http://localhost:5000/api/admin/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Gửi token đúng định dạng
            },
            body: JSON.stringify({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            }),
        });

        const data = await res.json();
        if (res.ok) {
            setSuccess("Đổi mật khẩu thành công!");
            setTimeout(() => navigate("/admin/dashboard"), 2000);
        } else {
            setError(data.message || "Đã xảy ra lỗi khi đổi mật khẩu");
        }
    } catch (error) {
        setError("Lỗi kết nối đến server");
        console.error("Lỗi:", error);
    }
};

  return (
    <div className="cp-container">
        
      <div className="cp-menu">
        <div className="cp-logo">Admin Dashboard</div>
        <a href="/admin/dashboard" className="cp-menu-item">
          <span className="cp-icon">📦</span> Danh sách sản phẩm
        </a>
        <a href="/admin/orderlist" className="cp-menu-item">
          <span className="cp-icon">🛒</span> Thống kê đơn hàng
        </a>
        <a href="/doimk" className="cp-menu-item cp-active">
          <span className="cp-icon">✏️</span> Đổi mật khẩu
        </a>
      </div>

      <div className="cp-content">
        <div className="cp-header">
          <h2>Đổi Mật Khẩu</h2>
        </div>

        <div className="cp-form-container">
          <form onSubmit={handleSubmit} className="cp-form">
            {error && <p className="cp-error">{error}</p>}
            {success && <p className="cp-success">{success}</p>}
            <input
              type="password"
              name="oldPassword"
              placeholder="Mật khẩu cũ"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="Mật khẩu mới"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div className="cp-form-buttons">
              <button type="submit">Đổi mật khẩu</button>
              <button
                type="button"
                className="cp-cancel-btn"
                onClick={() => navigate("/admin/dashboard")}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;