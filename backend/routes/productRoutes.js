const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API để lấy danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Lỗi khi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
