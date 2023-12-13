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
    const sql = `SELECT
                    ll.*,
                    u.name,
                    d.name AS department,
                    blt.nameVN AS bookLeaveType,
                    alt.nameVN AS actualLeaveType
                FROM
                    leave_list AS ll
                LEFT JOIN user AS u
                ON
                    u.id = ll.userId
                LEFT JOIN department AS d
                ON
                    d.id = u.departmentId
                LEFT JOIN leave_type AS blt
                ON
                    blt.id = ll.bookLeaveTypeId
                LEFT JOIN leave_type AS alt
                ON
                    alt.id = ll.actualLeaveTypeID
                WHERE 
                    IF (superiorId = 2, managerApproved IN (0,1), leaderApproved = 1)
                ORDER BY
                    ll.id
                DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql);

    return results;
};

// Đọc trong cơ sở dữ liệu.
const readLeaveListIsExist = async (userID, bookLeaveDay, bookFromDate, bookToDate) => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM leave_list WHERE userId = ? AND bookLeaveDay = ? AND bookFromDate = ? AND bookToDate = ? AND deleted IS NULL AND deleteRequest IS NULL`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql, [userID, bookLeaveDay, bookFromDate, bookToDate]);

    return results;
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { createLeaveList, readLeaveList, readLeaveListIsExist };
