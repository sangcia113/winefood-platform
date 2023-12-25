const db = require('../configs/databaseZaloAPIConfig');

const zaloAPIService = {
    // Đọc trong cơ sở dữ liệu.
    read: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        api`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    readUser: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        *
                    FROM
                        user
                    ORDER BY
                        id 
                    ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    update: async (accessToken, refreshToken) => {
        // Truy vấn SQL để cập nhật
        const sql = `UPDATE 
                        api 
                    SET 
                        accessToken = ?, 
                        refreshToken = ?, 
                        createdDate = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [accessToken, refreshToken, new Date()]);
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { zaloAPIService };
