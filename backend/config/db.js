const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',       // Địa chỉ database
  user: 'root',            // Tên người dùng
  password: '', // Mật khẩu
  database: 'jewelrystore', // Tên database
});

module.exports = pool.promise();
