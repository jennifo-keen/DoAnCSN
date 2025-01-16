const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Đảm bảo file db.js được cấu hình đúng


// API để lấy danh sách sản phẩm
router.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products'); // Truy vấn dữ liệu
    res.json(rows); // Trả dữ liệu về frontend
  } catch (error) {
    console.error('Lỗi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API để lấy chi tiết sản phẩm
router.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
  } catch (error) {
    console.error('Lỗi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

const bcrypt = require('bcrypt');

// API xử lý đăng ký người dùng
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa trong bảng `customers`
    const [existingCustomer] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (existingCustomer.length > 0) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Lưu thông tin khách hàng vào bảng `customers`
    await db.query(
      'INSERT INTO customers (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Lỗi khi xử lý đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API xử lý đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm kiếm người dùng bằng email
    const [user] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Trả về phản hồi nếu đăng nhập thành công
    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.error('Lỗi khi xử lý đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;