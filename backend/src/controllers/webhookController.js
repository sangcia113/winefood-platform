const moment = require('moment');

const { messageWebhookIReporter } = require('../utils');

const { sendZaloAPIV3 } = require('../services/zaloAPIService');

const parseMessage = message => {
    const regex =
        /^#np (pn|no|dtvs|ldk|nb|ntcd|nts|ntnld) ((?:0\.)?[0-9]+(\.25|\.5|\.75)?) (\d{4}) (\d{8}) (\d{4}) (\d{8}) (.+)$/;

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
    const format = 'HHmm DDMMYYYY';
    const startDateTime = moment(`${startTime} ${startDate}`, format);
    const endDateTime = moment(`${endTime} ${endDate}`, format);

    // Kiểm tra thời gian bắt đầu và kết thúc có hợp lệ
    const isValidStartTime =
        startDateTime.isSameOrAfter(moment(`0730 ${startDate}`, format)) &&
        startDateTime.isSameOrBefore(moment(`1630 ${startDate}`, format));

    const isValidEndTime =
        endDateTime.isSameOrAfter(moment(`0730 ${endDate}`, format)) &&
        endDateTime.isSameOrBefore(moment(`1630 ${endDate}`, format));

    const isEndTimeAfterStartTime = endDateTime.isAfter(startDateTime);

    return (
        isValidStartTime &&
        isValidEndTime &&
        isEndTimeAfterStartTime &&
        startDateTime.isValid() &&
        endDateTime.isValid()
    );
};

const webhookController = {
    iReporter: async (req, res, language, zaloAPIUserId) => {
        const { def_top_name, report_remarks1 } = req.body;

        if (!(def_top_name && report_remarks1))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            const zaloAPIText = messageWebhookIReporter(language, def_top_name, report_remarks1);

            await sendZaloAPIV3(zaloAPIUserId, zaloAPIText);

            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({
                error: -1201,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // NODA
    iReporterBOD: async (req, res) =>
        webhookController.iReporter(req, res, 'jp', '1337604619804588121'),

    // TRUYEN
    iReporterHCTHManager: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '5227519945749166402'),

    // TRUYEN
    iReporterQLSXManager: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '637017525950997790'),

    // RANG
    iReporterChief: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '2132782557608394320'),

    // Y
    iReporterQCLeader: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '5069197622031590800'),

    // LOAN
    iReporterBOTLeader: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '4591161288990175870'),

    // TRONG
    iReporterSHILeader: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '5192761744419447513'),

    // SANG
    iReporterITMember: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '8851502365121811999'),

    // THIEU
    iReporterQCMember: async (req, res) =>
        webhookController.iReporter(req, res, 'vn', '8090394843545111695'),

    leaveZalo: async (req, res) => {
        const { sender, message } = req.body;
        console.log(sender.id);
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
            console.log('Tin nhắn hợp lệ và thỏa mãn các ràng buộc thời gian.');
        } else {
            console.log('Tin nhắn không hợp lệ hoặc không thỏa mãn các ràng buộc thời gian.');
        }
    },
};

module.exports = webhookController;
