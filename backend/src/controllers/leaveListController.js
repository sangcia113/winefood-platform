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
    updatedRequestCancel,
    updatedRequestEdit,
} = require('../services/leaveListService');

const {
    readedInfoSuperior,
    readedInfoManager,
    readedInfoMember,
} = require('../services/userService');

const {
    messageApprove,
    messageApproveLeaveType,
    messageApproveLeaveDay,
    messageReject,
    messageRequestCancel,
    messageRequestEdit,
    messageRequestLeave,
} = require('../utils');

const { sendZaloAPIV3 } = require('../services/zaloAPIService');

const leaveListController = {
    created: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { bookLeaveTypeId, bookLeaveType, bookLeaveDay, bookFromDate, bookToDate, reason } =
            req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { userId, name, department } = req.decoded;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(userId, bookLeaveTypeId, bookLeaveDay, bookFromDate, bookToDate, reason);

            const response = await readedInfoSuperior(userId);

            const { superiorName, superiorGender, superiorRoleId, superiorZaloUserID } =
                response[0];

            const zaloAPIText = messageRequestLeave(
                superiorGender,
                superiorName,
                superiorRoleId,
                name,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    receiver: superiorName,
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

    // Xử lý yêu cầu đọc dữ liệu.
    readedManager: async (req, res) => {
        const page = req.query.page || 1;

        const offset = (page - 1) * 10;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedManager(null, null, offset, page);

            res.json(results);
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

            res.json(results);
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

            res.json(results);
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

            res.json(results);
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

            res.json(results);
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

            res.json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
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

            res.json(results);
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

            res.json(results);
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
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedLeaderApproved(id);

            const response = await readedInfoSuperior(userId);

            const { superiorName, superiorRoleId, superiorGender, superiorZaloUserID } =
                response[0];

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

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên Manager qua Zalo!',
                    receiver: superiorName,
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
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { name, roleId } = req.decoded;

        try {
            await updatedLeaderRejected(id);

            const response = await readedInfoMember(userId);

            const { memberName, memberZaloUserId } = response[0];

            const zaloAPIText = messageReject(
                roleId,
                name,
                rejectReason,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối đến nhân viên qua Zalo!',
                    receiver: memberName,
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

        // Lấy thông tin từ body của yêu cầu
        const {
            userId,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { name } = req.decoded;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerApproved(id);

            const response = await readedInfoMember(userId);

            const { memberName, memberZaloUserID } = response[0];

            const zaloAPIText = messageApprove(
                name,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt đến nhân viên qua Zalo!',
                    receiver: memberName,
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
            userId,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { name, roleId } = req.decoded;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedManagerRejected(id, rejectReason);

            const response = await readedInfoMember(userId);

            const { memberName, memberZaloUserID } = response[0];

            const zaloAPIText = messageReject(
                roleId,
                name,
                rejectReason,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối đến nhân viên qua Zalo!',
                    receiver: memberName,
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
            userId,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { name } = req.decoded;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveType(id);

            const response = await readedInfoMember(userId);

            const { memberName, memberZaloUserID } = response[0];

            const zaloAPIText = messageApproveLeaveType(
                name,
                actualLeaveType,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo xác nhận đến nhân viên qua Zalo!',
                    receiver: memberName,
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
            userId,
            userName,
            department,
            bookLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
        } = req.body;

        // Lấy thông tin từ auth của yêu cầu
        const { name } = req.decoded;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedLeaveDay(id);

            const response = await readedInfoMember(userId);

            const { memberName, memberZaloUserID } = response[0];

            const zaloAPIText = messageApproveLeaveDay(
                name,
                actualLeaveDay,
                userName,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
            );

            const responseSend = await sendZaloAPIV3('8851502365121811999', zaloAPIText);

            if (responseSend.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo xác nhận đến nhân viên qua Zalo!',
                    receiver: memberName,
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

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedApprovedRequestDelete(id);

            res.json({ error: 0, message: 'Phê duyệt thành công!' });
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

            res.json({ error: 0, message: 'Huỷ phép thành công!' });
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

        // Lấy thông tin từ auth của yêu cầu
        const { name, department } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const { requestReason, bookLeaveType, bookLeaveDay, bookFromDate, bookToDate, reason } =
            req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedRequestCancel(id, requestReason);

            const response = await readedInfoManager();

            const { managerName, managerGender, managerZaloUserID } = response[0];

            const zaloAPIText = messageRequestCancel(
                managerGender,
                managerName,
                name,
                department,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason,
                requestReason
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

        // Lấy thông tin từ auth của yêu cầu
        const { name, department } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const {
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

            const response = await readedInfoManager();

            const { managerName, managerGender, managerZaloUserID } = response[0];

            const zaloAPIText = messageRequestEdit(
                managerGender,
                managerName,
                name,
                department,
                actualLeaveType,
                actualLeaveDay,
                actualFromDate,
                actualToDate,
                bookLeaveType,
                bookLeaveDay,
                bookFromDate,
                bookToDate,
                reason
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
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = leaveListController;
