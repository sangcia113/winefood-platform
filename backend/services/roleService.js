const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createRole = async (code, name) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO role (code, name, createdDate) VALUES (?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, name, new Date()]);
};

// Đọc trong cơ sở dữ liệu.
const readRole = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM role ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Cập nhật trong cơ sở dữ liệu.
const updateRole = async (code, name, id) => {
    // Truy vấn SQL để cập nhật
    const sql = `UPDATE role SET code= ?, name = ? WHERE id = ?`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, name, id]);
};

// Xóa khỏi cơ sở dữ liệu.
const deleteRole = async id => {
    // Truy vấn SQL để xoá
    const sql = 'DELETE FROM role WHERE id = ?';

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [id]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createRole, readRole, updateRole, deleteRole };
