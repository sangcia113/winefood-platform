require('dotenv').config();

const axios = require('axios');

const qs = require('qs');

const db = require('../configs/databaseZaloAPIConfig');

const { created } = require('../services/errorService');

const zaloAPIService = {
    // Đọc trong cơ sở dữ liệu.
    readed: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT 
                        * 
                    FROM 
                        api`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Đọc trong cơ sở dữ liệu.
    readedUser: async () => {
        // Truy vấn SQL để đọc
        const sql = `SELECT
                        *
                    FROM
                        user
                    ORDER BY
                        id 
                    ASC`;

        // Thực hiện truy vấn SQL và trả về kết quả
        const [results] = await db.query(sql);

        return results;
    },

    // Cập nhật trong cơ sở dữ liệu.
    updated: async (accessToken, refreshToken) => {
        // Truy vấn SQL để cập nhật
        const sql = `UPDATE 
                        api 
                    SET 
                        accessToken = ?, 
                        refreshToken = ?, 
                        createdDate = ?`;

        // Thực hiện truy vấn SQL với các giá trị tham số
        await db.query(sql, [accessToken, refreshToken, new Date()]);
    },

    refreshToken: async () => {
        const zaloAPIInfo = await zaloAPIService.readed();

        const { refreshToken, secretKey, appId } = zaloAPIInfo[0];

        const data = qs.stringify({
            refresh_token: refreshToken,
            app_id: appId,
            grant_type: 'refresh_token',
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.ZALO_OAUTH_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                secret_key: secretKey,
            },
            data,
        };

        return await axios.request(config);
    },

    sendZaloAPIV3: async (zaloAPIUserId, zaloAPIText, retryCount = 1) => {
        const zaloAPIInfo = await zaloAPIService.readed();

        const { accessToken } = zaloAPIInfo[0];

        const data = JSON.stringify({
            recipient: {
                user_id: zaloAPIUserId,
            },
            message: {
                text: zaloAPIText,
            },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.ZALO_API_URL,
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data,
        };

        const response = await axios.request(config);

        const { error, message } = response.data;

        created(zaloAPIUserId, error, message);

        if (error === -216) {
            const responseRefresh = await zaloAPIService.refreshToken();

            const { access_token, refresh_token } = responseRefresh.data;

            if (!(access_token && refresh_token))
                return { error: -1007, message: 'Invalid Refresh Token!' };

            await zaloAPIService.updated(access_token, refresh_token);

            if (retryCount > 0)
                return await zaloAPIService.sendZaloAPIV3(
                    zaloAPIUserId,
                    zaloAPIText,
                    retryCount - 1
                );

            throw new Error('Maximum retry count reached.');
        } else {
            return { error, message };
        }
    },
};

// Xuất các hàm để sử dụng trong module khác
module.exports = zaloAPIService;
