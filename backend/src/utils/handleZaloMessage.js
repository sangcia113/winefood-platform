const dayjs = require('dayjs');

const handleZaloMessage = {
    messageRequestLeave: (
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
    ) => {
        return (
            'ĐƠN XIN NGHỈ PHÉP\n\n' +
            'Dear ' +
            (superiorGender === 1 ? 'Mr. ' : 'Ms. ') +
            superiorName +
            ', xin gửi đến ' +
            (superiorGender === 1 ? 'anh' : 'chị') +
            ' với các thông tin như sau:\n\n' +
            '- Họ và tên: ' +
            name +
            '\n' +
            '- Bộ phận: ' +
            department +
            '\n' +
            '- Loại phép: ' +
            bookLeaveType +
            '\n' +
            '- Số ngày nghỉ: ' +
            bookLeaveDay +
            '\n' +
            '- Từ ngày: ' +
            dayjs(bookFromDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Đến ngày: ' +
            dayjs(bookToDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Lý do: ' +
            reason +
            '\n' +
            '- Ngày yêu cầu: ' +
            dayjs().format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/' +
            (superiorRoleId === 2 || superiorRoleId === 3 ? 'manager' : 'leader') +
            '\n\n' +
            'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
            'Vui lòng trả lời 1 tin nhắn bất kỳ!'
        );
    },

    messageRequestCancel: (
        managerGender,
        managerName,
        name,
        department,
        leaveType,
        leaveDay,
        fromDate,
        toDate,
        reason,
        requestReason
    ) => {
        return (
            'ĐƠN XIN HUỶ PHÉP\n\n' +
            'Dear ' +
            (managerGender === 1 ? 'Mr. ' : 'Ms. ') +
            managerName +
            ', xin gửi đến ' +
            (managerGender === 1 ? 'anh' : 'chị') +
            ' với các thông tin huỷ phép như sau: ' +
            requestReason +
            '\n\n' +
            '- Họ và tên: ' +
            name +
            '\n' +
            '- Bộ phận: ' +
            department +
            '\n' +
            '- Loại phép: ' +
            leaveType +
            '\n' +
            '- Số ngày nghỉ: ' +
            leaveDay +
            '\n' +
            '- Từ ngày: ' +
            dayjs(fromDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Đến ngày: ' +
            dayjs(toDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Lý do: ' +
            reason +
            '\n' +
            '- Ngày yêu cầu: ' +
            dayjs().format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/manager' +
            '\n\n' +
            'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
            'Vui lòng trả lời 1 tin nhắn bất kỳ!'
        );
    },

    messageRequestEdit: (
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
    ) => {
        return (
            'ĐƠN XIN ĐIỀU CHỈNH THÔNG TIN NGHỈ PHÉP THỰC TẾ\n\n' +
            'Dear ' +
            (managerGender === 1 ? 'Mr. ' : 'Ms. ') +
            managerName +
            ', xin gửi đến ' +
            (managerGender === 1 ? 'anh' : 'chị') +
            ' với các thông tin như sau:\n\n' +
            '- Họ và tên: ' +
            name +
            '\n' +
            '- Bộ phận: ' +
            department +
            '\n' +
            '- Loại phép (thực tế): ' +
            actualLeaveType +
            '\n' +
            '- Số ngày nghỉ (thực tế): ' +
            actualLeaveDay +
            '\n' +
            '- Từ ngày (thực tế): ' +
            dayjs(actualFromDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Đến ngày (thực tế): ' +
            dayjs(actualToDate).format('HH:mm DD/MM/YYYY') +
            '\n\n' +
            '- Loại phép (đăng ký): ' +
            bookLeaveType +
            '\n' +
            '- Số ngày nghỉ (đăng ký): ' +
            bookLeaveDay +
            '\n' +
            '- Từ ngày (đăng ký): ' +
            dayjs(bookFromDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Đến ngày (đăng ký): ' +
            dayjs(bookToDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Lý do: ' +
            reason +
            '\n' +
            '- Ngày yêu cầu: ' +
            dayjs().format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/manager' +
            '\n\n' +
            'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
            'Vui lòng trả lời 1 tin nhắn bất kỳ!'
        );
    },

    messageLeaderReject: (
        superiorName,
        superiorRoleId,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        rejectReason
    ) => {
        return (
            '<TỪ CHỐI> ĐƠN XIN NGHỈ PHÉP\n\n' +
            '- Leader: ' +
            superiorName +
            ', đã từ chối yêu cầu nghỉ phép với lý do: ' +
            rejectReason +
            '\n' +
            'Thông tin nghỉ phép của bạn:\n\n' +
            '- Họ và tên: ' +
            name +
            '\n' +
            '- Bộ phận: ' +
            department +
            '\n' +
            '- Loại phép: ' +
            bookLeaveType +
            '\n' +
            '- Số ngày nghỉ: ' +
            bookLeaveDay +
            '\n' +
            '- Từ ngày: ' +
            dayjs(bookFromDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Đến ngày: ' +
            dayjs(bookToDate).format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Lý do: ' +
            reason +
            '\n' +
            '- Ngày yêu cầu: ' +
            dayjs().format('HH:mm DD/MM/YYYY') +
            '\n' +
            '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/' +
            (superiorRoleId === 2 || superiorRoleId === 3 ? 'manager' : 'leader') +
            '\n\n' +
            'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
            'Vui lòng trả lời 1 tin nhắn bất kỳ!'
        );
    },
};

module.exports = handleZaloMessage;
