const axios = require('axios');
const qs = require('qs');
const { readZaloAPI, updateZaloAPI } = require('../services/zaloAPIService');
const { createError } = require('../services/errorService');

const ZALO_API_URL = 'https://openapi.zalo.me/v3.0/oa/message/cs';
const ZALO_OAUTH_URL = 'https://oauth.zaloapp.com/v4/oa/access_token';

const getAccessToken = async res => {
    try {
        const infoAPI = await readZaloAPI();

        const { refreshToken, secretKey, appId } = infoAPI[0];

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

        return await axios.request(config);
    } catch (error) {
        res.json({ error: -902, message: 'Get Access Token is failed!' });
    }
};

// Xử lý yêu cầu gửi tin nhắn
const sendMessageZaloAPIHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { user_id, text } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(user_id || text)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        const infoAPI = await readZaloAPI();

        const { accessToken } = infoAPI[0];

        let data = JSON.stringify({
            recipient: {
                user_id,
            },
            message: {
                text,
            },
        });

        let config = {
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

        const { error, message } = response.data;

        if (error === 0) {
            res.json(response.data);
        } else {
            createError(user_id, error, message);

            if (error === -216) {
                try {
                    const responseGet = await getAccessToken(res);

                    const { access_token, refresh_token } = responseGet.data;

                    await updateZaloAPI(access_token, refresh_token);

                    res.json({ error: 1000, message: 'Success' });
                } catch (error) {
                    res.json({ error: -901, message: 'Update Zalo API is failed!' });
                }
            } else {
                res.json({ error, message: 'More error' });
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ error: -900, message: 'Send Zalo notification V3 failed!' });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readZaloAPIHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readZaloAPI();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { readZaloAPIHandler, sendMessageZaloAPIHandler };
