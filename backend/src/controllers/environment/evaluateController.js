const {
    created,
    readed,
    readedAccumulator,
    readedDetailAccumulator,
} = require('../../services/environment/evaluateService');

const evaluateController = {
    created: async (req, res) => {
        try {
            await created({ ...req.decoded, evaluateData: req.body });

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
            const results = await readed({ ...req.decoded, ...req.params });

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    readedAccumulator: async (req, res) => {
        try {
            const results = await readedAccumulator(req.query);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    readedDetailAccumulator: async (req, res) => {
        try {
            const results = await readedDetailAccumulator(req.query);

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};
module.exports = evaluateController;
