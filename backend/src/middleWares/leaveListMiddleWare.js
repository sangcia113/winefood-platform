const { leaveListService } = require('../services/leaveListService');

const leaveListMiddleWare = {
    checkParam: async (req, res, next) => {
        // Lấy thông tin từ param của yêu cầu
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ' });

        next();
    },

    checkBody: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(userId && leaveTypeId && leaveDay && fromDate && toDate && reason))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkIsExist: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.checkIsExist(userId, leaveDay, fromDate, toDate);

            if (results.length > 0)
                return res.status(400).json({
                    error: -904,
                    message: 'Đơn xin nghỉ phép của bạn đã tồn tại trong hệ thống!',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    checkApproved: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            const results = await leaveListService.checkStatus(id);

            if (results[0].managerApproved === 1)
                return res.json({
                    error: 908,
                    message: 'Bạn đã phê duyệt yêu cầu nghỉ phép này.!',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    checkRejected: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { reason } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!reason)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            const results = await leaveListService.checkStatus(id);

            if (results[0].managerApproved === 0)
                return res.json({ error: 909, message: 'Bạn đã từ chối yêu cầu nghỉ phép này!' });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    checkApprovedLeaveType: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            const results = await leaveListService.checkStatusLeaveType(id);

            if (!results[0].actualLeaveTypeID || !results[0].managerApprovedLeaveType)
                return res.json({
                    error: 908,
                    message:
                        'Không có yêu cầu điều chỉnh loại nghỉ phép thực tế.\nBạn đã xác nhận điều chỉnh loại nghỉ phép thực tế này.',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    checkApprovedLeaveDay: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            const results = await leaveListService.checkStatusLeaveType(id);

            if (!results[0].actualLeaveDay || !results[0].managerApprovedLeaveDay)
                return res.json({
                    error: 908,
                    message:
                        'Không có yêu cầu điều chỉnh số ngày nghỉ phép thực tế.\nBạn đã xác nhận điều chỉnh số ngày nghỉ phép thực tế này.',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    checkApprovedRequestDelete: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            const results = await leaveListService.checkStatusRequestDelete(id);

            if (!results[0].deleteRequest || !results[0].managerApprovedDelete)
                return res.json({
                    error: 908,
                    message: 'Không có yêu cầu hủy phép.\nBạn đã xác nhận hủy phép này.',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    checkDate: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(startDate && endDate))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },
};

module.exports = leaveListMiddleWare;
