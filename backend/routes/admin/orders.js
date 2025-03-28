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

// Xóa đơn hàng
router.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const [result] = await db.query('DELETE FROM orders WHERE order_id = ?', [orderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa' });
    }

    res.json({ message: 'Xóa đơn hàng thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa đơn hàng' });
  }
});

// API cập nhật trạng thái đơn hàng
router.post("/updateOrderStatus", async (req, res) => {
  const { id, status } = req.body;
  try {
    await db.query("UPDATE orders SET status = ? WHERE order_id = ?", [
      status,
      id,
    ]);
    res.send("Cập nhật thành công!");
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

module.exports = router;