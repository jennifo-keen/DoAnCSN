const express = require("express");
const router = express.Router();
const db = require('../../config/db');

// API lấy danh sách đơn hàng (dành cho OrderList, có phân trang)
router.get("/orders", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const query = `
      SELECT order_id, order_date, total_price, payment_status 
      FROM orders
      LIMIT ? OFFSET ?
    `;
    const [rows] = await db.query(query, [limit, offset]);

    const [totalResult] = await db.query('SELECT COUNT(*) as total FROM orders');
    const totalOrders = totalResult[0].total;
    const totalPages = Math.ceil(totalOrders / limit);

    res.json({
      orders: rows,
      totalOrders,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng' });
  }
});

// Cập nhật trạng thái đơn hàng
router.patch('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { payment_status } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE orders SET payment_status = ? WHERE order_id = ?',
      [payment_status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    }

    console.log(`Cập nhật trạng thái đơn hàng ${orderId} thành công: ${payment_status}`); // Debug
    res.json({ order_id: orderId, payment_status });
  } catch (err) {
    console.error('Lỗi khi cập nhật trạng thái:', err);
    res.status(500).json({ error: 'Lỗi khi cập nhật' });
  }
});

module.exports = router;