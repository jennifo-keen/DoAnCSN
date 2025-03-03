const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API để lấy giỏ hàng của người dùng
router.get('/cart', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cart WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    console.error('Lỗi khi truy vấn giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API thêm sản phẩm vào giỏ hàng
router.post('/cart', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    await db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
    res.json({ message: 'Sản phẩm đã được thêm vào giỏ hàng' });
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API cập nhật số lượng sản phẩm
router.put('/cart', async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    await db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', [quantity, user_id, product_id]);
    res.json({ message: 'Cập nhật số lượng thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API xoá sản phẩm khỏi giỏ hàng
router.delete('/cart/:product_id', async (req, res) => {
  const { user_id } = req.body;
  const { product_id } = req.params;
  try {
    await db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [user_id, product_id]);
    res.json({ message: 'Xóa sản phẩm khỏi giỏ hàng' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
