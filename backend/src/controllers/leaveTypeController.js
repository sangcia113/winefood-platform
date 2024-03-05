const { created, deleted, readed, updated } = require('../services/leaveTypeService');

const leaveTypeController = {
    // Xử lý yêu cầu thêm mới dữ liệu.
    created: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { code, nameVN, nameEN } = req.body;

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(code, nameVN, nameEN);

            res.status(200).json({ error: 0, message: 'Thêm dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readed();

            res.status(200).json(results);
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updated: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { code, nameVN, nameEN } = req.body;

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updated(code, nameVN, nameEN, id);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    // Xử lý yêu cầu xoá dữ liệu.
    deleted: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để xoá dữ liệu
            await deleted(id);

            res.status(200).json({ error: 0, message: 'Xoá dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = leaveTypeController;
