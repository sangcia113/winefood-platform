const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { roleController } = require('../controllers/roleController');

// End point GET
router.get('/', roleController.readHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
