const db = require('../configs/databaseConfig');

const leaveListService = {
    // Tạo mới trong cơ sở dữ liệu.
    create: async (userId, bookLeaveTypeId, bookLeaveDay, bookFromDate, bookToDate, reason) => {
        // Truy vấn SQL để thêm
        const sql = `INSERT INTO 
                        list (
                            userId,
                            bookLeaveTypeId,
                            bookLeaveDay,
                            bookFromDate,
                            bookToDate,
                            reason,
                            requestDate,
                            tracking)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

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
    },

    read: async (startDate, endDate) => {
        const params = [];

        // Truy vấn SQL để đọc
        let sql = `SELECT
                        l.*,
                        u.name AS userName,
                        d.name AS department,
                        bt.nameVN AS bookLeaveType,
                        at.nameVN AS actualLeaveType
                    FROM list AS
                        l
                    LEFT JOIN user AS u
                    ON
                        u.id = l.userId
                    LEFT JOIN department AS d
                    ON
                        d.id = u.departmentId
                    LEFT JOIN type AS bt
                    ON
                        bt.id = l.bookLeaveTypeId
                    LEFT JOIN type AS at
                    ON 
                        at.id = l.actualLeaveTypeID
                    WHERE
                        deleted IS NULL 
                    AND (
                        superiorId IN (SELECT id FROM user WHERE roleId IN (1, 2))
                        OR leaderApproved = 1 )`;

        if (startDate && endDate) {
            sql +=
                startDate === endDate
                    ? ` AND ? BETWEEN DATE(bookFromDate) AND DATE(bookToDate)`
                    : ` AND DATE(bookFromDate) <= ? AND DATE(bookToDate) >= ?`;

            params.push(endDate, startDate);
        }

        sql += ` ORDER BY l.id DESC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, params);

        return results;
    },

    readOther: async (startDate, endDate) => {
        const params = [];

        // Truy vấn SQL để đọc
        let sql = `SELECT
                        l.id,
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
                        list AS l
                    LEFT JOIN user AS u
                    ON
                        u.id = l.userId
                    LEFT JOIN department AS d
                    ON
                        d.id = u.departmentId
                    LEFT JOIN type AS t
                    ON
                        t.id = l.bookLeaveTypeId
                    WHERE 
                        leaderApproved IS NULL AND managerApproved IS NULL`;

        if (startDate && endDate) {
            sql +=
                startDate === endDate
                    ? ` AND ? BETWEEN DATE(bookFromDate) AND DATE(bookToDate)`
                    : ` AND DATE(bookFromDate) <= ? AND DATE(bookToDate) >= ?`;

            params.push(endDate, startDate);
        }

        sql += ` ORDER BY l.id DESC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, params);

        return results;
    },

    readStatistics: async (startDate, endDate) => {
        const params = [];

        // Truy vấn SQL để đọc
        let sql = `SELECT
                    u.name,
                    SUM(numberLeave) AS totalLeave
                FROM
                    (
                    SELECT
                        userId,
                        CASE WHEN 
                            actualLeaveDay IS NOT NULL 
                        THEN 
                            actualLeaveDay 
                        ELSE 
                            bookLeaveDay
                        END AS numberLeave
                        FROM 
                            list
                        WHERE
                            managerApproved = 1 
                        AND 
                            deleteRequest IS NULL`;

        if (startDate && endDate) {
            sql +=
                startDate === endDate
                    ? ` AND ? BETWEEN DATE(bookFromDate) AND DATE(bookToDate)`
                    : ` AND DATE(bookFromDate) <= ? AND DATE(bookToDate) >= ?`;

            params.push(endDate, startDate);
        }

        sql += ` ) AS t
                    LEFT JOIN 
                        user AS u
                    ON
                        u.id = t.userID
                    GROUP BY
                        userId
                    ORDER BY
                        userId 
                    ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, params);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    checkIsExist: async (userID, bookLeaveDay, bookFromDate, bookToDate) => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        list 
                    WHERE 
                        userId = ? 
                    AND 
                        bookLeaveDay = ? 
                    AND 
                        bookFromDate = ? 
                    AND 
                        bookToDate = ? 
                    AND 
                        deleted IS NULL 
                    AND 
                        deleteRequest IS NULL`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [userID, bookLeaveDay, bookFromDate, bookToDate]);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    checkStatus: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        managerApproved 
                    FROM 
                        list 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [id]);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    checkStatusLeaveType: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        actualLeaveTypeID, 
                        managerApprovedLeaveType 
                    FROM 
                        list 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [id]);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    checkStatusLeaveDay: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        actualLeaveDay, 
                        managerApprovedLeaveDay 
                    FROM 
                        list 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [id]);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    checkStatusRequestDelete: async id => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        deleteRequest, 
                        managerApprovedDelete 
                    FROM 
                        list 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql, [id]);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    updateApproved: async id => {
        // Truy vấn SQL để đọc
        const sql = `UPDATE 
                        list 
                    SET 
                        managerApproved = ?, 
                        managerRejectReason = ?, 
                        managerApprovedDate = ? 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [1, '', new Date(), id]);
    },

    // Cập nhật trong cơ sở dữ liệu.
    updateRejected: async (id, reason) => {
        // Truy vấn SQL để đọc
        const sql = `UPDATE 
                        list 
                    SET 
                        managerApproved = ?, 
                        managerRejectReason = ?, 
                        managerApprovedDate = ? 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [0, reason, new Date(), id]);
    },

    // Cập nhật trong cơ sở dữ liệu.
    updateApprovedLeaveType: async id => {
        // Truy vấn SQL để đọc
        const sql = `UPDATE 
                        list 
                    SET 
                        managerApprovedLeaveType = ?, 
                        managerApprovedLeaveTypeDate = ?, 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [1, new Date(), id]);
    },

    // Cập nhật trong cơ sở dữ liệu.
    updateApprovedLeaveDay: async id => {
        // Truy vấn SQL để đọc
        const sql = `UPDATE 
                        list 
                    SET 
                        managerApprovedLeaveDay = ?, 
                        managerApprovedLeaveDayDate = ?, 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [1, new Date(), id]);
    },

    // Cập nhật trong cơ sở dữ liệu.
    updateApprovedRequestDelete: async id => {
        // Truy vấn SQL để đọc
        const sql = `UPDATE 
                        list 
                    SET 
                        managerApprovedDelete = ?, 
                        managerApprovedLeaveDayDate = ?, 
                    WHERE 
                        id = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [1, new Date(), id]);
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = { leaveListService };
