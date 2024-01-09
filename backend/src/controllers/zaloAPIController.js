const { readed, readedUser, updated } = require('../services/zaloAPIService');

const zaloAPIController = {
    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readed();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readedUser: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedUser();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    updated: async (req, res) => {
        try {
            const { accessToken, refreshToken } = req.query;

            await updated(accessToken, refreshToken);

            res.json({ message: 'Cập nhật thông tin Zalo API thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Cập nhật thông tin Zalo API thất bại!' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = zaloAPIController;
