const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createDepartment = async (code, name) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO department (code, name, createdDate) VALUES (?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, name, new Date()]);
};

// Đọc trong cơ sở dữ liệu.
const readDepartment = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM department ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Cập nhật trong cơ sở dữ liệu.
const updateDepartment = async (code, name, id) => {
    // Truy vấn SQL để cập nhật
    const sql = `UPDATE department SET code= ?, name = ? WHERE id = ?`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, name, id]);
};

// Xóa khỏi cơ sở dữ liệu.
const deleteDepartment = async id => {
    // Truy vấn SQL để xoá
    const sql = 'DELETE FROM department WHERE id = ?';

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [id]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createDepartment, readDepartment, updateDepartment, deleteDepartment };
