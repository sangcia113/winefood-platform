const db = require('../configs/databaseConfig');

const collectBrowserInfoService = {
    created: async (
        userId,
        browserName,
        browserVersion,
        browserMajor,
        deviceVendor,
        deviceModel,
        deviceType,
        engineName,
        engineVersion,
        osName,
        osVersion,
        cpuArchitecture,
        ua
    ) => {
        const sql = `INSERT INTO 
                        collect_browser_info (
                            userId
                            browserName,
                            browserVersion,
                            browserMajor,
                            deviceVendor,
                            deviceModel,
                            deviceType,
                            engineName,
                            engineVersion,
                            osName,
                            osVersion,
                            cpuArchitecture,
                            ua,
                            createdDate
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [
            userId,
            browserName,
            browserVersion,
            browserMajor,
            deviceVendor,
            deviceModel,
            deviceType,
            engineName,
            engineVersion,
            osName,
            osVersion,
            cpuArchitecture,
            ua,
            new Date(),
        ]);
    },
};

module.exports = collectBrowserInfoService;
