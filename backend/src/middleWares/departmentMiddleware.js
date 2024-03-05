const { checkIsExist } = require('../services/departmentService');

const departmentMiddleware = {
    checkParam: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!id)
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkBody: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { code, name } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(code && name))
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkIsExist: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { code } = req.body;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await checkIsExist(code);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1110,
                    message: 'Tên bộ phận đã tồn tại trong hệ thống!',
                });

            next();
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

module.exports = departmentMiddleware;
