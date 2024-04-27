const ERROR_CODE = {
    // ERROR_CODE ZALO
    '-232': 'Người dùng chưa tương tác với OA hoặc lần tương tác cuối cùng đã hết hạn!',
    // '-1001': 'Send Zalo Notification V3 failed!',
    // '-1002': 'Refresh Access Token is failed!',
    '-1003': 'Resend Zalo Notification V3 failed!',
    '-1004': 'Get All User is failed!',
    '-1005': 'Request User Info is failed!',
    '-1006': 'Get User Profile is failed!',
    '-1007': 'Invalid Refresh Token!',
    '-1008': 'Get Zalo API is failed!',
    '-1009': 'Maximum retry count reached!',
    '-1010': 'Người dùng chưa chia sẻ thông tin với Wine Food!',
    // ERROR_CODE_WEBHOOK

    '-1200': 'Không có payload nào được cung cấp!',
    '-1201': 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',

    // ******************** ERROR_CODE_APP ********************
    // ERROR CODE GENERAL
    '-1000': 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
    '-1001': 'Lỗi truy vấn cơ sở dữ liệu!',
    '-1002': 'Dữ liệu đầu vào không hợp lệ!',

    // ERROR CODE LIST
    '-1050': 'Đơn xin nghỉ phép đã tồn tại trong hệ thống!',
    '-1051': 'Đơn xin nghỉ phép đã được phê duyệt!',
    '-1052': 'Đơn xin nghỉ phép đã bị từ chối!',
    '-1053':
        'Không có yêu cầu điều chỉnh loại nghỉ phép thực tế hoặc đã xác nhận điều chỉnh loại nghỉ phép thực tế này!',
    '-1054':
        'Không có yêu cầu điều chỉnh số ngày nghỉ phép thực tế hoặc đã xác nhận điều chỉnh số ngày nghỉ phép thực tế này!',
    '-1055': 'Không có yêu cầu hủy phép hoặc đã xác nhận hủy phép này!',

    // ERROR CODE USER: -1060 -> -1069
    '-1060': 'Nhân viên đã tồn tại trong hệ thống!',
    '-1061': 'Mã nhân viên hoặc số điện thoại đã tồn tại trong hệ thống!',

    // ERROR CODE LEAVE: -1070 -> -1079
    '-1070': 'Loại nghỉ phép đã tồn tại trong hệ thống!',

    // ERROR CODE LOGIN: -1080 -> -1089
    '-1080': 'Tài khoản không tồn tại trong hệ thống!',
    '-1081': 'Sai mật khẩu!',
    '-1082': 'Không có Token nào được cung cấp!',
    '-1083': 'Không thể xác thực Token!',
    '-1084': 'Sai mật khẩu cũ!',
    '-1085': 'Mật khẩu mới không trùng khớp',

    // ERROR CODE ROLE: -1090 -> -1099
    '-1090': 'Phân quyền đã tồn tại trong hệ thống!',

    // ERROR CODE LEAVE TYPE: -1100 -> -1109
    '-1100': 'Loại nghỉ phép đã tồn tại trong hệ thống!',

    // ERROR CODE DEPARTMENT: -1110 -> -1119
    '-1110': 'Bộ phận đã tồn tại trong hệ thống!',

    // ERROR CODE CONTENT: -1120 -> -1129
    '-1120': 'Nội dung đã tồn tại trong hệ thống!',
};

const getErrorCode = errorCode => {
    for (const key in ERROR_CODE) {
        // errorCode Number == key String
        if (key == errorCode) {
            return ERROR_CODE[key];
        }
    }
    return null;
};

export default getErrorCode;
