const { zaloAPIService } = require('../services/zaloAPIService');

const zaloAPIController = {
    // Xử lý yêu cầu đọc dữ liệu.
    read: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await zaloAPIService.read();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readUser: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await zaloAPIService.readUser();

            res.json(results);
        } catch (err) {
            res.status(500).json({ message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    update: async (req, res) => {
        try {
            const { accessToken, refreshToken } = req.query;

            await zaloAPIService.update(accessToken, refreshToken);

            res.json({ message: 'Cập nhật thông tin Zalo API thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Cập nhật thông tin Zalo API thất bại!' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { zaloAPIController };
