const { leaveTypeService } = require('../services/leaveTypeService');

const leaveTypeMiddleWare = {
    checkParam: async (req, res, next) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!id) return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkBody: async (req, res, next) => {
        // Lấy thông tin từ body của yêu cầu
        const { code, nameVN, nameEN } = req.body;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!(code && nameVN && nameEN))
            return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ!' });

        next();
    },

    checkIsExist: async (req, res) => {
        // Lấy thông tin từ body của yêu cầu
        const { code, nameVN, nameEN } = req.body;

        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await leaveTypeService.checkIsExist(code, nameVN, nameEN);

            if (results.length > 0)
                return res.status(400).json({
                    error: -1070,
                    message: 'Loại nghỉ phép đã tồn tại trong hệ thống!',
                });

            next();
        } catch (err) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};

module.exports = { leaveTypeMiddleWare };
