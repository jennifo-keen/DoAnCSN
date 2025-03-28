const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const db = require('../../config/db'); // Kết nối MySQL
const router = express.Router();

// Mã bí mật để tạo JWT token
const JWT_SECRET = '23315400990914642747'; 

// Middleware xác thực admin bằng JWT
const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Không có quyền truy cập' });

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); // Giả sử token dạng "Bearer <token>"
        req.admin = decoded; // Lưu thông tin admin từ token vào req.admin
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

// Endpoint đăng nhập admin
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

// Endpoint đổi mật khẩu admin
router.post('/admin/change-password', authenticateAdmin, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id; // Lấy admin_id từ token đã giải mã

    try {
        // Lấy thông tin admin từ database
        const [rows] = await db.query('SELECT * FROM admin_users WHERE admin_id = ?', [adminId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy admin' });
        }

        const admin = rows[0];

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
        }

        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        }

        // Hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu trong database
        await db.query('UPDATE admin_users SET password = ? WHERE admin_id = ?', [
            hashedNewPassword,
            adminId
        ]);

        res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch (error) {
        console.error('Lỗi khi đổi mật khẩu:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
});

module.exports = router;