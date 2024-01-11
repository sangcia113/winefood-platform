const dayjs = require('dayjs');

const handleZaloMessage = {
    messageLeaveList: (
        superiorGender,
        superiorName,
        superiorRoleId,
        name,
        leaveType,
        department,
        leaveDay,
        fromDate,
        toDate,
        reason
    ) => {
        return (
            'ĐƠN XIN NGHỈ PHÉP\n\n' +
            'Dear ' +
            (superiorGender === 1 ? 'Mr. ' : 'Ms. ') +
            superiorName +
            ' xin gửi đến ' +
            (superiorGender === 1 ? 'anh' : 'chị') +
            ' với các thông tin như sau:\n\n' +
            '- Họ và tên: ' +
            name +
            '\n' +
            '- Loại phép: ' +
            leaveType +
            '\n' +
            '- Bộ phận: ' +
            department +
            '\n' +
            '- Số ngày nghỉ: ' +
            leaveDay +
            '\n' +
            '- Từ ngày: ' +
            dayjs(fromDate).format('DD/MM/YYYY HH:mm') +
            '\n' +
            '- Đến ngày: ' +
            dayjs(toDate).format('DD/MM/YYYY HH:mm') +
            '\n' +
            '- Lý do: ' +
            reason +
            '\n' +
            '- Ngày yêu cầu: ' +
            dayjs().format('DD/MM/YYYY HH:mm') +
            '\n' +
            '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/' +
            (superiorRoleId === 1 || superiorRoleId === 2 ? 'manager' : 'leader') +
            '\n\n' +
            'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
            'Vui lòng trả lời 1 tin nhắn bất kỳ!'
        );
    },
};

module.exports = handleZaloMessage;
