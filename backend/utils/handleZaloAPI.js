const axios = require('axios');
const qs = require('qs');
const zaloAPIService = require('../services/zaloAPIService');
const errorService = require('../services/errorService');

const handleGetAccessToken = async () => {
    try {
        const { refreshToken, secretKey, appId } = await zaloAPIService.readZaloAPI();

        let data = qs.stringify({
            refresh_token: refreshToken,
            app_id: appId,
            grant_type: 'refresh_token',
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://oauth.zaloapp.com/v4/oa/access_token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                secret_key: secretKey,
            },
            data,
        };

        return await axios.request(config);
    } catch (err) {
        console.log('Error: ', err);
    }
};

const handleSendZaloNotificationV3 = async (user_id, text) => {
    try {
        const { accessToken } = await zaloAPIService.readZaloAPI();

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
            url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data,
        };

        const response = await axios.request(config);

        const { error, message } = response.data;

        console.log('error', error);
        console.log('message', message);

        if (error === -216) {
            //     // await errorService.createError(user_id, error, message);
            const response = await handleGetAccessToken();
            console.log(response.data);
        } else {
            return error;
        }
    } catch (err) {
        console.log('Error: ', err);
    }
};

module.exports = { handleSendZaloNotificationV3 };
