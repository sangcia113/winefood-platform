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
    const sql = `INSERT INTO list(
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

const readLeaveList = async (startDate, endDate) => {
    const params = [];

    // Truy vấn SQL để đọc
    let sql = `SELECT
                    ll.*,
                    u.name AS userName,
                    d.name AS department,
                    bt.nameVN AS bookLeaveType,
                    at.nameVN AS actualLeaveType
                FROM
                    list AS ll
                LEFT JOIN user AS u
                ON
                    u.id = ll.userId
                LEFT JOIN department AS d
                ON
                    d.id = u.departmentId
                LEFT JOIN type AS bt
                ON
                    bt.id = ll.bookLeaveTypeId
                LEFT JOIN type AS at
                ON
                    at.id = ll.actualLeaveTypeID
                WHERE 
                    IF (superiorId IN (1, 2), managerApproved IN (0, 1), leaderApproved = 1) AND (deleted = 0 OR deleted IS NULL)`;

    if (startDate && endDate) {
        sql += ` AND bookFromDate <= ? AND bookToDate >= ?`;

        params.push(endDate, startDate);
    }

    sql += ` ORDER BY ll.id DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql, params);

    return results;
};

const readLeaveListOther = async (startDate, endDate) => {
    const params = [];

    // Truy vấn SQL để đọc
    let sql = `SELECT
                    ll.id,
                    userId,
                    u.name AS userName,
                    d.name AS department,
                    nameVN AS bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason,
                    requestDate,
                    deleted
                FROM
                    list AS ll
                LEFT JOIN user AS u
                ON
                    u.id = ll.userId
                LEFT JOIN department AS d
                ON
                    d.id = u.departmentId
                LEFT JOIN type AS bt
                ON
                    bt.id = ll.bookLeaveTypeId
                WHERE 
                    IF (superiorId IN (1,2), managerApproved IN (0, NULL), leaderApproved = 0)`;

    if (startDate && endDate) {
        sql += ` AND bookFromDate <= ? AND bookToDate >= ?`;

        params.push(endDate, startDate);
    }

    sql += ` ORDER BY ll.id DESC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql, params);

    return results;
};

const readLeaveListStatistics = async (startDate, endDate) => {
    const params = [];

    // Truy vấn SQL để đọc
    let sql = `SELECT
                    u.name,
                    SUM(numberLeave) AS totalLeave
                FROM
                    (
                    SELECT
                        userId,
                        CASE WHEN actualLeaveDay IS NOT NULL THEN actualLeaveDay ELSE bookLeaveDay
                END AS numberLeave
                FROM list
                WHERE
                    managerApproved = 1 AND deleteRequest IS NULL`;

    if (startDate && endDate) {
        sql += ` AND bookFromDate <= ? AND bookToDate >= ?`;

        params.push(endDate, startDate);
    }

    sql += ` ) AS t
    LEFT JOIN user AS u
    ON
        u.id = t.userID
    GROUP BY
        userId
    ORDER BY
        userId ASC`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql, params);

    return results;
};

// Đọc trong cơ sở dữ liệu.
const readLeaveListIsExist = async (userID, bookLeaveDay, bookFromDate, bookToDate) => {
    // Truy vấn SQL để đọc
    const sql = `SELECT * FROM list WHERE userId = ? AND bookLeaveDay = ? AND bookFromDate = ? AND bookToDate = ? AND deleted IS NULL AND deleteRequest IS NULL`;

    // Thực hiện truy vấn SQL và trả về kết quả
    const [results] = await db.query(sql, [userID, bookLeaveDay, bookFromDate, bookToDate]);

    return results;
};

// Xuất các hàm để sử dụng trong module khác
module.exports = {
    createLeaveList,
    readLeaveList,
    readLeaveListOther,
    readLeaveListStatistics,
    readLeaveListIsExist,
};
