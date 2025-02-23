const jwt = require('jsonwebtoken');

const { checkIsExist } = require('../services/userService');

const { decodePassword } = require('../utils');

const loginController = {
    readed: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { username, password } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(username && password))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await checkIsExist(null, null, username);

            if (!results.length)
                return res
                    .status(400)
                    .json({ error: -1080, message: 'Tài khoản không tồn tại trong hệ thống!' });

            if (!decodePassword(password, results[0].password))
                return res.status(400).json({ error: -1081, message: 'Sai mật khẩu!' });

            const payload = {
                userId: results[0].id,
                userName: results[0].name,
                department: results[0].department,
                roleId: results[0].roleId,
            };

            const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY);

            res.status(200).json({ error: 0, message: 'Đăng nhập thành công!', accessToken });

            next();
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

module.exports = loginController;
