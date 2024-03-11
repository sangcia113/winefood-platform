const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Import các hàm xử lý yêu cầu từ controller
const { created } = require('../controllers/feedbackController');

// Tạo middleware `multer` để xử lý file tải lên
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { userId } = req.decoded;
        const userFolder = path.join(__dirname, `../assets/${userId}`);

        // Kiểm tra nếu thư mục với userId đã tồn tại
        if (!fs.existsSync(userFolder)) {
            // Nếu không tồn tại, tạo mới thư mục
            fs.mkdirSync(userFolder, { recursive: true });
        }

        // Đặt đường dẫn thư mục lưu trữ cho các tệp được tải lên
        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        // Đặt tên tệp dựa trên thời gian và tên gốc của tệp
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Cấu hình multer với cấu hình lưu trữ đã thiết lập
const upload = multer({ storage: storage });

// End point POST
router.post('/', upload.array('fileList'), created);

module.exports = router;
