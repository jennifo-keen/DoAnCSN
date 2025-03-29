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
// Trong file orderRoutes.js, thêm một route để cập nhật thông tin người nhận
router.put('/update-recipient/:userId/:orderId', async (req, res) => {
  const { userId, orderId } = req.params;
  const { name, phone, shipping_address, payment_method } = req.body;

  console.log('Received Data:', { name, phone, shipping_address, payment_method }); // Log dữ liệu nhận được từ frontend

  try {
    const query = `
      UPDATE orders
      SET recipient_name = ?, recipient_phone = ?, shipping_address = ?, payment_method = ?
      WHERE customer_id = ? AND order_id = ?;
    `;
    const [result] = await db.query(query, [name, phone, shipping_address, payment_method, userId, orderId]);

    console.log('SQL Result:', result); // Log kết quả từ câu lệnh SQL

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Cập nhật thông tin thành công!' });
    } else {
      res.status(400).json({ message: 'Không tìm thấy đơn hàng hoặc thông tin không thay đổi!' });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin:', error); // Log chi tiết lỗi
    res.status(500).json({ message: 'Lỗi server' });
  }
});


router.post('/create-order', async (req, res) => {
  const { customerId, shippingAddress, paymentMethod, totalPrice } = req.body;
  try {
    const query = `
      INSERT INTO orders (customer_id, shipping_address, payment_method, total_price)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [customerId, shippingAddress, paymentMethod, totalPrice]);
    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Tạo đơn hàng thành công!', orderId: result.insertId });
    } else {
      res.status(400).json({ message: 'Tạo đơn hàng không thành công!' });
    }
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
