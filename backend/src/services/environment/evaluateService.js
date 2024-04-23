const db = require('../../configs/environment/databaseConfig');

const evaluateService = {
    readed: async ({ date }) => {
        const sql = `SELECT 
                        * 
                    FROM 
                        evaluate 
                    WHERE 
                        createdDate = ?`;

        const [results] = await db.query(sql, [date]);

        return results;
    },
};
module.exports = evaluateService;
