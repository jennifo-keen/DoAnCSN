const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Kết nối database
const bcrypt = require('bcrypt');

// API lấy danh sách sản phẩm
router.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Lỗi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API lấy sản phẩm theo loại (Nhẫn cầu hôn, Nhẫn cưới, Trang sức)
router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE category_id = ?', [categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Lỗi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API lấy chi tiết sản phẩm
router.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
  } catch (error) {
    console.error('Lỗi truy vấn database:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API đăng ký người dùng
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const [existingCustomer] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (existingCustomer.length > 0) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      'INSERT INTO customers (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, phone]
    );

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Lỗi khi xử lý đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác' });
    }

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        id: user[0].customer_id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.error('Lỗi khi xử lý đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API tìm kiếm sản phẩm
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ message: 'Vui lòng nhập từ khóa' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM products WHERE name LIKE ? COLLATE utf8mb4_unicode_ci',
      [`%${keyword}%`]
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});


// API thêm sản phẩm
router.post('/products', async (req, res) => {
  const { name, description, price, stock_quantity, category_id, image_url } = req.body;

  if (!name || !price || !stock_quantity || !category_id ||!category_id ||!image_url) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm' });
  }

  try {
    await db.query(
      'INSERT INTO products (name, description, price, stock_quantity, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, stock_quantity, category_id, image_url]
    );
    res.status(201).json({ message: 'Thêm sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API sửa sản phẩm
router.put('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, stock_quantity, category_id, image_url } = req.body;

  try {
    const [existingProduct] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?, category_id = ?, image_url = ? WHERE product_id = ?',
      [name, description, price, stock_quantity, category_id, image_url, productId]
    );

    res.json({ message: 'Cập nhật sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API xóa sản phẩm
router.delete('/products/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const [existingProduct] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }

    await db.query('DELETE FROM products WHERE product_id = ?', [productId]);

    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

// API lấy thông tin người dùng
router.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
    }
    res.json(result[0]); // Trả về dữ liệu của user
  });
});

// API cập nhật thông tin người dùng
router.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, phone, shipping_address } = req.body;

  try {
    let updateFields = [];
    let values = [];

    if (name) {
      updateFields.push("name = ?");
      values.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      values.push(email);
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      values.push(hashedPassword);
    }
    if (phone) {
      updateFields.push("phone = ?");
      values.push(phone);
    }
    if (shipping_address) {
      updateFields.push("shipping_address = ?");
      values.push(shipping_address);
    }

    values.push(userId);

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "Không có thông tin nào để cập nhật" });
    }

    const query = `UPDATE customers SET ${updateFields.join(", ")} WHERE customer_id = ?`;
    db.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi cập nhật dữ liệu" });
      }
      res.json({ message: "Cập nhật thành công!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi xử lý dữ liệu" });
  }
});

module.exports = router;
