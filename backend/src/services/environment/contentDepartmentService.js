const db = require('../../configs/environment/databaseConfig');

const contentService = {
    created: async ({ contents, departmentId }) => {
        const data = contents.map(contentId => [contentId, departmentId, new Date()]);

        const sql = `INSERT INTO
                        content_department (
                            contentId,
                            departmentId,
                            createdDate
                        ) VALUES ?`;

        await db.query(sql, [data]);
    },

    readed: async () => {
        // const sql = `SELECT
        //                 c.id,
        //                 c.contentVN,
        //                 JSON_ARRAYAGG(
        //                     JSON_OBJECT(d.id, d.departmentVN)
        //                 ) AS departments
        //             FROM
        //                 content_department AS cd
        //             LEFT JOIN content AS c
        //             ON
        //                 c.id = cd.contentId
        //             LEFT JOIN department AS d
        //             ON
        //                 d.id = cd.departmentId
        //             WHERE
        //                 cd.deleted IS NULL
        //             GROUP BY
        //                 c.id
        //             ORDER BY
        //                 c.id
        //             DESC`;
        const sql = `SELECT 
                        cd.*,
                        contentVN,
                        departmentVN 
                    FROM 
                        content_department AS cd 
                    LEFT JOIN content AS c 
                    ON 
                        c.id = cd.contentId 
                    LEFT JOIN department AS d 
                    ON 
                        d.id = cd.departmentId 
                    WHERE 
                        cd.deleted IS NULL 
                    ORDER BY 
                        cd.id 
                    DESC`;

        const [results] = await db.query(sql);

        return results;
    },

    readedByDepartment: async ({ departmentId }) => {
        const sql = `SELECT 
                        cd.id,
                        departmentJP, 
                        departmentVN, 
                        classifyJP, 
                        classifyVN, 
                        contentJP, 
                        contentVN,
                        point
                    FROM
                        content_department AS cd
                    LEFT JOIN
                        department AS d
                    ON
                        d.id = cd.departmentId
                    LEFT JOIN
                        content AS c
                    ON
                        c.id = cd.contentId
                    LEFT JOIN
                        classify AS cs
                    ON
                        cs.id = c.classifyId
                    WHERE 
                        cd.deleted IS NULL
                    AND
                        departmentId = ?
                    ORDER BY
                        cd.id
                    DESC`;

        const [results] = await db.query(sql, [departmentId]);

        return results;
    },

    deleted: async ({ id }) => {
        const sql = `UPDATE 
                        content_department 
                    SET 
                        deleted = ?,
                        deletedDate = ?
                    WHERE 
                        id = ?`;

        await db.query(sql, [1, new Date(), id]);
    },
};
module.exports = contentService;
