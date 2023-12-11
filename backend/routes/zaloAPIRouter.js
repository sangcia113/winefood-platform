const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    readZaloAPIHandler,
    sendMessageZaloAPIHandler,
} = require('../controllers/zaloAPIController');

// End point GET
router.get('/', readZaloAPIHandler);

// End point SEND MESSAGE
router.post('/send-message', sendMessageZaloAPIHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
