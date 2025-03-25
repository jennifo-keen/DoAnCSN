const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/user/productRoutes');
const cartRoutes = require('./routes/user/cartRoutes');
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes');
const adminRegisterRoutes = require('./routes/admin/adminRegisterRoutes');
const orderRoutes = require('./routes/user/orderRoutes');
const app = express();
const orderDetailRoutes = require('./routes/user/orderdetail');
const order = require('./routes/admin/orders')

// Middleware
app.use(cors({
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/order', orderRoutes);
// Routes
app.use('/api', cartRoutes);
app.use('/api', productRoutes);
app.use('/api', adminAuthRoutes);
app.use('/api', adminRegisterRoutes);
app.use('/api', orderDetailRoutes);
app.use('/api', order)
// Xử lý lỗi 404 cho các route không xác định
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Server chạy trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
