const zaloAPIMiddleWare = {
    checkMessage: async (req, res, next) => {
        const { zaloAPIUserId, zaloAPIText } = req.query;

        if (!(zaloAPIUserId && zaloAPIText))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkUpdate: async (req, res, next) => {
        const { accessToken, refreshToken } = req.query;

        if (!(accessToken && refreshToken))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },
};

module.exports = zaloAPIMiddleWare;
