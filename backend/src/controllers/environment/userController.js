const { created, readed, updated, deleted } = require('../../services/environment/userService');
const { encodePassword } = require('../../utils');

const userController = {
    created: async (req, res) => {
        const hashedPassword = encodePassword(req.body.password);

        try {
            await created({ ...req.body, password: hashedPassword });

            res.status(200).json({ error: 0, message: 'Thêm dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    readed: async (req, res) => {
        try {
            const results = await readed();

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    updated: async (req, res) => {
        const hashedPassword = encodePassword(req.body.password);

        try {
            await updated({ ...req.body, ...req.params, password: hashedPassword });

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    deleted: async (req, res) => {
        try {
            await deleted(req.params);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};
module.exports = userController;
