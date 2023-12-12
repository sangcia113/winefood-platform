const { readSuperiorById } = require('../services/userService');

// Xử lý yêu cầu đọc dữ liệu.
const handleGetSuperior = async id => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await readSuperiorById(id);

        return results;
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

module.exports = { handleGetSuperior };
