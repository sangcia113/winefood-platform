const axios = require('axios');
const qs = require('qs');
const { updateZaloAPI, readZaloAPI } = require('../services/zaloAPIService');
const { createError } = require('../services/errorService');

const handleSendZaloNotificationV3Failure = async error => {
    if (error === -216) {
        try {
            const responseGet = await handleGetAccessToken();

            const { access_token, refresh_token } = responseGet.data;

            await updateZaloAPI(access_token, refresh_token);

            const responseSendLast = await sendNotificationZaloV3('8851502365121811999', 'TEST');

            const { error, message } = responseSendLast;

            return { error, message };
        } catch (updateError) {
            console.error('Lỗi cập nhật Zalo API:', updateError);

            return { error: updateError.code, message: updateError.message };
        }
    } else {
        return { error };
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
            return { error, message };
        } else {
            await createError(user_id, error, message);

            await handleSendZaloNotificationV3Failure(error);
        }
    } catch (error) {
        console.log('Error: ', error);
    }
};

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
        console.log('Error: ', error);
    }
};

module.exports = { handleSendZaloNotificationV3, handleGetAccessToken };
