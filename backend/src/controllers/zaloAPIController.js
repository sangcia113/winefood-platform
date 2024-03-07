require('dotenv').config();

const { readedUser, sendZaloAPIV3, getFollower } = require('../services/zaloAPIService');
const { readedInfoSuperior, readedInfoManager } = require('../services/userService');
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

const zaloAPIController = {
    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedUser();

            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    readedFollower: async (req, res) => {
        try {
            const [results] = await getFollower(0);

            res.status(200).json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Member yêu cầu gửi tin nhắn đến cấp trên
    memberSendMessageRequestToSuperior: async (req, res) => {
        // Lấy thông tin từ auth của yêu cầu
        const { userId, userName, department } = req.decoded;

        // Lấy thông tin từ body của yêu cầu
        const { bookLeaveType, bookLeaveDay, bookFromDate, bookToDate, reason } = req.body;

        try {
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

    // Leader phê duyệt gửi tin nhắn đến Manager
    leaderSendMessageApproveToManager: async (req, res) => {
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

    // Leader từ chối gửi tin nhắn đến Member
    leaderSendMessageRejectToMember: async (req, res) => {
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

    // Manager gửi tin nhắn phê duyệt đến Member
    managerSendMessageApproveToMember: async (req, res) => {
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

    // Manager gửi tin nhắn từ chối đến Member
    managerSendMessageRejectToMember: async (req, res) => {
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

    // Manager gửi tin nhắn phê duyệt thay đổi loại nghỉ phép đến Member
    managerSendMessageApproveLeaveTypeToMember: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            actualLeaveType,
            bookLeaveDay,
            bookFromDate,
            bookToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageApproveLeaveType(
                managerName,
                userName,
                department,
                actualLeaveType,
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

    // Manager gửi tin nhắn phê duyệt thay đổi số ngày nghỉ phép đến Member
    managerSendMessageApproveLeaveDayToMember: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const {
            userName,
            department,
            bookLeaveType,
            actualLeaveDay,
            actualFromDate,
            actualToDate,
            reason,
            requestDate,
        } = req.body;

        try {
            const [{ managerName, managerZaloUserID }] = await readedInfoManager();

            const zaloAPIText = messageApproveLeaveDay(
                managerName,
                userName,
                department,
                bookLeaveType,
                actualLeaveDay,
                actualFromDate,
                actualToDate,
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

    // Manager gửi tin nhắn phê duyệt yêu cầu hủy phép đến Member
    managerSendMessageApproveRequestDeleteToMember: async (req, res) => {
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

    // Member gửi tin nhắn yêu cầu hủy phép đến Manager
    memberSendMessageRequestCancelToManager: async (req, res) => {
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

    // Member gửi tin nhắn yêu cầu thay đổi phép đến Manager
    memberSendMessageRequestEditToManager: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const {
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
            requestDate,
        } = req.body;

        try {
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
module.exports = zaloAPIController;
