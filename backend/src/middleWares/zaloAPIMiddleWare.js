const moment = require('moment');

const { readedUserByZaloUserId, readedInfoSuperior } = require('../services/userService');
const { checkIsExist, created } = require('../services/leaveListService');
const { sendZaloAPIV3 } = require('../services/zaloAPIService');
const { messageRequestLeave } = require('../utils/handleZaloMessage');

const parseMessage = message => {
    const regex =
        /^#np (pn|no|dtvs|ldk|nb|ntcd|nts|ntnld) ((?:0\.)?[0-9]+(\.25|\.5|\.75)?) (\d{2}:\d{2}) (\d{2}\/\d{2}\/\d{4}) (\d{2}:\d{2}) (\d{2}\/\d{2}\/\d{4}) (.+)$/;

    const match = message.match(regex);

    if (!match) return null;

    return {
        type: match[1],
        daysOff: parseFloat(match[2]),
        startTime: match[4],
        startDate: match[5],
        endTime: match[6],
        endDate: match[7],
        reason: match[8],
    };
};

const validateDatetime = (startTime, startDate, endTime, endDate) => {
    const format = 'HH:mm DD/MM/YYYY';
    const startDateTime = moment(`${startTime} ${startDate}`, format);
    const endDateTime = moment(`${endTime} ${endDate}`, format);

    // Kiểm tra xem ngày bắt đầu và kết thúc có đúng định dạng không
    const isValidFormat = startDateTime.isValid() && endDateTime.isValid();

    // Kiểm tra ngày bắt đầu phải nhỏ hơn ngày kết thúc
    const isStartDateBeforeEndDate = startDateTime.isBefore(endDateTime);

    // Kiểm tra giờ bắt đầu và kết thúc phù hợp
    const isValidStartTime =
        startDateTime.isSameOrAfter(moment(`07:30 ${startDate}`, format)) &&
        startDateTime.isSameOrBefore(moment(`16:30 ${startDate}`, format));

    const isValidEndTime =
        endDateTime.isSameOrAfter(moment(`07:30 ${endDate}`, format)) &&
        endDateTime.isSameOrBefore(moment(`16:30 ${endDate}`, format));

    // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
    const isEndTimeAfterStartTime = endDateTime.isAfter(startDateTime);

    return (
        isValidFormat &&
        isStartDateBeforeEndDate &&
        isValidStartTime &&
        isValidEndTime &&
        isEndTimeAfterStartTime
    );
};

const zaloAPIMiddleWare = {
    checkMessage: async (req, res, next) => {
        const { zaloAPIUserId, zaloAPIText } = req.query;

        if (!(zaloAPIUserId && zaloAPIText))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkUpdate: async (req, res, next) => {
        const { accessToken, refreshToken } = req.query;

        if (!(accessToken && refreshToken))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    parseZaloMessage: async (req, res) => {
        const { message, sender } = req.body;

        const messageData = parseMessage(message.text);

        if (
            messageData &&
            validateDatetime(
                messageData.startTime,
                messageData.startDate,
                messageData.endTime,
                messageData.endDate
            )
        ) {
            try {
                const [{ userId, userName, department }] = await readedUserByZaloUserId(sender.id);

                // Kiểm tra userId có tồn tại trong hệ thống không?
                if (!userId)
                    return await sendZaloAPIV3(
                        sender.id,
                        'Tài khoản của bạn không tồn tại trong hệ thống!'
                    );

                const { type, daysOff, startTime, startDate, endTime, endDate, reason } =
                    messageData;

                const leaveTypeIdMappings = {
                    pn: 1,
                    no: 2,
                    dtvs: 3,
                    ldk: 4,
                    nb: 5,
                    ntcd: 6,
                    nts: 7,
                    ntnld: 8,
                };

                const leaveTypeMappings = {
                    pn: 'PHÉP NĂM',
                    no: 'NGHỈ ỐM',
                    dtvs: 'ĐI TRỄ - VỀ SỚM',
                    ldk: 'LÝ DO KHÁC',
                    nb: 'NGHỈ BÙ',
                    ntcd: 'NGHỈ THEO CHẾ ĐỘ',
                    nts: 'NGHỈ THAI SẢN (hưởng BHXH)',
                    ntnld: 'NGHỈ TAI NẠN LAO ĐỘNG',
                };

                const bookLeaveTypeId = leaveTypeIdMappings[type];
                const bookLeaveType = leaveTypeMappings[type];
                const bookLeaveDay = daysOff;
                const bookFromDate = moment(`${startTime} ${startDate}`, 'HH:mm DD/MM/YYYY').format(
                    'YYYY-MM-DD HH:mm'
                );
                const bookToDate = moment(`${endTime} ${endDate}`, 'HH:mm DD/MM/YYYY').format(
                    'YYYY-MM-DD HH:mm'
                );

                // Kiểm tra đơn phép có tồn tại trong hệ thống không?
                const results = await checkIsExist(userId, bookFromDate, bookToDate);

                if (results.length > 0)
                    return await sendZaloAPIV3(
                        sender.id,
                        'Đơn xin nghỉ phép của bạn đã tồn tại trong hệ thống!'
                    );

                // Thêm đơn phép vào trong hệ thống
                await created(
                    userId,
                    bookLeaveTypeId,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason
                );

                // Lấy thông tin cấp trên
                const [{ superiorName, superiorGender, superiorRoleId, superiorZaloUserID }] =
                    await readedInfoSuperior(userId);

                // Tạo tin nhắn gửi zalo cho cấp trên
                const zaloAPIText = messageRequestLeave(
                    superiorGender,
                    superiorName,
                    superiorRoleId,
                    userName,
                    department,
                    bookLeaveType,
                    bookLeaveDay,
                    bookFromDate,
                    bookToDate,
                    reason
                );

                // Gửi zalo cho cấp trên
                await sendZaloAPIV3(superiorZaloUserID, zaloAPIText);

                // Gửi zalo về cho người dùng
                await sendZaloAPIV3(
                    sender.id,
                    `Đã gửi yêu cầu lên cấp trên ${superiorName} qua Zalo!`
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            await sendZaloAPIV3(
                sender.id,
                'SAI CÚ PHÁP XIN NGHỈ PHÉP!\n\nTin nhắn xin nghỉ phép sẽ có cú pháp như sau:\n\n#np pn 1 07:30 01/04/2024 16:30 01/04/2024 Bận việc riêng\n\n***TRONG ĐÓ***\n\n- Cú pháp bắt buộc: #np\n- Loại nghỉ phép: pn\n    + Phép năm: pn\n    + Nghỉ ốm: no\n    + Đi trễ - về sớm: dtvs\n    + Lý do khác: ldk\n    + Nghỉ bù: nb\n    + Nghỉ theo chế độ: ntcd\n    + Nghỉ thai sản: nts\n    + Nghỉ tai nạn lao động: ntnld\n- Số ngày nghỉ phép: 1\n- Giờ bắt đầu: 07:30\n- Ngày bắt đầu: 01/04/2024\n- Giờ kết thúc: 16:30\n- Ngày kết thúc: 01/04/2024\n- Lý do nghỉ phép: Bận việc riêng\n\nTrang chủ: https://winefood-sw.com/nghiphep'
            );
        }
    },
};

module.exports = zaloAPIMiddleWare;
