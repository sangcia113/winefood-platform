const db = require('../configs/databaseConfig');

const departmentService = {
    // Tạo mới trong cơ sở dữ liệu.
    create: async (code, name) => {
        // Truy vấn SQL để thêm
        const sql = `INSERT INTO 
                    department (
                        code, 
                        name, 
                        createdDate) 
                VALUES (?, ?, ?)`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [code, name, new Date()]);
    },

    // Đọc trong cơ sở dữ liệu.
    read: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                    * 
                FROM 
                    department 
                ORDER BY 
                    id 
                ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    update: async (code, name, id) => {
        // Truy vấn SQL để cập nhật
        const sql = `UPDATE 
                    department 
                SET 
                    code= ?, 
                    name = ?,
                    updatedDate = ? 
                WHERE 
                    id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [code, name, new Date(), id]);
    },

    // Xóa khỏi cơ sở dữ liệu.
    delete: async id => {
        // Truy vấn SQL để xoá
        const sql = `DELETE FROM 
                    department 
                WHERE 
                    id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [id]);
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { departmentService };
