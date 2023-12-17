const axios = require('axios');
const qs = require('qs');
const { updateZaloAPI, readZaloAPI } = require('../services/zaloAPIService');
const { createError } = require('../services/errorService');

const ZALO_API_URL = 'https://openapi.zalo.me/v3.0/oa/message/cs';
const ZALO_OAUTH_URL = 'https://oauth.zaloapp.com/v4/oa/access_token';

const handleGetAccessToken = async () => {
    try {
        const zaloAPIInfo = await readZaloAPI();

        const { refreshToken, secretKey, appId } = zaloAPIInfo[0];

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
        return { error: -902, message: 'Get Access Token is failed!' };
    }
};

const handleSendZaloNotificationV3 = async (userId, zaloAPIUserID, zaloAPIText, retryCount = 1) => {
    try {
        const zaloAPIInfo = await readZaloAPI();

        const { accessToken } = zaloAPIInfo[0];

        let data = JSON.stringify({
            recipient: {
                user_id: zaloAPIUserID,
            },
            message: {
                text: zaloAPIText,
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
            console.log(response);
            return response.data;
        } else if (error === -216) {
            createError(userId, error, message);

            try {
                const responseGet = await handleGetAccessToken();

                const { access_token, refresh_token } = responseGet.data;

                await updateZaloAPI(access_token, refresh_token);

                if (retryCount > 0) {
                    const responseResend = await handleSendZaloNotificationV3(
                        userId,
                        zaloAPIUserID,
                        zaloAPIText,
                        retryCount - 1
                    );

                    return responseResend;
                }
            } catch (error) {
                return { error: -901, messageApp: 'Resend Zalo Notification V3 failed!' };
            }
        } else {
            createError(userId, error, message);

            return response.data;
        }
    } catch (error) {
        return { error: -900, message: 'Send Zalo Notification V3 failed!' };
    }
};

const handleGetAllUser = async () => {
    try {
        const zaloAPIInfo = await readZaloAPI();

        const { accessToken } = zaloAPIInfo[0];

        let offset = 0;

        let config = {
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
        return { error: -903, message: 'Get All User is failed!' };
    }
};

const handleRequestUserInfo = async zaloAPIUserID => {
    try {
        const zaloAPIInfo = await readZaloAPI();

        const { accessToken } = zaloAPIInfo[0];

        const axios = require('axios');
        let data = JSON.stringify({
            recipient: {
                user_id: zaloAPIUserID,
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

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://openapi.zalo.me/v3.0/oa/message/cs',
            headers: {
                'Content-Type': 'application/json',
                access_token: accessToken,
            },
            data: data,
        };

        const response = axios.request(config);

        console.log(response);
    } catch (error) {
        return { error: -904, message: 'Request User Info is failed!' };
    }
};

const handleGetUserProfile = async zaloAPIUserID => {
    try {
        const zaloAPIInfo = await readZaloAPI();

        const { accessToken } = zaloAPIInfo[0];

        const axios = require('axios');

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://openapi.zalo.me/v2.0/oa/getprofile?data={"user_id":${zaloAPIUserID}}`,
            headers: {
                access_token: accessToken,
            },
        };

        const response = axios.request(config);

        console.log(response);
    } catch (error) {
        return { error: -905, message: 'Get User Profile is failed!' };
    }
};

module.exports = {
    handleSendZaloNotificationV3,
    handleGetAllUser,
    handleRequestUserInfo,
    handleGetUserProfile,
};
