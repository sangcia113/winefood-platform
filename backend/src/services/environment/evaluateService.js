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

    readedAccumulator: async () => {
        const sql = `SELECT
                        departmentVN,
                        SUM(e.point) AS accumulator
                    FROM
                        evaluate AS e
                    LEFT JOIN content_department AS cd
                    ON
                        cd.id = e.contentDepartmentId
                    LEFT JOIN department AS d
                    ON
                        d.id = cd.departmentId
                    WHERE
                        YEAR(e.createdDate) = YEAR(CURRENT_DATE)
                    GROUP BY
                        departmentId`;

        const [results] = await db.query(sql);

        return results;
    },

    readedDetailAccumulator: async () => {
        const sql = `SELECT
                        MONTH(e.createdDate) AS month,
                        SUM(CASE WHEN departmentId = 1 THEN e.point ELSE 0 END) AS office,
                        SUM(CASE WHEN departmentId = 2 THEN e.point ELSE 0 END) AS bottling,
                        SUM(CASE WHEN departmentId = 3 THEN e.point ELSE 0 END) AS shirozake,
                        SUM(CASE WHEN departmentId = 4 THEN e.point ELSE 0 END) AS toyo
                    FROM
                        evaluate AS e
                    LEFT JOIN content_department AS cd ON cd.id = e.contentDepartmentId
                    LEFT JOIN department AS d
                    ON
                        d.id = cd.departmentId
                    GROUP BY
                        MONTH(e.createdDate)`;

        const [results] = await db.query(sql);

        return results;
    },
};
module.exports = evaluateService;
