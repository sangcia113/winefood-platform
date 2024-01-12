const {
    created,
    readed,
    readedOther,
    readedStatistics,
    readedHistory,
    readedLeader,
    updatedApproved,
    updatedApprovedLeaveDay,
    updatedApprovedLeaveType,
    updatedApprovedRequestDelete,
    updatedRejected,
} = require('../services/leaveListService');
const { readedInfoSuperior } = require('../services/userService');

const { messageLeaveList } = require('../utils/handleZaloMessage');

const { sendZaloAPIV3 } = require('../services/zaloAPIService');

const leaveListController = {
    created: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId, name, department } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const { leaveTypeId, leaveType, leaveDay, fromDate, toDate, reason } = req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(userId, leaveTypeId, leaveDay, fromDate, toDate, reason);

            const response = await readedInfoSuperior(userId);

            const { superiorName, superiorGender, superiorRoleId, superiorZaloUserID } =
                response[0];

            const zaloAPIText = messageLeaveList(
                superiorGender,
                superiorName,
                superiorRoleId,
                name,
                leaveType,
                department,
                leaveDay,
                fromDate,
                toDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    superiorName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1050,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readed();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readed(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedOther: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedOther();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedOtherByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedOther(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedStatistics: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedStatistics();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedStatisticsByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedStatistics(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedHistory: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedHistory(userId);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedLeader: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedLeader(userId);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApproved: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApproved(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedRejected: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { reason } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRejected(id, reason);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveType: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveType(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveDay: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveDay(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedRequestDelete: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedRequestDelete(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = leaveListController;
