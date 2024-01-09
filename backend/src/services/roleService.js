const db = require('../configs/databaseConfig');

const roleService = {
    // Đọc trong cơ sở dữ liệu.
    readed: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        role 
                    ORDER BY 
                        id 
                    ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = roleService;
