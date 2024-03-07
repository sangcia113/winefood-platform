const multer = require('multer');

const uploadMiddleware = {
    uploaded: (req, res, next) => {
        try {
            // Tạo middleware `multer` để xử lý file tải lên
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    // Đặt đường dẫn thư mục lưu trữ cho các tệp được tải lên
                    cb(null, '../../assets');
                },
                filename: (req, file, cb) => {
                    // Đặt tên tệp dựa trên thời gian và tên gốc của tệp
                    cb(null, `${Date.now()}-${file.originalname}`);
                },
            });

            // Cấu hình multer với cấu hình lưu trữ đã thiết lập
            multer({ storage: storage })(req, res, err => {
                // Xử lý lỗi nếu có
                if (err)
                    return res.status(500).json({
                        error: -1000,
                        message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
                    });

                // Nếu không có lỗi, chuyển tiếp yêu cầu đến middleware tiếp theo
                next();
            });
        } catch (error) {
            // Xử lý lỗi nếu có lỗi xảy ra trong quá trình thiết lập multer
            res.status(500).json({
                error: -1000,
                message: 'Có lỗi xảy ra khi xử lý yêu cầu của bạn!',
            });
        }
    },
};

module.exports = uploadMiddleware;
