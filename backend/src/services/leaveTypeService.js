const db = require('../configs/databaseConfig');

const leaveTypeService = {
    // Tạo mới trong cơ sở dữ liệu.
    created: async (code, nameVN, nameEN) => {
        // Truy vấn SQL để thêm
        const sql = `INSERT INTO 
                        type (
                            code, 
                            nameVN, 
                            nameEN, 
                            createdDate) 
                    VALUES (?, ?, ?, ?)`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [code, nameVN, nameEN, new Date()]);
    },

    // Đọc trong cơ sở dữ liệu.
    readed: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        type 
                    WHERE
                        deleted IS NULL
                    ORDER BY 
                        id 
                    ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    updated: async (code, nameVN, nameEN, id) => {
        // Truy vấn SQL để cập nhật
        const sql = `UPDATE 
                        type 
                    SET 
                        code = ?, 
                        nameVN = ?, 
                        nameEN = ?,
                        updatedDate = ? 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [code, nameVN, nameEN, new Date(), id]);
    },

    // Xóa khỏi cơ sở dữ liệu.
    deleted: async id => {
        // Truy vấn SQL để xoá
        const sql = `UPDATE 
                        type 
                    SET 
                        deleted = ?,
                        deletedDate = ? 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [1, new Date(), id]);
    },

    // Đọc trong cơ sở dữ liệu.
    checkIsExist: async (code, nameVN, nameEN) => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        type 
                    WHERE
                        code = ? 
                    OR
                        nameVN = ?
                    OR
                        nameEN = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [code, nameVN, nameEN]);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = leaveTypeService;
