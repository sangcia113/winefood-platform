const axios = require('axios');
const qs = require('qs');
const { updateZaloAPI, readZaloAPI } = require('../services/zaloAPIService');
const { createError } = require('../services/errorService');

const handleGetAccessToken = async () => {
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
            url: 'https://oauth.zaloapp.com/v4/oa/access_token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                secret_key: secretKey,
            },
            data,
        };

        return await axios.request(config);
    } catch (error) {
        return { error: -902, message: 'Get Access Token is failed!' };
    }
};

const handleSendZaloNotificationV3Failure = async error => {
    if (error === -216) {
        try {
            const responseGet = await handleGetAccessToken();

            const { access_token, refresh_token } = responseGet.data;

            await updateZaloAPI(access_token, refresh_token);

            return { error: 1000, message: 'Success' };
        } catch (error) {
            return { error: -901, message: 'Update Zalo API is failed!' };
        }
    } else {
        return { error, message: 'More error' };
    }
};

const handleSendZaloNotificationV3 = async (user_id, text) => {
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
            url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data,
        };

        const response = await axios.request(config);

        const { error, message } = response.data;

        if (error === 0) {
            return response.data;
        } else {
            createError(user_id, error, message);

            return await handleSendZaloNotificationV3Failure(error);
        }
    } catch (error) {
        return { error: -900, message: 'Send Zalo notification V3 failed!' };
    }
};

module.exports = { handleSendZaloNotificationV3, handleGetAccessToken };
