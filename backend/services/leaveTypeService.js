const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createLeaveType = async (code, nameVN, nameEN) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO leave_type (code, nameVN, nameEN, createdDate) VALUES (?, ?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, nameVN, nameEN, new Date()]);
};

// Đọc trong cơ sở dữ liệu.
const readLeaveType = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM leave_type ORDER BY id ASC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Cập nhật trong cơ sở dữ liệu.
const updateLeaveType = async (code, nameVN, nameEN, id) => {
    // Truy vấn SQL để cập nhật
    const sql = `UPDATE leave_type SET code= ?, nameVN = ?, nameEN = ? WHERE id = ?`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [code, nameVN, nameEN, id]);
};

// Xóa khỏi cơ sở dữ liệu.
const deleteLeaveType = async id => {
    // Truy vấn SQL để xoá
    const sql = 'DELETE FROM leave_type WHERE id = ?';

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [id]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createLeaveType, readLeaveType, updateLeaveType, deleteLeaveType };
