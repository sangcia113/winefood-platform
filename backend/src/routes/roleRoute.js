const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed } = require('../controllers/roleController');

// End point GET
router.get('/', readed);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
