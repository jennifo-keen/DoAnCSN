const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminAuthRoutes = require('./routes/admin/adminAuthRoutes');
const adminRegisterRoutes = require('./routes/admin/adminRegisterRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', adminAuthRoutes); // Thêm route cho admin
app.use('/api', adminRegisterRoutes);

// Server chạy trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
