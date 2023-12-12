const { readLeaveListIsExist } = require('../services/leaveListService');

// Xử lý yêu cầu đọc dữ liệu.
const checkleaveListExistedMiddleWare = async (req, res, next) => {
    // Lấy thông tin từ body của yêu cầu
    const { userId, leaveDay, fromDate, toDate } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(userId || leaveDay || fromDate || toDate)) {
        return res.status(400).json({ messageApp: 'Dữ liệu đầu vào không hợp lệ' });
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

module.exports = { checkleaveListExistedMiddleWare };
