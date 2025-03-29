import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.scss"; // Import SCSS

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/register", formData);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/admin/login"); // Chuyển hướng sau khi đăng ký thành công
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo">
            <img src="/Logo.png" alt="logo"/>
        </div>
        <h2>Create Admin Account</h2>
        <p className="subtitle">Điền thông tin để tạo tài khoản quản trị.</p>
        {message && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="staff">Nhân viên</option>
              <option value="manager">Quản lý</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <button type="submit" className="register-button">Sign Up</button>
        </form>
        <p className="login-link">
          Quay về  <a href="/admin/dashboard">trang chủ</a>
        </p>
      </div>
    </div>
  );
};

export default AdminRegister;
