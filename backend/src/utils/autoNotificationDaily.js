// Import thư viện node-cron để lên lịch công việc tự động
const cron = require('node-cron');
// Import thư viện dayjs để xử lý thời gian
const dayjs = require('dayjs');
// Import hàm readedLeaveListToday từ leaveListService
const { readedLeaveListToday } = require('../services/leaveListService');
// Import hàm sendZaloAPIV3 từ zaloAPIService
const { sendZaloAPIV3 } = require('../services/zaloAPIService');

// Lên lịch công việc để chạy vào lúc 8 giờ sáng từ thứ 2 đến thứ 6
cron.schedule('0 8 * * 1-6', async () => {
    // Biến chứa thông điệp tiếng Nhật
    let messageJP = `本日休暇を取る社員一覧 ${dayjs().format('DD/MM/YYYY')}\n\n`;

    // Biến chứa thông điệp tiếng Việt
    let messageVN = `DANH SÁCH NGHỈ PHÉP HÔM NAY ${dayjs().format('DD/MM/YYYY')}\n\n`;

    try {
        // Gọi hàm để lấy danh sách nhân viên nghỉ phép trong ngày
        const results = await readedLeaveListToday();
        // Kiểm tra nếu danh sách rỗng
        if (!results.length) {
            // Gửi tin nhắn thông báo không có nhân viên nghỉ phép cho Zalo ID 1
            await sendZaloAPIV3('1337604619804588121', '今日は休暇を取った従業員はいませんでした');
            // Gửi tin nhắn thông báo không có nhân viên nghỉ phép cho Zalo ID 2
            await sendZaloAPIV3(
                '637017525950997790',
                'Không có nhân viên nào nghỉ phép ngày hôm nay'
            );
        } else {
            // Khởi tạo biến đếm
            let index = 0;
            // Khởi tạo một Map để nhóm các nhân viên theo phòng ban
            const groupedData = new Map();
            // Duyệt qua từng nhân viên trong danh sách
            results.forEach(item => {
                // Lấy phòng ban của nhân viên
                const department = item.department;
                // Nếu phòng ban chưa tồn tại trong Map
                if (!groupedData.has(department)) {
                    // Tạo một entry mới với phòng ban là khóa và một mảng rỗng là giá trị
                    groupedData.set(department, []);
                }
                // Thêm nhân viên vào mảng tương ứng với phòng ban trong Map
                groupedData.get(department).push(item);
            });
            // Duyệt qua mỗi cặp khóa-giá trị trong Map
            for (const [keys, values] of groupedData) {
                // Thêm tiêu đề phòng ban vào thông điệp tiếng Nhật
                messageJP += `- 部署: ${keys}\n`;
                // Thêm tiêu đề phòng ban vào thông điệp tiếng Việt
                messageVN += `- Bộ phận: ${keys}\n`;
                // Duyệt qua từng nhân viên trong mỗi phòng ban
                for (const item of values) {
                    // Thêm thông tin của nhân viên vào thông điệp tiếng Nhật
                    messageJP += `\n- フルネーム: ${item.userName}\n- 休暇の日数: ${
                        item.bookLeaveDay
                    }\n- から: ${dayjs(item.bookFromDate).format(
                        'HH:mm DD-MM-YYYY'
                    )}\n- まで: ${dayjs(item.bookToDate).format('HH:mm DD-MM-YYYY')}\n`;
                    // Thêm thông tin của nhân viên vào thông điệp tiếng Việt
                    messageVN += `\n- Họ và Tên: ${item.userName}\n- Số ngày nghỉ: ${
                        item.bookLeaveDay
                    }\n- Từ ngày: ${dayjs(item.bookFromDate).format(
                        'HH:mm DD-MM-YYYY'
                    )}\n- Đến ngày: ${dayjs(item.bookToDate).format('HH:mm DD-MM-YYYY')}\n`;
                }
                // Kiểm tra nếu đây là lần lặp cuối cùng
                if (index === groupedData.size - 1) {
                    // Thêm phần chú thích vào thông điệp tiếng Nhật
                    messageJP += `\nここをクリックして詳細をご覧ください: https://winefood-sw.com/nghiphep/manager\n\n注: これはシステムからの自動通知です。返信しないでください。`;
                    // Thêm phần chú thích vào thông điệp tiếng Việt
                    messageVN += `\nLưu ý: Đây là tin nhắn tự động từ hệ thống. Vui lòng không trả lời lại!`;
                }
                // Gửi thông điệp tiếng Nhật qua Zalo API
                await sendZaloAPIV3('1337604619804588121', messageJP);
                // Gửi thông điệp tiếng Nhật qua Zalo API
                await sendZaloAPIV3('637017525950997790', messageVN);
                // Reset lại thông điệp tiếng Nhật
                console.log(messageJP);
                // Tăng biến đếm lên mỗi lần lặp
                index++;
                // Reset lại thông điệp tiếng Nhật
                messageJP = '';
                // Reset lại thông điệp tiếng Việt
                messageVN = '';
            }
        }
    } catch (error) {
        // In ra lỗi nếu có
        console.log(error);
    }
});
