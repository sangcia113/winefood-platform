const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readZaloAPIHandler, readZaloUserHandler } = require('../controllers/zaloAPIController');

// End point GET
router.get('/token', readZaloAPIHandler);

// End point GET
router.get('/user', readZaloUserHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
