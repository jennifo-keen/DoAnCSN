const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes');
const adminRegisterRoutes = require('./routes/admin/adminRegisterRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000'  // Chỉ cho phép frontend từ domain này gửi yêu cầu
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', cartRoutes);  // Đảm bảo route này đã được khai báo đúng
app.use('/api', productRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', adminRegisterRoutes);

// Xử lý lỗi 404 cho các route không xác định
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Server chạy trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
