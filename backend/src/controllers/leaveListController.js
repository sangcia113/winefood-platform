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

const { readedInfoSuperior, readedInfoManager } = require('../services/userService');

const { sendZaloAPIV3 } = require('../services/zaloAPIService');

const {
    messageApproveCancelLeave,
    messageApproveLeaveDay,
    messageApproveLeaveType,
    messageLeaderAproval,
    messageLeaderReject,
    messageManagerApproval,
    messageManagerReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
} = require('../utils');

const leaveListController = {
    created: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId, userName, department } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const { bookLeaveTypeId, bookLeaveType, bookLeaveDay, bookFromDate, bookToDate, reason } =
            req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(userId, bookLeaveTypeId, bookLeaveDay, bookFromDate, bookToDate, reason);

            // Lấy thông tin Superior
            const [{ superiorName, superiorGender, superiorRoleId, superiorZaloUserID }] =
                await readedInfoSuperior(userId);

            const zaloAPIText = messageRequestLeave(
                superiorGender,
                superiorName,
                superiorRoleId,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const response = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    receiver: superiorName,
                });
            } else {
                res.status(400).json(response);
            }
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
    updatedLeaderApproved: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedLeaderApproved(id);

            const [{ managerGender, managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageLeaderAproval(
                managerGender,
                managerName,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    receiver: managerName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedLeaderRejected: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            rejectReason,
            userId,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            await updatedLeaderRejected(id, rejectReason);

            const [{ superiorName, superiorZaloUserID }] = await readedInfoSuperior(userId);

            const zaloAPIText = messageLeaderReject(
                superiorName,
                rejectReason,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedManagerApproved: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        const {
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerApproved(id);

            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageManagerApproval(
                managerName,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedManagerRejected: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            rejectReason,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerRejected(id, reason);

            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageManagerReject(
                managerName,
                rejectReason,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveType: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            actualLeaveType,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveType(id);

            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageApproveLeaveType(
                managerName,
                actualLeaveType,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedLeaveDay: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            actualLeaveDay,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveDay(id);

            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageApproveLeaveDay(
                managerName,
                actualLeaveDay,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updatedApprovedRequestDelete: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedRequestDelete(id);

            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageApproveCancelLeave(
                managerName,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
                });
            } else {
                res.status(400).json(responseSend);
            }
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

    updateRequestCancel: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            requestReason,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRequestCancel(id, requestReason);

            const [{ managerGender, managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageRequestCancel(
                managerGender,
                managerName,
                requestReason,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    receiver: managerName,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    updateRequestEdit: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            actualLeaveTypeId,
            actualLeaveType,
            actualLeaveDay,
            actualFromDate,
            actualToDate,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRequestEdit(
                id,
                actualLeaveTypeId,
                actualLeaveDay,
                actualFromDate,
                actualToDate
            );

            const [{ managerGender, managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageRequestEdit(
                managerGender,
                managerName,
                userName,
                department,
                actualLeaveType,
                actualLeaveDay,
                actualFromDate,
                actualToDate,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestDate
            );

            const response = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    receiver: managerName,
                });
            } else {
                res.status(400).json(response);
            }
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
