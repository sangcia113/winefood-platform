const { UAParser } = require('ua-parser-js');
const { created } = require('../services/collectBrowserInfoService');

const collectBrowserInfoMiddleware = {
    getUserAgent: async (req, res) => {
        const { userId } = req.decoded;

        const { ua, browser, engine, os, device, cpu } = UAParser(req.headers['user-agent']);

        try {
            await created(
                userId,
                browser.name,
                browser.version,
                browser.major,
                device.vendor,
                device.model,
                device.type,
                engine.name,
                engine.version,
                os.name,
                os.version,
                cpu.architecture,
                ua
            );
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};

module.exports = collectBrowserInfoMiddleware;
