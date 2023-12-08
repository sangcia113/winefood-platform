const db = require('../configs/databaseZaloAPIConfig');

// Tạo mới trong cơ sở dữ liệu.
const createZaloAPI = async (accessToken, refreshToken, secretKey, appId) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO api (accessToken, refreshToken, secretKey, appId) VALUES (?, ?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [accessToken, refreshToken, secretKey, appId, new Date()]);
};

// Đọc trong cơ sở dữ liệu.
const readZaloAPI = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM api`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Cập nhật trong cơ sở dữ liệu.
const updateZaloAPI = async (accessToken, refreshToken, secretKey, appId, id) => {
    // Truy vấn SQL để cập nhật
    const sql = `UPDATE api SET accessToken = ?, refreshToken = ?, secretKey = ?, appId = ? WHERE id = ?`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [accessToken, refreshToken, secretKey, appId, id]);
};

// Xóa khỏi cơ sở dữ liệu.
const deleteZaloAPI = async id => {
    // Truy vấn SQL để xoá
    const sql = 'DELETE FROM api WHERE id = ?';

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [id]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createZaloAPI, readZaloAPI, updateZaloAPI, deleteZaloAPI };
