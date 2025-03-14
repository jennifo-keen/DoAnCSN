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

// Lấy giỏ hàng của người dùng
router.get('/cart/:customer_id', (req, res) => {
  const customerId = req.params.customer_id;
  const sql = 'SELECT * FROM cart WHERE customer_id = ?';
  db.query(sql, [customerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi khi lấy giỏ hàng' });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
