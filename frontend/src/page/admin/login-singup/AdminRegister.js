import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'staff'
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/register', formData);
            setMessage(response.data.message);
            setTimeout(() => {
                navigate('/admin/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Đăng ký thất bại');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Đăng Ký Admin</h2>
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tên:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Chức vụ:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="staff">Nhân viên</option>
                        <option value="manager">Quản lý</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                </div>
                <button type="submit">Đăng Ký</button>
            </form>
        </div>
    );
};

export default AdminRegister;
