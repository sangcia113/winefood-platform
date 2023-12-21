const { leaveListService } = require('../services/leaveListService');
const { userService } = require('../services/userService');

const { sendZaloNotificationV3 } = require('../utils/handleZaloAPI');
const { zaloController } = require('./zaloAPIController');

const leaveListController = {
    createHandler: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { userId, leaveTypeId, leaveDay, fromDate, toDate, reason } = req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            // await leaveListService.create(userId, leaveTypeId, leaveDay, fromDate, toDate, reason);

            const response = await userService.readInfoLeader(userId);

            const { name, gender, roleId, role, zaloUserId } = response[0];

            const zaloAPIText = `ĐƠN XIN NGHỈ PHÉP

Dear ${gender === 1 ? 'Mr.' : 'Ms.'} ${name},
xin gửi đến ${gender === 1 ? 'anh' : 'chị'} với các thông tin như sau:

- Họ và tên: ${name}
- Loại phép: ${leaveTypeId}
- Bộ phận: ${name}
- Số ngày nghỉ: ${leaveDay}
- Từ ngày: ${fromDate}
- Đến ngày: ${toDate}
- Lý do: ${reason}
- Ngày yêu cầu: ${name}
- Vui lòng truy cập vào đây để xem chi tiết: http://winefood-sw.com/nghiphep/${
                roleId === 2 ? 'manager' : 'leader'
            }

Chú ý: Để nhận được thông báo tiếp theo từ Wine Food. 
Vui lòng reply 1 tin nhắn bất kỳ!
`;

            const responseSend = await sendZaloNotificationV3(
                userId,
                '8851502365121811999',
                zaloAPIText
            );

            const { error, message } = responseSend;

            if (error === 0) {
                res.status(200).json({
                    error: 0,
                    message: 'Đã gửi yêu cầu lên cấp trên qua Zalo!',
                    name,
                });
            } else {
                res.status(400).json(responseSend);
            }
        } catch (error) {
            res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.read();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readByDateHandler: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.read(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readOtherHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.readOther();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readOtherByDateHandler: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.readOther(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readStatisticsHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.readStatistics();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readStatisticsByDateHandler: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { startDate, endDate } = req.query;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveListService.readStatistics(startDate, endDate);

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateApprovedHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await leaveListService.updateApproved(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateRejectedHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { reason } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await leaveListService.updateRejected(id, reason);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateApprovedLeaveTypeHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await leaveListService.updateApprovedLeaveType(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateApprovedLeaveDayHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await leaveListService.updateApprovedLeaveDay(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateApprovedRequestDeleteHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await leaveListService.updateApprovedRequestDelete(id);

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { leaveListController };
