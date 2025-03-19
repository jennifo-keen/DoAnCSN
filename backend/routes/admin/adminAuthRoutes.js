const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const db = require('../../config/db'); // Kết nối MySQL
const router = express.Router();

// Mã bí mật để tạo JWT token
const JWT_SECRET = 'your_jwt_secret'; // Bạn nên thay đổi cái này thành một chuỗi bí mật phức tạp

router.post('/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Email không tồn tại' });
        }

        const admin = rows[0];

        // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác' });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: admin.admin_id, name: admin.name, role: admin.role },
            JWT_SECRET, // Mã bí mật
            { expiresIn: '1h' } // Token sẽ hết hạn sau 1 giờ
        );

        // Trả về token và thông tin người dùng
        res.json({
            token: token,
            user: {
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;
