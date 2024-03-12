const { createdNoFile, createdWithFile } = require('../services/feedbackService');

const feedbackController = {
    created: async (req, res) => {
        const { userId } = req.decoded;

        const { feedback } = req.body;

        if (!feedback)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        if (req.files && req.files.length > 0) {
            const filename = req.files.map(item => item.filename);

            await createdWithFile(userId, feedback, filename);

            res.status(200).json({ error: 0, message: 'Gửi phản hồi thành công!' });
        } else {
            try {
                await createdNoFile(userId, feedback);
                res.status(200).json({ error: 0, message: 'Gửi phản hồi thành công!' });
            } catch (error) {
                res.status(500).json({
                    error: -1000,
                    message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
                });
            }
        }
    },
};

module.exports = feedbackController;
