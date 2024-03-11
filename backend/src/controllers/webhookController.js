const { messageWebhookIReporter } = require('../utils');

const { sendZaloAPIV3 } = require('../services/zaloAPIService');

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
};

module.exports = webhookController;
