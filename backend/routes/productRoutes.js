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

module.exports = router;
