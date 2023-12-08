const db = require('../configs/databaseConfig');

// Tạo mới trong cơ sở dữ liệu.
const createLeaveList = async (
    userId,
    bookLeaveTypeId,
    bookLeaveDay,
    bookFromDate,
    bookToDate,
    reason
) => {
    // Truy vấn SQL để thêm
    const sql = `INSERT INTO leave_list(
                    userId,
                    bookLeaveTypeId,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                    requestDate,
                    tracking
                )
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    // Thực hiện truy vấn SQL với các giá trị tham số
    await db.query(sql, [
        userId,
        bookLeaveTypeId,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        new Date(),
        1,
    ]);
};

// Đọc trong cơ sở dữ liệu.
const readLeaveList = async () => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM leave_list ORDER BY id DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createLeaveList, readLeaveList };
