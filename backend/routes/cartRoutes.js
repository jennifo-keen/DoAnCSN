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
  const { customerId } = req.params;
  try {
    const query = `
      SELECT p.product_id, p.name, p.price, p.image_url, c.quantity
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.customer_id = ?
    `;
    const [rows] = await db.query(query, [customerId]);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'Giỏ hàng của bạn trống.' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm trong giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// ✅ API xử lý thanh toán (thêm vào đây)
router.post('/cart/checkout', async (req, res) => {
  const { customer_id } = req.body;

  try {
    // 1. Lấy dữ liệu giỏ hàng
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

    // 2. Tính tổng tiền
    const total_price = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 3. Tạo đơn hàng
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

    // 6. Trả kết quả về frontend
    res.status(200).json({
      message: 'Tạo đơn hàng thành công',
      orderId
    });

  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error); // dòng cũ
    res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng', error: error.message }); // thêm error.message vào response
  }
});

module.exports = router;
