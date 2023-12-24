const axios = require('axios');
const qs = require('qs');
const { zaloAPIService } = require('../services/zaloAPIService');
const { errorService } = require('../services/errorService');

const ZALO_API_URL = 'https://openapi.zalo.me/v3.0/oa/message/cs';
const ZALO_OAUTH_URL = 'https://oauth.zaloapp.com/v4/oa/access_token';

const refreshAccessToken = async () => {
    try {
        const zaloAPIInfo = await zaloAPIService.read();

        const { refreshToken, secretKey, appId } = zaloAPIInfo[0];

        const data = qs.stringify({
            refresh_token: refreshToken,
            app_id: appId,
            grant_type: 'refresh_token',
        });

        const config = {
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
        return { error: -1002, message: 'Refresh Access Token is failed!' };
    }
};

const sendZaloNotificationV3 = async (userId, zaloAPIUserId, zaloAPIText, retryCount = 1) => {
    try {
        const zaloAPIInfo = await zaloAPIService.read();

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
            url: ZALO_API_URL,
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data,
        };

        const response = await axios.request(config);

        const { error, message } = response.data;

        errorService.create(userId, error, message);

        if (error === -216) {
            const responseRefresh = await refreshAccessToken();

            const { access_token, refresh_token } = responseRefresh.data;

            if (!(access_token && refresh_token))
                return { error: -1007, message: 'Invalid Refresh Token!' };

            await zaloAPIService.update(access_token, refresh_token);

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
        return { error: -1001, message: 'Send Zalo Notification V3 failed!' };
    }
};

const getAllUser = async () => {
    try {
        const zaloAPIInfo = await zaloAPIService.read();

        const { accessToken } = zaloAPIInfo[0];

        let offset = 0;

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://openapi.zalo.me/v2.0/oa/getfollowers?data={"offset":${offset},"count":50}`,
            headers: {
                access_token: accessToken,
            },
        };

        const response = axios.request(config);

        console.log(response);
    } catch (error) {
        return { error: -1004, message: 'Get All User is failed!' };
    }
};

const requestUserInfo = async zaloAPIUserId => {
    try {
        const zaloAPIInfo = await zaloAPIService.read();

        const { accessToken } = zaloAPIInfo[0];

        const axios = require('axios');
        const data = JSON.stringify({
            recipient: {
                user_id: zaloAPIUserId,
            },
            message: {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'request_user_info',
                        elements: [
                            {
                                title: 'WineFood',
                                subtitle:
                                    'Đây là yêu cầu cung cấp thông tin nhằm mục đích phục vụ cho việc lưu trữ dữ liệu',
                                image_url: 'http://www.winefood.com.vn/images/logo.jpg',
                            },
                        ],
                    },
                },
            },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data,
        };

        const response = axios.request(config);

        console.log(response);
    } catch (error) {
        return { error: -1005, message: 'Request User Info is failed!' };
    }
};

const getUserProfile = async zaloAPIUserId => {
    try {
        const zaloAPIInfo = await zaloAPIService.read();

        const { accessToken } = zaloAPIInfo[0];

        const axios = require('axios');

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://openapi.zalo.me/v2.0/oa/getprofile?data={"user_id":${zaloAPIUserId}}`,
            headers: {
                access_token: accessToken,
            },
        };

        const response = axios.request(config);

        console.log(response);
    } catch (error) {
        return { error: -1006, message: 'Get User Profile is failed!' };
    }
};

module.exports = {
    sendZaloNotificationV3,
    getAllUser,
    requestUserInfo,
    getUserProfile,
};
