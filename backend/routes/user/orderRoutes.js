const express = require('express');
const router = express.Router();
const db = require('../../config/db');

// API lấy tất cả các order details
router.get('/orderdetails', async (req, res) => {
  const customerId = req.query.customer_id;  // Lấy customer_id từ query params
  try {
    const query = `
      SELECT od.order_detail_id, od.order_id, p.product_name, od.quantity, od.price, od.created_at
      FROM order_details od
      JOIN products p ON od.product_id = p.product_id
      WHERE od.order_id IN (SELECT order_id FROM orders WHERE customer_id = ?)
    `;
    const [rows] = await db.query(query, [customerId]);
    res.json(rows);
  } catch (error) {
    console.error('Lỗi khi lấy order details:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
