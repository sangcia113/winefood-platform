const db = require('../../configs/environment/databaseConfig');

const evaluateService = {
    created: async ({ userId, evaluateData }) => {
        const data = Object.keys(evaluateData).map(key => [
            userId,
            key,
            evaluateData[key],
            new Date(),
        ]);

        const sql = `INSERT INTO
                        evaluate (
                            userId,
                            contentDepartmentId,
                            point,
                            createdDate)
                        VALUES ?`;

        await db.query(sql, [data]);
    },

    readed: async ({ userId, departmentId }) => {
        const sql = `SELECT 
                        cd.id,
                        point 
                    FROM 
                        evaluate AS e
                    LEFT JOIN
                        content_department AS cd
                    ON
                        cd.id = e.contentDepartmentId
                    WHERE 
                        userId = ?
                    AND
                        departmentId = ?
                    AND
                        DATE(e.createdDate) = CURRENT_DATE`;

        const [results] = await db.query(sql, [userId, departmentId]);

        return results;
    },
};
module.exports = evaluateService;
