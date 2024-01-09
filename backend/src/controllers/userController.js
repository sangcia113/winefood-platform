const { created, deleted, readed, updated } = require('../services/userService');

const { encodePassword } = require('../utils');

const userController = {
    // Xử lý yêu cầu thêm mới dữ liệu.
    created: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const {
            code,
            name,
            birthday,
            gender,
            numberPhone,
            password,
            departmentId,
            superiorId,
            roleId,
        } = req.body;

        const hashedPassword = encodePassword(password);

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await created(
                code,
                name,
                birthday,
                gender,
                numberPhone,
                hashedPassword,
                departmentId,
                superiorId,
                roleId
            );

            res.json({ error: 0, message: 'Thêm dữ liệu thành công!' });
        } catch (err) {
            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!' });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readed: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readed();

            res.json(results);
        } catch (err) {
            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updated: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const {
            code,
            name,
            birthday,
            gender,
            numberPhone,
            password,
            departmentId,
            superiorId,
            roleId,
        } = req.body;

        const hashedPassword = encodePassword(password);

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updated(
                code,
                name,
                birthday,
                gender,
                numberPhone,
                hashedPassword,
                departmentId,
                superiorId,
                roleId,
                id
            );

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!' });
        }
    },

    // Xử lý yêu cầu xoá dữ liệu.
    deleted: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        try {
            // Gọi hàm service để xoá dữ liệu
            await deleted(id);

            res.json({ error: 0, message: 'Xoá dữ liệu thành công!' });
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = userController;
