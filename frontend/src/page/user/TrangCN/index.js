import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/login-registerContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shipping_address: "",
  });
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const updatedData = {};
    if (formData.name && formData.name !== user.name) updatedData.name = formData.name;
    if (formData.phone && formData.phone !== user.phone) updatedData.phone = formData.phone;
    if (formData.shipping_address && formData.shipping_address !== user.shipping_address)
      updatedData.shipping_address = formData.shipping_address;
    if (formData.password) updatedData.password = formData.password;

    if (Object.keys(updatedData).length === 0) {
      toast.info("Không có thay đổi để cập nhật!", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${user.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 10000, // Tăng timeout lên 10 giây
        }
      );

      console.log("Response từ API:", response);

      toast.success("Cập nhật thông tin thành công! Vui lòng đăng nhập lại.", {
        position: "top-right",
      });

      const updatedUser = { ...user, ...updatedData };
      delete updatedUser.password;
      login(updatedUser);

      setTimeout(() => {
        logout();
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error.response || error);
      if (error.code === "ECONNABORTED") {
        toast.error("Yêu cầu hết thời gian. Vui lòng thử lại!", { position: "top-right" });
      } else {
        toast.error(error.response?.data?.error || "Lỗi khi cập nhật. Vui lòng thử lại!", {
          position: "top-right",
        });
      }
    }
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
        <input
          type="text"
          name="shipping_address"
          value={formData.shipping_address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Mật khẩu mới (để trống nếu không đổi)</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>

      <button className="save-btn" onClick={handleSave}>
        LƯU THAY ĐỔI
      </button>
    </div>
  );
};

export default Profile;