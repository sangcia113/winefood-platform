require('dotenv').config();

const {
    readedUser,
    sendZaloAPIV3,
    getFollower,
    created,
    requestUserInfo,
    getProfile,
    updatedNumberPhone,
    updatedSendRequest,
} = require('../services/zaloAPIService');
const {
    readedInfoSuperior,
    readedInfoManager,
    readedInfoMember,
} = require('../services/userService');
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

    requestUserInfo: async (req, res) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            const response = await requestUserInfo(id);

            if (response.data.error === 0) {
                await updatedSendRequest(id);

                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu cung cấp thông tin đến người dùng qua Zalo!',
                });
            } else {
                res.status(400).json(response.data);
            }
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    getFollower: async (req, res) => {
        let offset = 0;
        let totalFollower = 0;

        try {
            const results = await readedUser();
            const zaloUserId = results.map(item => item.zaloUserId);

            do {
                const response = await getFollower(offset);
                totalFollower = response.data.data.total;
                const followers = response.data.data.followers;

                if (totalFollower > 0) {
                    const newFollower = followers
                        .map(item => item.user_id)
                        .filter(item => !zaloUserId.includes(item));

                    if (newFollower.length > 0) await created(newFollower);

                    offset += 50;
                }
            } while (offset < totalFollower);

            res.status(200).json({
                error: 0,
                message: `Cập nhật thành công ${totalFollower} user`,
            });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    getProfile: async (req, res) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            const response = await getProfile(id);

            const { error, data } = response.data;

            if (error !== 0) return res.status(400).json(response.data);

            const { shared_info } = data;

            if (!shared_info || !shared_info.phone)
                return res.status(400).json({
                    error: -1010,
                    message: 'Người dùng chưa chia sẻ thông tin với Wine Food!',
                });

            await updatedNumberPhone(shared_info.phone, id);

            res.status(200).json({
                error: 0,
                message: 'Cập nhật số điện thoại cho User thành công!',
            });
        } catch (error) {
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

            const response = await sendZaloAPIV3(superiorZaloUserID, zaloAPIText);

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

            const response = await sendZaloAPIV3(managerZaloUserID, zaloAPIText);

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

    // Leader từ chối gửi tin nhắn đến Member
    leaderSendMessageRejectToMember: async (req, res) => {
        const leaderName = req.decoded.userName;

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
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

            const zaloAPIText = messageLeaderReject(
                leaderName,
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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối qua Zalo!',
                    receiver: userName,
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

    // Manager gửi tin nhắn phê duyệt đến Member
    managerSendMessageApproveToMember: async (req, res) => {
        const managerName = req.decoded.userName;

        const {
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
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
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

    // Manager gửi tin nhắn từ chối đến Member
    managerSendMessageRejectToMember: async (req, res) => {
        const managerName = req.decoded.userName;

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
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo từ chối qua Zalo!',
                    receiver: userName,
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

    // Manager gửi tin nhắn phê duyệt thay đổi loại nghỉ phép đến Member
    managerSendMessageApproveLeaveTypeToMember: async (req, res) => {
        const managerName = req.decoded.userName;

        // Lấy thông tin từ body của yêu cầu
        const {
            userId,
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
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
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

    // Manager gửi tin nhắn phê duyệt thay đổi số ngày nghỉ phép đến Member
    managerSendMessageApproveLeaveDayToMember: async (req, res) => {
        const managerName = req.decoded.userName;

        // Lấy thông tin từ body của yêu cầu
        const {
            userId,
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
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
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

    // Manager gửi tin nhắn phê duyệt yêu cầu hủy phép đến Member
    managerSendMessageApproveRequestDeleteToMember: async (req, res) => {
        const managerName = req.decoded.userName;

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
            requestDate,
        } = req.body;

        try {
            const [{ memberZaloUserId }] = await readedInfoMember(userId);

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

            const response = await sendZaloAPIV3(memberZaloUserId, zaloAPIText);

            if (response.error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi thông báo phê duyệt qua Zalo!',
                    receiver: userName,
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

            const response = await sendZaloAPIV3(managerZaloUserID, zaloAPIText);

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

            const response = await sendZaloAPIV3(managerZaloUserID, zaloAPIText);

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
