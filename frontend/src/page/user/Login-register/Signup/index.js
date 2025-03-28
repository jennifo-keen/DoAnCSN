import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Signup.scss";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '', 
  });

  const navigate = useNavigate(); // Sử dụng hook useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone, // Gửi thêm số điện thoại
          address: formData.address, // Gửi địa chỉ
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Đăng ký thành công! Hãy đăng nhập lại để sử dụng.');
        
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address, // Lưu địa chỉ vào localStorage
        }));
        
        setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '', address: '' }); // Reset form
        navigate('/login'); // Chuyển hướng về trang đăng nhập
      } else {
        alert(data.message || 'Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error);
      alert('Lỗi server!');
    }
  };

  return (
    <div className="signup-container">
      <h1>Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập họ và tên"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Nhập địa chỉ của bạn"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">Đăng Ký</button>
        <a className="signup" href='/login'>Đăng nhập</a>
      </form>
    </div>
  );
};

export default SignUp;
