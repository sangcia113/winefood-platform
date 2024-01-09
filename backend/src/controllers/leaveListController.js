const dayjs = require('dayjs');
const {
    readed,
    readedOther,
    readedStatistics,
    updatedApproved,
    updatedApprovedLeaveDay,
    updatedApprovedLeaveType,
    updatedApprovedRequestDelete,
    updatedRejected,
} = require('../services/leaveListService');
const { readedInfoSuperior } = require('../services/userService');

const { sendZaloNotificationV3 } = require('../utils/handleZaloAPI');

const leaveListController = {
    created: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const {
            userId,
            userName,
            department,
            leaveTypeId,
            leaveType,
            leaveDay,
            fromDate,
            toDate,
            reason,
        } = req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            // await leaveListService.create(userId, leaveTypeId, leaveDay, fromDate, toDate, reason);

            const response = await readedInfoSuperior(userId);

            const { superiorName, superiorGender, superiorRoleId, superiorZaloUID } = response[0];

            const zaloAPIText = `ĐƠN XIN NGHỈ PHÉP

Dear ${superiorGender === 1 ? 'Mr.' : 'Ms.'} ${superiorName},
xin gửi đến ${superiorGender === 1 ? 'anh' : 'chị'} với các thông tin như sau:

- Họ và tên: ${userName}
- Loại phép: ${leaveType}
- Bộ phận: ${department}
- Số ngày nghỉ: ${leaveDay}
- Từ ngày: ${fromDate}
- Đến ngày: ${toDate}
- Lý do: ${reason}
- Ngày yêu cầu: ${dayjs().format('DD/MM/YYYY HH:mm')}
- Vui lòng truy cập vào đây để xem chi tiết: http://winefood-sw.com/nghiphep/${
                superiorRoleId === 1 || superiorRoleId === 2 ? 'manager' : 'leader'
            }

Chú ý: Để nhận được thông báo tiếp theo từ Wine Food. 
Vui lòng trả lời 1 tin nhắn bất kỳ!
`;

            const responseSend = await sendZaloNotificationV3(
                userId,
                '8851502365121811999',
                zaloAPIText
            );

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
