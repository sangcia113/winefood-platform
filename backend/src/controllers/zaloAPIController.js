require('dotenv').config();

const {
    readZaloAPIService,
    readZaloUserService,
    updateZaloAPIService,
} = require('../services/zaloAPIService');

// Xử lý yêu cầu đọc dữ liệu.
const readZaloUserController = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readZaloUserService();

        res.json(results);
    } catch (err) {
        res.status(500).json({
            error: -1001,
            message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}`,
        });
    }
};

const refreshAccessToken = async (req, res) => {
    try {
        const zaloAPIInfo = await readZaloAPIService();

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
    } catch (error) {
        res.status(500).json({ error: -1002, message: 'Refresh Access Token is failed!' });
    }
};

const sendZaloNotificationV3 = async (req, res) => {
    const { zaloAPIUserId, zaloAPIText } = req.body;

    try {
        const zaloAPIInfo = await readZaloAPIService();

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

        created(userId, error, message);

        if (error === -216) {
            const responseRefresh = await refreshAccessToken();

            const { access_token, refresh_token } = responseRefresh.data;

            if (!(access_token && refresh_token))
                return { error: -1007, message: 'Invalid Refresh Token!' };

            await updateZaloAPIService(access_token, refresh_token);

            if (retryCount > 0)
                return await sendZaloNotificationV3(
                    userId,
                    zaloAPIUserId,
                    zaloAPIText,
                    retryCount - 1
                );

            throw new Error('Maximum retry count reached.');
        } else {
            return response.data;
        }
    } catch (error) {
        res.status(500).json({ error: -1001, message: 'Send Zalo Notification V3 failed!' });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { readZaloUserController };
