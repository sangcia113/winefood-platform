const db = require('../configs/databaseConfig');

const userService = {
    // Tạo mới trong cơ sở dữ liệu.
    created: async (
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
    readed: async () => {
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

    // Đọc trong cơ sở dữ liệu.
    readedInfoSuperior: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.name superiorName,
                        l.gender superiorGender,
                        l.roleId superiorRoleId,
                        za.zaloUserId superiorZaloUserID
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

    // Đọc trong cơ sở dữ liệu.
    readedInfoMember: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.name memberName, 
                        za.zaloUserId memberZaloUserId
                    FROM
                        leave.user l
                    LEFT JOIN
                        zalo_api.user za
                    ON
                        za.zaloNumberPhone = l.numberPhone
                    WHERE
                        l.id = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, id);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    readedInfoManager: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.name managerName,
                        l.gender managerGender,
                        za.zaloUserId managerZaloUserID
                    FROM
                        leave.user l
                    LEFT JOIN
                        zalo_api.user za
                    ON
                        za.zaloNumberPhone = l.numberPhone
                    WHERE
                        l.roleId = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [3]);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    updated: async (
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
                        roleId = ?,
                        updatedDate = ? 
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
            new Date(),
            id,
        ]);
    },

    // Xóa khỏi cơ sở dữ liệu.
    deleted: async id => {
        // Truy vấn SQL để xoá
        const sql = `DELETE FROM 
                        user 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [id]);
    },

    // Đọc trong cơ sở dữ liệu.
    checkIsExist: async (code, numberPhone, username) => {
        const params = [];

        // Truy vấn SQL để đọc
        let sql = `SELECT 
                        u.*,
                        d.name department
                    FROM 
                        user u
                    LEFT JOIN
                        department d
                    ON
                        d.id = u.departmentId
                    WHERE `;

        if (code && numberPhone) {
            sql += `code = ? 
                    AND 
                numberPhone = ?`;

            params.push(code, numberPhone);
        }

        if (username) {
            sql += `username = ?`;

            params.push(username);
        }

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, params);

        return results;
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = userService;
