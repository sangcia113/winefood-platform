const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createError = async (userId, error, message) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO error (userId, error, message, createdDate) VALUES (?, ?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [userId, error, message, new Date()]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createError };
