const messageZalo = {
    employeeToSuperior: (name, gender, roleId, role, zaloUserId) => `ĐƠN XIN NGHỈ PHÉP\n\n
                        Dear ${gender === 0 ? 'Ms' : 'Mr'} ${name.split(' ').pop()}, xin gửi đến`,
};

module.exports = { messageZalo };

// var text_notification =
//     'ĐƠN XIN NGHỈ PHÉP\n\nDear ' +
//     (Gender == 0 ? 'Ms.' : 'Mr.') +
//     Name.split(' ').pop() +
//     ', xin gửi đến ' +
//     (Gender == 1 ? 'anh' : 'chị') +
//     ' với các thông tin như sau:\n\n- Họ và tên: ' +
//     leave_name +
//     '\n- Loại phép: ' +
//     leave_type +
//     '\n- Bộ phận: ' +
//     leave_department +
//     '\n- Số ngày nghỉ: ' +
//     leave_number +
//     '\n- Từ ngày: ' +
//     leave_from +
//     '\n- Đến ngày: ' +
//     leave_to +
//     '\n- Lý do: ' +
//     leave_reason +
//     '\n- Ngày yêu cầu: ' +
//     leave_request +
//     '\n- Vui lòng truy cập vào đây để xem chi tiết: http://winefood-sw.com/nghiphep/' +
//     (Position_ID == 2 ? 'manager' : 'leader') +
//     '\n\nChú ý: Để nhận được thông báo tiếp theo từ Wine Food. Vui lòng reply 1 tin nhắn bất kỳ!';
