const db = require('../../configs/environment/databaseConfig');

const noteService = {
    created: async ({ userId, departmentId, note, filename }) => {
        const data = filename.map(item => [userId, departmentId, note, item, new Date()]);

        const sql = `INSERT INTO 
                        note (
                            userId,
                            departmentId,
                            note,
                            fileName,
                            createdDate
                        ) VALUES ?`;

        await db.query(sql, [data]);
    },

    readed: async ({ userId, departmentId }) => {
        const sql = `SELECT 
                        * 
                    FROM 
                        note 
                    WHERE 
                        deleted IS NULL
                    AND
                        userId = ? 
                    AND 
                        departmentId = ? 
                    AND 
                        DATE(createdDate) = CURRENT_DATE`;

        const [results] = await db.query(sql, [userId, departmentId]);

        return results;
    },

    deleted: async ({ id }) => {
        const sql = `UPDATE 
                        note 
                    SET
                        deleted = ?,
                        deletedDate = ?
                    WHERE 
                        id = ?`;

        await db.query(sql, [1, new Date(), id]);
    },
};

module.exports = noteService;
