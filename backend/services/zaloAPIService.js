const db = require('../configs/databaseZaloAPIConfig');

// Đọc trong cơ sở dữ liệu.
const readZaloAPI = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM api`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Cập nhật trong cơ sở dữ liệu.
const updateZaloAPI = async (accessToken, refreshToken) => {
    // Truy vấn SQL để cập nhật
    const sql = `UPDATE api SET accessToken = ?, refreshToken = ?`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [accessToken, refreshToken]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { readZaloAPI, updateZaloAPI };
