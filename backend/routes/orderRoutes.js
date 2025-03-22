const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API tạo đơn hàng từ giỏ hàng
router.post('/checkout', async (req, res) => {
  const { customer_id } = req.body;

  try {
    // 1. Lấy sản phẩm trong giỏ hàng
    const [cartItems] = await db.query(
      `SELECT c.product_id, c.quantity, p.price
       FROM cart c
       JOIN products p ON c.product_id = p.product_id
       WHERE c.customer_id = ?`,
      [customer_id]
    );

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    // 2. Tính tổng tiền đơn hàng
    const total_price = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    // 3. Tạo đơn hàng mới
    const [orderResult] = await db.query(
      `INSERT INTO orders (customer_id, total_price, status, created_at)
       VALUES (?, ?, 'pending', NOW())`,
      [customer_id, total_price]
    );

    const orderId = orderResult.insertId;

    // 4. Tạo chi tiết đơn hàng
    const orderDetails = cartItems.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price
    ]);

    await db.query(
      `INSERT INTO order_details (order_id, product_id, quantity, price)
       VALUES ?`,
      [orderDetails]
    );

    // 5. Xóa giỏ hàng
    await db.query(`DELETE FROM cart WHERE customer_id = ?`, [customer_id]);

    // 6. Trả kết quả
    res.status(200).json({
      message: 'Tạo đơn hàng thành công',
      orderId: orderId
    });

  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng' });
  }
});
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
