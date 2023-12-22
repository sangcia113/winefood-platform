const db = require('../configs/databaseConfig');

const roleService = {
    // Đọc trong cơ sở dữ liệu.
    read: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT * FROM role ORDER BY id DESC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { roleService };
