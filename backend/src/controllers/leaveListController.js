const {
    created,
    readedManager,
    readedManagerOther,
    readedManagerStatistics,
    readedHistory,
    readedLeader,
    updatedLeaderApproved,
    updatedLeaderRejected,
    updatedManagerApproved,
    updatedApprovedLeaveDay,
    updatedApprovedLeaveType,
    updatedApprovedRequestDelete,
    updatedManagerRejected,
    updatedCancel,
    updatedEdit,
    updatedRequestCancel,
    updatedRequestEdit,
} = require('../services/leaveListService');

const leaveListController = {
    created: async (req, res, next) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const { bookLeaveTypeId, bookLeaveDay, bookFromDate, bookToDate, reason } = req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(userId, bookLeaveTypeId, bookLeaveDay, bookFromDate, bookToDate, reason);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedHistory: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedHistory(userId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedLeader: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedLeader(userId);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManager: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManager();

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManagerByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManager(startDate, endDate);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManagerOther: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManagerOther();

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManagerOtherByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManagerOther(startDate, endDate);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManagerStatistics: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManagerStatistics();

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedManagerStatisticsByDate: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManagerStatistics(startDate, endDate);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedLeaderApproved: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedLeaderApproved(id);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedLeaderRejected: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { rejectReason } = req.body;

        try {
            await updatedLeaderRejected(id, rejectReason);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedManagerApproved: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerApproved(id);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedManagerRejected: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { reason } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerRejected(id, reason);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveType: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveType(id);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveDay: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveDay(id);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedRequestDelete: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedRequestDelete(id);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    updateCancel: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedCancel(id);

            res.status(200).json({ error: 0, message: 'Huỷ phép thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    updateEdit: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { actualLeaveTypeId, actualLeaveDay, actualFromDate, actualToDate } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedEdit(id, actualLeaveTypeId, actualLeaveDay, actualFromDate, actualToDate);

            res.status(200).json({ error: 0, message: 'Sửa phép thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    updateRequestCancel: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { requestReason } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRequestCancel(id, requestReason);

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    updateRequestEdit: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { actualLeaveTypeId, actualLeaveDay, actualFromDate, actualToDate } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRequestEdit(
                id,
                actualLeaveTypeId,
                actualLeaveDay,
                actualFromDate,
                actualToDate
            );

            next();
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = leaveListController;
