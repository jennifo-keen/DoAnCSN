const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/db'); // Kết nối MySQL
const router = express.Router();

// API đăng ký Admin
router.post('/admin/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const [existingAdmin] = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ message: 'Email đã được sử dụng' });
        }

        // Mã hóa mật khẩu trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu admin vào database
        await db.query(
            'INSERT INTO admin_users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'staff']
        );

        res.status(201).json({ message: 'Đăng ký Admin thành công' });

    } catch (error) {
        console.error("Lỗi khi đăng ký admin:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;
