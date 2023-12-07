const leaveTypeService = require('../services/leaveTypeService');

// Xử lý yêu cầu thêm mới dữ liệu.
const createLeaveTypeHandler = async (req, res) => {
    // Lấy thông tin từ body của yêu cầu
    const { code, nameVN, nameEN } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(code || nameVN || nameEN)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để thêm mới vào cơ sở dữ liệu
        await leaveTypeService.createLeaveType(code, nameVN, nameEN);

        res.json({ message: 'Thêm dữ liệu thành công!' });
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xử lý yêu cầu đọc dữ liệu.
const readLeaveTypeHandler = async (req, res) => {
    try {
        // Gọi hàm service để đọc dữ liệu
        const results = await leaveTypeService.readLeaveType();

        res.json(results);
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: `Lỗi truy vấn cơ sở dữ liệu: ${err.message}` });
    }
};

// Xử lý yêu cầu cập nhật dữ liệu.
const updateLeaveTypeHandler = async (req, res) => {
    // Lấy ID từ params của yêu cầu
    const { id } = req.params;

    // Lấy thông tin từ body của yêu cầu
    const { code, nameVN, nameEN } = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!(code || nameVN || nameEN || id)) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để cập nhật vào cơ sở dữ liệu
        await leaveTypeService.updateLeaveType(code, nameVN, nameEN, id);

        res.json({ message: 'Cập nhật dữ liệu thành công!' });
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xử lý yêu cầu xoá dữ liệu.
const deleteLeaveTypeHandler = async (req, res) => {
    // Lấy ID từ params của yêu cầu
    const { id } = req.params;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!id) {
        return res.status(400).json({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    try {
        // Gọi hàm service để xoá dữ liệu
        await leaveTypeService.deleteLeaveType(id);

        res.json({ message: 'Xoá dữ liệu thành công!' });
    } catch (err) {
        console.error('Lỗi truy vấn cơ sở dữ liệu:', err);

        res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn' });
    }
};

// Xuất các hàm xử lý yêu cầu để sử dụng trong module khác (router)
module.exports = {
    createLeaveTypeHandler,
    readLeaveTypeHandler,
    updateLeaveTypeHandler,
    deleteLeaveTypeHandler,
};
