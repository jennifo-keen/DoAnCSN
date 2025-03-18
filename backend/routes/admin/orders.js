const express = require("express");
const router = express.Router();
const db = require('../../config/db');

// Lấy danh sách đơn hàng với phân trang
router.get("/orders", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  try {
    const [orders] = await db.query(
      "SELECT * FROM orders LIMIT ? OFFSET ?",
      [limit, offset]
    );
    res.json(orders);
  } catch (error) {
    console.error("Lỗi truy vấn:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Cập nhật trạng thái đơn hàng
router.post("/updateOrderStatus", async (req, res) => {
  const { id, status } = req.body;
  try {
    await db.query("UPDATE orders SET status = ? WHERE id = ?", [
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
