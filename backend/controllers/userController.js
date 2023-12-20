const { userService } = require('../services/userService');

const userController = {
    // Xử lý yêu cầu thêm mới dữ liệu.
    createHandler: async (req, res) => {
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
                gender &&
                numberPhone &&
                password &&
                departmentId &&
                superiorId &&
                roleId
            )
        ) {
            return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
        }

        try {
            // Gọi hàm service để thêm mới vào cơ sở dữ liệu
            await userService.create(
                code,
                name,
                birthday,
                gender,
                numberPhone,
                password,
                departmentId,
                superiorId,
                roleId
            );

            res.json({ error: 0, message: 'Thêm dữ liệu thành công!' });
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu đọc dữ liệu.
    readHandler: async (req, res) => {
        try {
            // Gọi hàm service để đọc dữ liệu
            const results = await userService.read();

            res.json(results);
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
        }
    },

    // Xử lý yêu cầu cập nhật dữ liệu.
    updateHandler: async (req, res) => {
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

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (
            !(
                code &&
                name &&
                birthday &&
                (gender === 0 || gender === 1) &&
                numberPhone &&
                password &&
                departmentId &&
                superiorId &&
                roleId &&
                id
            )
        ) {
            return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
        }

        try {
            // Gọi hàm service để cập nhật vào cơ sở dữ liệu
            await userService.update(
                code,
                name,
                birthday,
                gender,
                numberPhone,
                password,
                departmentId,
                superiorId,
                roleId,
                id
            );

            res.json({ error: 0, message: 'Cập nhật dữ liệu thành công!' });
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },

    // Xử lý yêu cầu xoá dữ liệu.
    deleteHandler: async (req, res) => {
        // Lấy ID từ params của yêu cầu
        const { id } = req.params;

        // Kiểm tra tính hợp lệ của dữ liệu đầu vào
        if (!id) {
            return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
        }

        try {
            // Gọi hàm service để xoá dữ liệu
            await userService.delete(id);

            res.json({ error: 0, message: 'Xoá dữ liệu thành công!' });
        } catch (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

            res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
        }
    },
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = { userController };
