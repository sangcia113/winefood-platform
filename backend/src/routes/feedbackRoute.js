const router = require('express').Router();
const multer = require('multer');

// Import các hàm xử lý yêu cầu từ controller
const { created } = require('../controllers/feedbackController');

// Tạo middleware `multer` để xử lý file tải lên
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../assets'); // Đặt đường dẫn thư mục lưu trữ cho các tệp được tải lên
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên tệp dựa trên thời gian và tên gốc của tệp
    },
});

const upload = multer({ storage: storage }); // Cấu hình multer với cấu hình lưu trữ đã thiết lập

// End point POST
router.post('/', upload.array('fileList'), created);

module.exports = router;
