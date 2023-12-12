const { readZaloAPI } = require('../services/zaloAPIService');

// Xử lý yêu cầu đọc dữ liệu.
const readZaloAPIHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readZaloAPI();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { readZaloAPIHandler };
