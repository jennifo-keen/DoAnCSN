import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
            localStorage.setItem('adminToken', response.data.token);
            alert('Đăng nhập thành công!');
            navigate('/admin/dashboard'); // Chuyển hướng tới trang admin dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi đăng nhập!');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng Nhập Admin</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default AdminLogin;
