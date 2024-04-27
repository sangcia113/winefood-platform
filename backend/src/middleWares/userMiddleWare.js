const { checkIsDuplicate, checkIsExist } = require('../services/userService');

const userMiddleWare = {
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

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (
            !(
                code &&
                name &&
                birthday &&
                (gender === 0 || gender === 1) &&
                numberPhone &&
                (password === 0 || password) &&
                departmentId &&
                superiorId &&
                roleId
            )
        )
            return res.status(400).json({ error: -1002, message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkIsExist: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { code, numberPhone } = req.body;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await checkIsExist(code, numberPhone);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1060,
                    message: 'Nhân viên đã tồn tại trong hệ thống!',
                });

            next();
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },

    checkIsDuplicate: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Lấy thông tin từ body của yêu cầu
        const { code, numberPhone } = req.body;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await checkIsDuplicate(id, code, numberPhone);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1061,
                    message: 'Mã nhân viên hoặc số điện thoại đã tồn tại trong hệ thống!',
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

module.exports = userMiddleWare;
