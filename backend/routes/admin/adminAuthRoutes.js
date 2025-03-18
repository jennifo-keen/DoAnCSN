const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../config/db'); // Kết nối MySQL
const router = express.Router();

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

        res.json({ message: 'Đăng nhập thành công', admin: { id: admin.admin_id, name: admin.name, role: admin.role } });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;
