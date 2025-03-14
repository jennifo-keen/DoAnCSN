const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Lấy token từ headers

  if (!token) {
    return res.status(401).json({ message: 'Không có quyền truy cập' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }

    req.user = decoded; // Gán thông tin người dùng vào req.user
    next();
  });
};
