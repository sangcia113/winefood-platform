const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { zaloController } = require('../controllers/zaloAPIController');

// End point GET
router.get('/token', zaloController.readHandler);

// End point GET
router.get('/user', zaloController.readAllZaloUserHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
