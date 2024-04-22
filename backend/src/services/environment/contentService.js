const db = require('../../configs/environment/databaseConfig');

const contentService = {
    created: async ({ classifyId, contentJP, contentVN, point }) => {
        const sql = `INSERT INTO 
                        content (
                            classifyId, 
                            contentJP, 
                            contentVN, 
                            point, 
                            createdDate
                        ) VALUES (?, ?, ?, ?, ?)`;

        await db.query(sql, [classifyId, contentJP, contentVN, point, new Date()]);
    },

    readed: async () => {
        const sql = `SELECT 
                        ct.*,
                        classifyJP,
                        classifyVN 
                    FROM 
                        content AS ct
                    LEFT JOIN
                        classify AS cs
                    ON
                        cs.id = ct.classifyId
                    WHERE
                        ct.deleted IS NULL
                    ORDER BY 
                        ct.id 
                    DESC`;

        const [results] = await db.query(sql);

        return results;
    },

    updated: async ({ classifyId, contentJP, contentVN, point, id }) => {
        const sql = `UPDATE 
                        content 
                    SET 
                        classifyId = ?, 
                        contentJP = ?, 
                        contentVN = ?, 
                        point = ?,
                        updatedDate = ?
                    WHERE 
                        id = ?`;

        await db.query(sql, [classifyId, contentJP, contentVN, point, new Date(), id]);
    },

    deleted: async ({ id }) => {
        const sql = `UPDATE 
                        content 
                    SET 
                        deleted = ?,
                        deletedDate = ?
                    WHERE 
                        id = ?`;

        await db.query(sql, [1, new Date(), id]);
    },
};
module.exports = contentService;
