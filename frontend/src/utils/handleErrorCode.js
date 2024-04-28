const ERROR_CODE = {
    // ERROR_CODE ZALO
    '-32': 'Vượt quá giới hạn request/phút!',
    '-201': 'Tham số không hợp lệ!',
    '-209': 'API này không được hỗ trợ!',
    '-210': 'Tham số vượt quá giới hạn cho phép!',
    '-211': 'Hết quota!',
    '-212': 'Official Account chưa đăng ký API này!',
    '-213': 'Người dùng chưa quan tâm Official Account!',
    '-216': 'Access Token không hợp lệ!',
    '-224': 'Official Account chưa mua gói dịch vụ!',
    '-230': 'Người dùng không tương tác với OA trong 7 ngày qua!',
    '-232': 'Người dùng chưa phát sinh tương tác hoặc tương tác cuối đã quá hạn!',
    '-233': 'Loại tin nhắn không được hỗ trợ!',
    '-234': 'Loại tin nhắn này không được gửi vào buổi tối (từ 22 giờ - 6 giờ sáng hôm sau)!',
    '-235': 'API không hỗ trợ cho loại OA của bạn!',
    '-240': 'API gửi tin nhắn V2 đã không còn hoạt động, vui lòng chuyển qua API gửi tin nhắn V3!',
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

    // ERROR CODE API
    '-1199': 'Tài khoản của bạn không có quyền thực hiện chức năng này!',
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
