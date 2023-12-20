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
        const sql = `INSERT INTO user (code, name, birthday, gender, numberPhone, password, departmentId, superiorId, roleId, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
                    l.id userId,
                    l.name userName,
                    za.zaloUserId
                FROM
                    leave.user l
                LEFT JOIN zalo_api.user za
                ON
                    za.zaloNumberPhone = l.numberPhone AND za.zaloNumberPhone != ''
                ORDER BY
                    l.id ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    readInfoLeader: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        l.name,
                        l.gender,
                        l.roleId,
                        r.name role,
                        za.zaloUserId
                    FROM
                        leave.user l
                    LEFT JOIN
                        leave.role r
                    ON
                        r.id = l.roleId
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
                            l.id = ?
                    )`;

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
        const sql = `UPDATE user SET code= ?, name = ?, birthday = ?, gender = ?, numberPhone = ?, password = ?, departmentId = ?, superiorId = ?, roleId = ? WHERE id = ?`;

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
        const sql = 'DELETE FROM user WHERE id = ?';

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [id]);
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { userService };
