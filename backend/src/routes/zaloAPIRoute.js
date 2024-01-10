const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readZaloUserController } = require('../controllers/zaloAPIController');

// End point GET
router.get('/user', readZaloUserController);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
