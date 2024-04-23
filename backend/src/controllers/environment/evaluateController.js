const { readed } = require('../../services/environment/evaluateService');

const evaluateController = {
    readed: async (req, res) => {
        try {
            const results = await readed(new Date());

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
