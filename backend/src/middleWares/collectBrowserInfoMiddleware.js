const { UAParser } = require('ua-parser-js');
const { created } = require('../services/collectBrowserInfoService');

const collectBrowserInfoMiddleware = {
    getUserAgent: async (req, res) => {
        const { userId } = req.decoded;

        const { ua, browser, engine, os, device, cpu } = UAParser(req.headers['user-agent']);

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
    },
};

module.exports = collectBrowserInfoMiddleware;
