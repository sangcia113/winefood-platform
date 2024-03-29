const cron = require('node-cron');
const dayjs = require('dayjs');
const { readedLeaveListToday } = require('../services/leaveListService');
const { sendZaloAPIV3 } = require('../services/zaloAPIService');

// Lên lịch công việc để chạy vào lúc 8 giờ sáng từ thứ 2 đến thứ 6
cron.schedule('0 8 * * 1-6', async () => {
    // Biến chứa thông điệp tiếng Nhật
    let messageJP = '本日休暇を取る社員一覧\n\n';

    // Biến chứa thông điệp tiếng Việt
    let messageVN = 'Danh sách nghỉ phép hôm nay\n\n';

    try {
        const results = await readedLeaveListToday();

        if (!results.length) {
            await sendZaloAPIV3('1337604619804588121', '今日は休暇を取った従業員はいませんでした');
            await sendZaloAPIV3(
                '637017525950997790',
                'Không có nhân viên nào nghỉ phép ngày hôm nay'
            );
        } else {
            results.forEach(item => {
                const { userName, department, bookLeaveDay, bookFromDate, bookToDate } = item;
                messageJP += `- フルネーム: ${userName}\n- 部署: ${department}\n- 休暇の日数: ${bookLeaveDay}\n- から: ${dayjs(
                    bookFromDate
                ).format('HH:mm DD-MM-YYYY')}\n- まで: ${dayjs(bookToDate).format(
                    'HH:mm DD-MM-YYYY'
                )}\n\n`;

                messageVN += `- Họ và Tên: ${userName}\n- Bộ phận: ${department}\n- Số ngày nghỉ: ${bookLeaveDay}\n- Từ ngày: ${dayjs(
                    bookFromDate
                ).format('HH:mm DD-MM-YYYY')}\n- Đến ngày: ${dayjs(bookToDate).format(
                    'HH:mm DD-MM-YYYY'
                )}\n\n`;
            });

            messageJP +=
                'ここをクリックして詳細をご覧ください: https://winefood-sw.com/nghiphep/manager\n\n注: これはシステムからの自動通知です。返信しないでください。';
            messageVN += 'Lưu ý: Đây là tin nhắn tự động từ hệ thống. Vui lòng không trả lời lại!';

            await sendZaloAPIV3('1337604619804588121', messageJP);
            await sendZaloAPIV3('637017525950997790', messageVN);

            messageJP = '';
            messageVN = '';
        }
    } catch (error) {
        console.log(error);
    }
});
