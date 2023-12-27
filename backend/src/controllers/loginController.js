const jwt = require('jsonwebtoken');

const { userService } = require('../services/userService');

const { encodePassword, decodePassword } = require('../utils');

const loginController = {
    handleLogin: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { username, password } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(username && password))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await userService.checkUserIsExist(username);

            if (!results.length)
                return res
                    .status(400)
                    .json({ error: -1080, message: 'Tài khoản không tồn tại trong hệ thống!' });

            if (!decodePassword(password, results[0].password))
                return res.status(400).json({ error: -1081, message: 'Sai mật khẩu!' });

            const token = jwt.sign(
                { username: results[0].username, roleId: results[0].roleId },
                process.env.PRIVATE_KEY
            );

            res.json({ error: 0, message: 'Đăng nhập thành công!', token });
        } catch (error) {
            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },
};

module.exports = { loginController };
