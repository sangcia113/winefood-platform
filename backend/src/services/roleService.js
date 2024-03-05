const db = require('../configs/databaseConfig');

const roleService = {
    created: async (code, name) => {
        const sql = `INSERT INTO
                        role (
                            code, name, createdDate
                        ) 
                    VALUES (?, ?, ?)`;

        await db.query(sql, [code, name, new Date()]);
    },

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

    updated: async (code, name, id) => {
        const sql = `UPDATE 
                        role
                    SET
                        code = ?,
                        name = ?,
                        updatedDate = ?
                    WHERE
                        id = ?`;

        await db.query(sql, [code, name, new Date(), id]);
    },

    deleted: async id => {
        const sql = `DELETE FROM
                        role
                    WHERE
                        id = ?`;

        await db.query(sql, [id]);
    },

    checkIsExist: async code => {
        const sql = `SELECT
                        *
                    FROM
                        role
                    WHERE
                        id = ?`;

        const [results] = await db.query(sql, [code]);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = roleService;
