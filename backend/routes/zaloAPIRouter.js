const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readZaloAPIHandler } = require('../controllers/zaloAPIController');

// End point GET
router.get('/', readZaloAPIHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
