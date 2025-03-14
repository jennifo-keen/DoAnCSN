const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Đảm bảo kết nối với DB

// Thêm sản phẩm vào giỏ hàng
router.post('/cart', (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  const sql = 'INSERT INTO cart (customer_id, product_id, quantity) VALUES (?, ?, ?)';
  db.query(sql, [customer_id, product_id, quantity], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
    }
    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng' });
  });
});

// Cập nhật số lượng sản phẩm trong giỏ
router.put('/cart/update', (req, res) => {
  const { customer_id, product_id, quantity } = req.body;

  const sql = 'UPDATE cart SET quantity = ? WHERE customer_id = ? AND product_id = ?';
  db.query(sql, [quantity, customer_id, product_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi khi cập nhật giỏ hàng' });
    }
    res.status(200).json({ message: 'Số lượng sản phẩm đã được cập nhật' });
  });
});

// API lấy sản phẩm trong giỏ hàng của người dùng
router.get('/cart/:customerId', async (req, res) => {
  const { customerId } = req.params; // Lấy customerId từ URL params
  try {
    // Lấy các sản phẩm trong giỏ hàng của khách hàng từ bảng cart và thông tin sản phẩm từ bảng products
    const query = `
      SELECT p.product_id, p.name, p.price, p.image_url, c.quantity
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.customer_id = ?
    `;
    const [rows] = await db.query(query, [customerId]);

    if (rows.length > 0) {
      res.json(rows); // Trả về danh sách sản phẩm trong giỏ hàng
    } else {
      res.status(404).json({ message: 'Giỏ hàng của bạn trống.' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});


module.exports = router;
