// routes/orderdetail.js

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API lấy thông tin tổng quan của một đơn hàng từ bảng orders
router.get('/order/:orderId', async (req, res) => {
  const { orderId } = req.params;  // Lấy orderId từ URL params

  try {
    const query = `
      SELECT * FROM orders WHERE order_id = ?;
    `;
    const [rows] = await db.query(query, [orderId]);

    if (rows.length > 0) {
      res.json(rows[0]);  // Trả về thông tin tổng quan của đơn hàng
    } else {
      res.status(404).json({ message: 'Đơn hàng không tìm thấy' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy thông tin đơn hàng' });
  }
});

module.exports = router;
