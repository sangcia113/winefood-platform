const {
    created,
    deleted,
    readed,
    readedPassword,
    updated,
    updatedPassword,
} = require('../services/userService');

const { encodePassword, decodePassword } = require('../utils');

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
        } catch (err) {
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

            res.status(200).json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    updatedPassword: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!(oldPassword && newPassword && confirmPassword))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        if (newPassword !== confirmPassword)
            return res
                .status(400)
                .json({ error: -1085, message: 'Mật khẩu mới không trùng khớp!' });

        // Lấy thông tin từ auth của yêu cầu
        const { userId } = req.decoded;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await readedPassword(userId);

            if (!decodePassword(oldPassword, results[0].password))
                return res.status(400).json({ error: -1084, message: 'Sai mật khẩu cũ!' });

            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await updatedPassword(encodePassword(newPassword), userId);

            res.status(200).json({ error: 0, message: 'Thay đổi mật khẩu thành công!' });
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
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
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = userController;
