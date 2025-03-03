const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Đường dẫn tới file productRoutes.js
const app = express();

// Middleware
app.use(cors()); // Cho phép truy cập từ frontend
app.use(express.json()); // Xử lý JSON
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', productRoutes); // Gắn route cho API

// Server chạy trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Rouster cho giỏ hàng
const cartRoutes = require('./routes/cartRoutes');
app.use('/api', cartRoutes);