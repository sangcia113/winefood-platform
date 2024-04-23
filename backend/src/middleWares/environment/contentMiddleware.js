const { checkIsExist } = require('../../services/environment/contentService');

const contentMiddleware = {
    checkIsExist: async (req, res, next) => {
        try {
            const results = await checkIsExist(req.body);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1110,
                    message: 'Nội dung đã tồn tại trong hệ thống!',
                });

            next();
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

module.exports = contentMiddleware;
