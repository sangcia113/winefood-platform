const db = require('../configs/databaseConfig');

const collectBrowserInfoService = {
    created: async (
        username,
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
                            username,
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
            username,
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
