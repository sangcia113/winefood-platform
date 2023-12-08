require('dotenv').config();
// Import module MySQL
const mysql = require('mysql2/promise');

// Tạo kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST, // Địa chỉ host của cơ sở dữ liệu
    user: process.env.DB_USER, // Tên người dùng cơ sở dữ liệu
    password: process.env.DB_PASSWORD, // Mật khẩu cơ sở dữ liệu
    database: process.env.DB_ZALO_API, // Tên cơ sở dữ liệu
});

module.exports = db;
