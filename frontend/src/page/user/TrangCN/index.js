import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/login-registerContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Profile.scss";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shipping_address: "",
  });

  // Load dữ liệu từ localStorage khi component render
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        shipping_address: user.shipping_address || "",
      });
    }
  }, [user]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gửi API cập nhật dữ liệu
  const handleSave = () => {
    axios
      .put(`http://localhost:5000/api/user/${user.id}`, formData)
      .then((response) => {
        toast.success("Cập nhật thông tin thành công!", { position: "top-right" });

        // Cập nhật localStorage với thông tin mới
        const updatedUser = { ...user, ...formData };
        delete updatedUser.password; // Không lưu mật khẩu vào localStorage
        login(updatedUser);
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật thông tin:", error);
        toast.error("Lỗi khi cập nhật. Vui lòng thử lại!", { position: "top-right" });
      });
  };

  return (
    <div className="profile-container">
      <h2 className="title">TÀI KHOẢN CỦA TÔI</h2>
      <div className="form-group">
        <label>Tên *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} readOnly />
      </div>
      <div className="form-group">
        <label>Số điện thoại *</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Địa chỉ giao hàng *</label>
        <input type="text" name="shipping_address" value={formData.shipping_address} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Mật khẩu mới (để trống nếu không đổi)</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>

      <button className="save-btn" onClick={handleSave}>LƯU THAY ĐỔI</button>

      {/* Hiển thị thông báo */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
