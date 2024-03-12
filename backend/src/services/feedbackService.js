const db = require('../configs/databaseConfig');

const feedbackService = {
    createdWithFile: async (userId, feedback, fileName) => {
        const sql = `INSERT INTO 
                        feedback (
                            userId,
                            feedback,
                            fileName,
                            createdDate
                        ) VALUES ?`;

        const data = fileName.map(item => [userId, feedback, item, new Date()]);

        await db.query(sql, [data]);
    },

    createdNoFile: async (userId, feedback) => {
        const sql = `INSERT INTO 
                        feedback (
                            userId,
                            feedback,
                            createdDate
                        ) VALUES (?, ?, ?, ?)`;

        await db.query(sql, [userId, feedback, new Date()]);
    },
};

module.exports = feedbackService;
