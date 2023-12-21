const { default: axios } = require('axios');
const { zaloAPIService } = require('../services/zaloAPIService');

const ZALO_API_URL = 'https://openapi.zalo.me/v3.0/oa/message/cs';
const ZALO_OAUTH_URL = 'https://oauth.zaloapp.com/v4/oa/access_token';

let zaloAPIInfo = null;

const readZaloAPIInfo = async () => {
    try {
        if (!zaloAPIInfo) {
            zaloAPIInfo = await zaloAPIService.read();
        }

        return zaloAPIInfo[0];
    } catch (error) {
        res.status(500).json({ message: 'Lấy thông tin Zalo API thất bại!' });
    }
};

const zaloController = {
    // Xử lý yêu cầu đọc dữ liệu.
    readHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await zaloAPIService.read();

            res.json(results);
        } catch (err) {
            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readAllUserInfoHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await zaloAPIService.readAllZaloUser();

            res.json(results);
        } catch (err) {
            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    updateHandler: async (req, res) => {
        try {
            const { accessToken, refreshToken } = req.query;

            await zaloAPIService.update(accessToken, refreshToken);

            res.json({ message: 'Cập nhật thông tin Zalo API thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Cập nhật thông tin Zalo API thất bại!' });
        }
    },

    refreshTokenHandler: async (req, res) => {
        try {
            const { refreshToken, secretKey, appId } = await readZaloAPIInfo();

            let data = qs.stringify({
                refresh_token: refreshToken,
                app_id: appId,
                grant_type: 'refresh_token',
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: ZALO_OAUTH_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    secret_key: secretKey,
                },
                data,
            };

            const response = await axios.request(config);

            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Refresh Token thất bại!' });
        }
    },

    sendMessageHandler: async (req, res) => {
        try {
            const { accessToken } = await readZaloAPIInfo();

            const { zaloAPIUserId, zaloAPIText } = req.query;

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
                url: ZALO_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    access_token: accessToken,
                },
                data,
            };

            const response = await axios.request(config);

            res.json(response.data);
        } catch (error) {
            res.status(500).json({ message: 'Gửi tin nhắn qua Zalo thất bại!' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { zaloController };
