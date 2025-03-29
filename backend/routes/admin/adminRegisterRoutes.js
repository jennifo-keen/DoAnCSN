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

router.get('/search/admin', async (req, res) => {
    const { keyword, status, category_id } = req.query;
  
    if (!keyword) {
      return res.status(400).json({ message: 'Vui lòng nhập từ khóa tìm kiếm' });
    }
  
    try {
      let query = 'SELECT * FROM products WHERE name LIKE ? COLLATE utf8mb4_unicode_ci';
      const queryParams = [`%${keyword}%`];
  
      // Nếu có thêm lọc theo trạng thái sản phẩm
      if (status) {
        query += ' AND status = ?';
        queryParams.push(status); // Ví dụ: status có thể là 'in_stock' hoặc 'out_of_stock'
      }
  
      // Nếu có thêm lọc theo loại sản phẩm
      if (category_id) {
        query += ' AND category_id = ?';
        queryParams.push(category_id);
      }
  
      const [rows] = await db.query(query, queryParams);
  
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm sản phẩm:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  });
  

module.exports = router;
