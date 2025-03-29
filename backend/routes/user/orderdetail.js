const express = require('express');
const router = express.Router();
const db = require('../../config/db');

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

// API lấy thông tin người nhận từ bảng customers
router.get('/order/recipient-info/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const query = `
      SELECT name, phone, shipping_address
      FROM customers
      WHERE customer_id = ?
    `;
    
    const [rows] = await db.query(query, [userId]);

    if (rows.length > 0) {
      res.json(rows[0]); // Trả về thông tin người nhận
    } else {
      res.status(404).json({ message: 'Không tìm thấy thông tin người nhận' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người nhận:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});
// API cập nhật thông tin người nhận
router.put('/order/update-recipient/:userId', async (req, res) => {
  const { userId } = req.params;
  const { name, phone, shipping_address } = req.body;

  try {
    const query = `
      UPDATE customers
      SET name = ?, phone = ?, shipping_address = ?
      WHERE customer_id = ?
    `;
    const [result] = await db.query(query, [name, phone, shipping_address, userId]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Cập nhật thông tin thành công' });
    } else {
      res.status(400).json({ message: 'Không thể cập nhật thông tin người nhận' });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin người nhận:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
