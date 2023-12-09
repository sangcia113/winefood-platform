const leaveListService = require('../services/leaveListService');
const { handleSendZaloNotificationV3 } = require('../utils/handleZaloAPI');

// Xử lý yêu cầu thêm mới dữ liệu.
const createLeaveListHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(userId || leaveTypeId || leaveDay || fromDate || toDate || reason)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để thêm mới vào cơ sở dữ liệu
        await leaveListService.createLeaveList(
            userId,
            leaveTypeId,
            leaveDay,
            fromDate,
            toDate,
            reason
        );

        // res.json({ message: 'Thêm dữ liệu thành công!' });
        const response = await handleSendZaloNotificationV3('8851502365121811999', 'TEST1');

        res.json(response);
    } catch (error) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', error);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await leaveListService.readLeaveList();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListIsExistedHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { userID, bookLeaveDay, bookFromDate, bookToDate } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(userID || bookLeaveDay || bookFromDate || bookToDate)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await leaveListService.readLeaveListIsExist(
            userID,
            bookLeaveDay,
            bookFromDate,
            bookToDate
        );

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = {
    createLeaveListHandler,
    readLeaveListHandler,
    readLeaveListIsExistedHandler,
};
