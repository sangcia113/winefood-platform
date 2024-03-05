const { created, readed, updated, deleted } = require('../services/departmentService');

const departmentController = {
    created: async (req, res) => {
        const { code, name } = req.body;

        try {
            await created(code, name);

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

    updated: async (req, res) => {
        const { id } = req.params;

        const { code, name } = req.body;

        try {
            await updated(code, name, id);

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },

    deleted: async (req, res) => {
        const { id } = req.params;

        try {
            await deleted(id);

            res.status(200).json({ error: 0, message: 'Xóa dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = departmentController;
