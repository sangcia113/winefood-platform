require('dotenv').config();

const { readedUser, sendZaloAPIV3 } = require('../services/zaloAPIService');

const zaloAPIController = {
    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedUser();

            res.status(200).json(results);
        } catch (err) {
            res.status(500).json({
                error: -1001,
                message: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}`,
            });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = zaloAPIController;
