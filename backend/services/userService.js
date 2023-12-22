const db = require('../configs/databaseConfig');

const userService = {
    // Tạo mới trong cơ sở dữ liệu.
    create: async (
        code,
        name,
        birthday,
        gender,
        numberPhone,
        password,
        departmentId,
        superiorId,
        roleId
    ) => {
        // Truy vấn SQL để thêm
        const sql = `INSERT INTO 
                        user (
                            code, 
                            name, 
                            birthday, 
                            gender, 
                            numberPhone, 
                            password, 
                            departmentId, 
                            superiorId, 
                            roleId, 
                            createdDate) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [
            code,
            name,
            birthday,
            gender,
            numberPhone,
            password,
            departmentId,
            superiorId,
            roleId,
            new Date(),
        ]);
    },

    // Đọc trong cơ sở dữ liệu.
    read: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.*,
                        zaloUserId
                    FROM
                        leave.user AS l
                    INNER JOIN
                        zalo_api.user AS za
                    ON
                        za.zaloNumberPhone = l.numberPhone AND za.zaloNumberPhone != ''
                    ORDER BY
                        l.id ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    readInfoSuperior: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.name superiorName,
                        l.gender superiorGender,
                        l.roleId superiorRoleId,
                        za.zaloUserId superiorZaloUID
                    FROM
                        leave.user l
                    LEFT JOIN
                        zalo_api.user za
                    ON
                        za.zaloNumberPhone = l.numberPhone
                    WHERE
                        l.id = (
                        SELECT
                            l.superiorId
                        FROM 
                            leave.user l
                        WHERE
                            l.id = ?)`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [id]);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    update: async (
        code,
        name,
        birthday,
        gender,
        numberPhone,
        password,
        departmentId,
        superiorId,
        roleId,
        id
    ) => {
        // Truy vấn SQL để cập nhật
        const sql = `UPDATE 
                        user 
                    SET 
                        code= ?, 
                        name = ?, 
                        birthday = ?, 
                        gender = ?, 
                        numberPhone = ?, 
                        password = ?, 
                        departmentId = ?, 
                        superiorId = ?, 
                        roleId = ? 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [
            code,
            name,
            birthday,
            gender,
            numberPhone,
            password,
            departmentId,
            superiorId,
            roleId,
            id,
        ]);
    },

    // Xóa khỏi cơ sở dữ liệu.
    delete: async id => {
        // Truy vấn SQL để xoá
        const sql = `DELETE FROM 
                        user 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [id]);
    },

    // Đọc trong cơ sở dữ liệu.
    checkIsExist: async (code, numberPhone) => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        user 
                    WHERE 
                        code = ?
                    OR
                        numberPhone = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [code, numberPhone]);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { userService };
