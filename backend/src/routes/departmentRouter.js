const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { departmentController } = require('../controllers/departmentController');

// End point GET
router.get('/', departmentController.readHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
