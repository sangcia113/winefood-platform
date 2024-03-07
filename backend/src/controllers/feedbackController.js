const feedbackController = {
    created: async (req, res) => {
        const { feedback } = req.body;

        if (!feedback)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });
    },
};

module.exports = feedbackController;
