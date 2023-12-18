const {
    createLeaveList,
    readLeaveList,
    readLeaveListOther,
    readLeaveListStatistics,
    updateApprovalLeaveList,
    updateNotApprovalLeaveList,
} = require('../services/leaveListService');

const { handleSendZaloNotificationV3 } = require('../utils/handleZaloAPI');

// Xử lý yêu cầu thêm mới dữ liệu.
const createLeaveListHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(userId || leaveTypeId || leaveDay || fromDate || toDate || reason)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để thêm mới vào cơ sở dữ liệu
        await createLeaveList(userId, leaveTypeId, leaveDay, fromDate, toDate, reason);

        // const rsGetSuperior=await handleGetSuperior(userId)

        // const {userId,name}=rsGetSuperior

        const response = await handleSendZaloNotificationV3(userId, '8851502365121811999', 'TTTTT');

        res.json(response);
    } catch (error) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', error);

        res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveList();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListByDateHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { startDate, endDate } = req.query;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(startDate || endDate)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveList(startDate, endDate);

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListOtherHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveListOther();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListOtherByDateHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { startDate, endDate } = req.query;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(startDate || endDate)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveListOther(startDate, endDate);

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListStatisticsHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveListStatistics();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveListStatisticsByDateHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { startDate, endDate } = req.query;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(startDate || endDate)) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readLeaveListStatistics(startDate, endDate);

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu cập nhật dữ liệu.
const updateApproveLeaveListHandler = async (req, res) => {
    // Lấy ID từ params của yêu cầu
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!id) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để cập nhật vào cơ sở dữ liệu
        await updateApprovalLeaveList(id);

        res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xử lý yêu cầu cập nhật dữ liệu.
const updateNotApproveLeaveListHandler = async (req, res) => {
    // Lấy ID từ params của yêu cầu
    const { id } = req.params;

    // Lấy thông tin từ body của yêu cầu
    const { reason } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(id || reason)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để cập nhật vào cơ sở dữ liệu
        await updateNotApprovalLeaveList(id, reason);

        res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = {
    createLeaveListHandler,
    readLeaveListHandler,
    readLeaveListByDateHandler,
    readLeaveListOtherHandler,
    readLeaveListOtherByDateHandler,
    readLeaveListStatisticsHandler,
    readLeaveListStatisticsByDateHandler,
    updateApproveLeaveListHandler,
    updateNotApproveLeaveListHandler,
};
