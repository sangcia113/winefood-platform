const db = require('../../configs/environment/databaseConfig');

const userService = {
    created: async ({ code, name, language, username, password }) => {
        const sql = `INSERT INTO 
                        user (
                            code,
                            name,
                            language,
                            username,
                            password,
                            createdDate) 
                        VALUES (?, ?, ?, ?, ?, ?)`;

        await db.query(sql, [code, name, language, username, password, new Date()]);
    },

    readed: async () => {
        const sql = `SELECT 
                        * 
                    FROM 
                        user 
                    WHERE
                        deleted IS NULL
                    AND
                        roleId <> 1
                    ORDER BY 
                        id 
                    DESC`;

        const [results] = await db.query(sql);

        return results;
    },

    updated: async ({ code, name, language, username, password, id }) => {
        const sql = `UPDATE 
                            user 
                        SET 
                            code = ?, 
                            name = ?, 
                            language = ?, 
                            username = ?, 
                            password = ?, 
                            updatedDate = ?
                        WHERE 
                            id = ?`;

        await db.query(sql, [code, name, language, username, password, new Date(), id]);
    },

    deleted: async ({ id }) => {
        const sql = `UPDATE 
                        user 
                    SET 
                        deleted = ?,
                        deletedDate = ?
                    WHERE 
                        id = ?`;

        await db.query(sql, [1, new Date(), id]);
    },

    checkIsExist: async username => {
        const sql = `SELECT 
                        * 
                    FROM 
                        user 
                    WHERE 
                        username = ?`;

        const [results] = await db.query(sql, [username]);

        return results;
    },
};
module.exports = userService;
