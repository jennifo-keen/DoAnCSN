import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss"; // Import SCSS

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      alert("Đăng nhập thành công!");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi đăng nhập!");
    }
  };

  return (
    <div className="logincontainer">
      <div className="login-box">
        <div className="logo">
            <img src="/Logo.png" alt="logo"/>
        </div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Nhập thông tin đăng nhập để truy cập tài khoản của bạn.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <p className="forgot-password">
          Have a good time ! ♾️
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
