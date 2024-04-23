const { created, readed } = require('../../services/environment/noteService');

const noteController = {
    created: async (req, res) => {
        if (!req.body.note || !req.files)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        const filename = req.files.map(item => item.filename);

        try {
            await created({ ...req.decoded, ...req.params, ...req.body, filename });

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
            const results = await readed({ ...req.params, ...req.decoded });

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

module.exports = noteController;
