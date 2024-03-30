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
        if (superiorRoleId === 2) {
            return (
                '休暇申請書\n\n' +
                '久保様、下記の情報を送りします:\n\n' +
                '- フルネーム: ' +
                name +
                '\n' +
                '- 部署: ' +
                department +
                '\n' +
                '- 休暇類: ' +
                bookLeaveType +
                '\n' +
                '- 休暇の日数: ' +
                bookLeaveDay +
                '\n' +
                '- から: ' +
                dayjs(bookFromDate).format('HH:mm DD/MM/YYYY') +
                '\n' +
                '- まで: ' +
                dayjs(bookToDate).format('HH:mm DD/MM/YYYY') +
                '\n' +
                '- 理由: ' +
                reason +
                '\n' +
                '- 申請日: ' +
                dayjs().format('HH:mm DD/MM/YYYY') +
                '\n' +
                '- ここをクリックして詳細をご覧ください: https://winefood-sw.com/nghiphep/manager\n\n' +
                '注: これはシステムからの自動通知です。返信しないでください。'
            );
        } else {
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
        }
    },

    messageRequestCancel: (
        managerGender,
        managerName,
        requestReason,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        'ĐƠN XIN HUỶ PHÉP\n\nDear ' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/manager\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

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
        reason,
        requestDate
    ) =>
        'ĐƠN XIN ĐIỀU CHỈNH THÔNG TIN NGHỈ PHÉP THỰC TẾ\n\nDear ' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/manager\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageManagerApproval: (
        managerName,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        '<ĐÃ DUYỆT> ĐƠN XIN NGHỈ PHÉP\n\nManager: ' +
        managerName +
        ', đã ký duyệt yêu cầu nghỉ phép\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageManagerReject: (
        managerName,
        rejectReason,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        '<TỪ CHỐI> ĐƠN XIN NGHỈ PHÉP\n\nManager: ' +
        managerName +
        ', đã từ chối yêu cầu nghỉ phép với lý do: ' +
        rejectReason +
        '\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageLeaderAproval: (
        managerGender,
        managerName,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        'ĐƠN XIN NGHỈ PHÉP\n\nDear ' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/manager\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageLeaderReject: (
        leaderName,
        rejectReason,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        '<TỪ CHỐI> ĐƠN XIN NGHỈ PHÉP\n\nLeader: ' +
        leaderName +
        ', đã từ chối yêu cầu nghỉ phép với lý do: ' +
        rejectReason +
        '\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageApproveLeaveType: (
        managerName,
        name,
        department,
        actualLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        '<XÁC NHẬN> ĐIỀU CHỈNH NGHỈ PHÉP\n\nManager: ' +
        managerName +
        ', đã xác nhận điều chỉnh loại nghỉ phép thực tế\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
        '- Họ và tên: ' +
        name +
        '\n' +
        '- Bộ phận: ' +
        department +
        '\n' +
        '- Loại phép (thực tế): ' +
        actualLeaveType +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageApproveLeaveDay: (
        managerName,
        name,
        department,
        bookLeaveType,
        actualLeaveDay,
        actualFromDate,
        actualToDate,
        reason,
        requestDate
    ) =>
        '<XÁC NHẬN> ĐIỀU CHỈNH NGHỈ PHÉP\n\nManager: ' +
        managerName +
        ', đã xác nhận điều chỉnh số ngày nghỉ phép thực tế\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
        '- Họ và tên: ' +
        name +
        '\n' +
        '- Bộ phận: ' +
        department +
        '\n' +
        '- Loại phép: ' +
        bookLeaveType +
        '\n' +
        '- Số ngày nghỉ (thực tế): ' +
        actualLeaveDay +
        '\n' +
        '- Từ ngày (thực tế): ' +
        dayjs(actualFromDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Đến ngày (thực tế): ' +
        dayjs(actualToDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Lý do: ' +
        reason +
        '\n' +
        '- Ngày yêu cầu: ' +
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageApproveCancelLeave: (
        managerName,
        name,
        department,
        bookLeaveType,
        bookLeaveDay,
        bookFromDate,
        bookToDate,
        reason,
        requestDate
    ) =>
        '<XÁC NHẬN> HỦY PHÉP\n\nManager: ' +
        managerName +
        ', đã xác nhận hủy phép\n' +
        '***Thông tin nghỉ phép của bạn***\n\n' +
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
        dayjs(requestDate).format('HH:mm DD/MM/YYYY') +
        '\n' +
        '- Vui lòng truy cập vào đây để xem chi tiết: https://winefood-sw.com/nghiphep/history\n\n' +
        'Chú ý: Để nhận được thông báo tiếp theo từ Wine Food.\n' +
        'Vui lòng trả lời 1 tin nhắn bất kỳ!',

    messageWebhookIReporter: (language, def_top_name, report_remarks1) =>
        language === 'vn'
            ? '<CẦN PHÊ DUYỆT>\n\n' +
              '- Biểu mẫu: ' +
              def_top_name +
              '\n- Số lot: ' +
              report_remarks1
            : '<承認>\n\n' + '- 見本書: ' + def_top_name + '\n- ロット No: ' + report_remarks1,
};

module.exports = handleZaloMessage;
