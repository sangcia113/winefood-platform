const db = require('../../configs/environment/databaseConfig');

const classifyService = {
    created: async ({ classifyJP, classifyVN }) => {
        const sql = `INSERT INTO 
                        classify (
                            classifyJP, 
                            classifyVN, 
                            createdDate
                        ) VALUES (?, ?, ?)`;

        await db.query(sql, [classifyJP, classifyVN, new Date()]);
    },

    readed: async () => {
        const sql = `SELECT 
                        * 
                    FROM 
                        classify 
                    WHERE
                        deleted IS NULL
                    ORDER BY 
                        id 
                    DESC`;

        const [results] = await db.query(sql);

        return results;
    },

    updated: async ({ classifyJP, classifyVN, id }) => {
        const sql = `UPDATE 
                        classify 
                    SET 
                        classifyJP = ?, 
                        classifyVN = ?, 
                        updatedDate = ? 
                    WHERE 
                        id = ?`;

        await db.query(sql, [classifyJP, classifyVN, new Date(), id]);
    },

    deleted: async ({ id }) => {
        const sql = `UPDATE 
                        classify 
                    SET 
                        deleted = ?, 
                        deletedDate = ? 
                    WHERE 
                        id = ?`;

        await db.query(sql, [1, new Date(), id]);
    },
};
module.exports = classifyService;
