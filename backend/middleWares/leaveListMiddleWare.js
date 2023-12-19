const { readLeaveListIsExist, readStatusLeaveList } = require('../services/leaveListService');

const checkIsExisted = async (req, res, next) => {
    // Lấy thông tin từ body của yêu cầu
    const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(userId && leaveTypeId && leaveDay && fromDate && toDate && reason)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveListIsExist(userId, leaveDay, fromDate, toDate);

        if (results.length > 0) return res.json({ error: -904 });

        next();
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

const checkApproved = async (req, res, next) => {
    // Lấy thông tin từ body của yêu cầu
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!id) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để cập nhật vào cơ sở dữ liệu
        const results = await readStatusLeaveList(id);

        if (results[0].managerApproved === 1)
            return res.json({
                error: 908,
                message: 'Bạn đã phê duyệt yêu cầu nghỉ phép này.!',
            });

        next();
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

const checkRejected = async (req, res, next) => {
    // Lấy thông tin từ body của yêu cầu
    const { id } = req.params;

    // Lấy thông tin từ body của yêu cầu
    const { reason } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(id && reason)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để cập nhật vào cơ sở dữ liệu
        const results = await readStatusLeaveList(id);

        if (results[0].managerApproved === 0)
            return res.json({ error: 909, message: 'Bạn đã từ chối yêu cầu nghỉ phép này!' });

        next();
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

const checkDate = async (req, res, next) => {
    // Lấy thông tin từ body của yêu cầu
    const { startDate, endDate } = req.query;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(startDate && endDate)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }
};

module.exports = { checkIsExisted, checkApproved, checkRejected, checkDate };
