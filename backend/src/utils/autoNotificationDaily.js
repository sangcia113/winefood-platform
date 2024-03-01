const cron = require('node-cron');
const { readLeaveListToday } = require('../services/leaveListService');

// Lên lịch công việc để chạy vào lúc 8 giờ sáng từ thứ 2 đến thứ 6
cron.schedule('* * * * *', async () => {
    try {
        const response = await readLeaveListToday();

        console.log(response);
    } catch (error) {
        console.log(error);
    }
});
