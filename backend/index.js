// Đọc các biến môi trường từ file .env
require('dotenv').config();

// Import thư viện Express
const express = require('express');

// Import thư viện Cors để xử lý vấn đề Cross-Origin Resource Sharing (CORS)
const cors = require('cors');

// Import router chính từ file routes/index.js
const router = require('./routes/index');

// Khởi tạo ứng dụng Express
const app = express();

// Sử dụng middleware Cors để xử lý vấn đề CORS
app.use(cors());

// Sử dụng middleware để parse dữ liệu từ request body dưới định dạng JSON
app.use(express.json());

// Sử dụng router chính với tiền tố '/api'
app.use('/api', router);

// Định nghĩa cổng mà server sẽ lắng nghe, sử dụng cổng từ biến môi trường PORT hoặc mặc định là 3001
const PORT = process.env.PORT || 3001;

// Khởi động server và lắng nghe trên cổng đã đặt
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
