const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createUser = async (
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
};

// Đọc trong cơ sở dữ liệu.
const readUser = async () => {
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
};

// Cập nhật trong cơ sở dữ liệu.
const updateUser = async (
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
};

// Xóa khỏi cơ sở dữ liệu.
const deleteUser = async id => {
    // Truy vấn SQL để xoá
    const sql = 'DELETE FROM user WHERE id = ?';

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [id]);
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createUser, readUser, updateUser, deleteUser };
