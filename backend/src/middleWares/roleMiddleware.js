const { checkIsExist } = require('../services/roleService');

const roleMiddleware = {
    checkParam: async (req, res, next) => {
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkBody: async (req, res, next) => {
        const { code, name } = req.body;

        if (!(code && name))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkIsExist: async (req, res, next) => {
        const { code } = req.body;

        try {
            const results = await checkIsExist(code);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1090,
                    message: 'Phân quyền đã tồn tại trong hệ thống!',
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

module.exports = roleMiddleware;
